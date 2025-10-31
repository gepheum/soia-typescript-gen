import * as paths from "path";
import type {
  CodeGenerator,
  Constant,
  Method,
  Module,
  RecordKey,
  RecordLocation,
  ResolvedType,
} from "soiac";
import { z } from "zod";
import { maybeEscapeTopLevelUpperCaseName } from "./class_speller.js";
import { toFrozenExpression } from "./expression_maker.js";
import {
  EnumInfo,
  RecordInfo,
  StructField,
  StructInfo,
  createRecordInfo,
} from "./record_info.js";
import { TypeSpeller } from "./type_speller.js";

const Config = z.object({
  importPathExtension: z.union([
    z.literal(""),
    z.literal(".js"),
    z.literal(".ts"),
  ]),
  clientModulePath: z.optional(z.string()),
});

type Config = z.infer<typeof Config>;

class TypescriptCodeGenerator implements CodeGenerator<Config> {
  readonly id = "typescript";
  readonly configType = Config;
  readonly version = "1.0.0";

  generateCode(input: CodeGenerator.Input<Config>): CodeGenerator.Output {
    const { recordMap, config } = input;
    const outputFiles: CodeGenerator.OutputFile[] = [];
    for (const module of input.modules) {
      outputFiles.push({
        path: module.path.replace(/\.soia$/, ".js"),
        code: new TsModuleCodeGenerator(
          module,
          recordMap,
          config,
          ".js",
        ).generate(),
      });
      outputFiles.push({
        path: module.path.replace(/\.soia$/, ".d.ts"),
        code: new TsModuleCodeGenerator(
          module,
          recordMap,
          config,
          ".d.ts",
        ).generate(),
      });
    }
    return { files: outputFiles };
  }
}

// Generates the code for one TypeScript module.
class TsModuleCodeGenerator {
  constructor(
    private readonly inModule: Module,
    recordMap: ReadonlyMap<RecordKey, RecordLocation>,
    private readonly config: Config,
    private readonly fileType: ".js" | ".d.ts",
  ) {
    this.typeSpeller = new TypeSpeller(recordMap, this.inModule);
  }

  generate(): string {
    // http://patorjk.com/software/taag/#f=Doom&t=Do%20not%20edit
    this.push(`
      //  ______                        _               _  _  _
      //  |  _  \\                      | |             | |(_)| |
      //  | | | |  ___    _ __    ___  | |_    ___   __| | _ | |_
      //  | | | | / _ \\  | '_ \\  / _ \\ | __|  / _ \\ / _\` || || __|
      //  | |/ / | (_) | | | | || (_) || |_  |  __/| (_| || || |_ 
      //  |___/   \\___/  |_| |_| \\___/  \\__|  \\___| \\__,_||_| \\__|
      //

      // To install the Soia client library:
      //   npm i soia
      import * as $ from "${this.resolveClientModulePath()}";
      \n`);

    this.writeImports();

    for (const recordLocation of this.inModule.records) {
      this.writeClassesForRecord(recordLocation);
    }

    // Once we have created the classes for the records, we can initialize them.
    if (this.fileType === ".js") {
      if (this.inModule.records.length) {
        this.push(`
          ${TsModuleCodeGenerator.SEPARATOR}
          // Initialize the serializers
          ${TsModuleCodeGenerator.SEPARATOR}\n\n

          $._initModuleClasses(
            "${this.inModule.path}",
            [\n`);
        for (const recordLocation of this.inModule.records) {
          this.writeRecordSpec(recordLocation);
        }
        this.push(`
            ]
          );\n\n`);
      }
    }

    if (this.inModule.methods.length) {
      this.push(`
        ${TsModuleCodeGenerator.SEPARATOR}
        // Methods
        ${TsModuleCodeGenerator.SEPARATOR}\n\n`);
      for (const method of this.inModule.methods) {
        this.writeMethod(method);
      }
    }

    if (this.inModule.constants.length) {
      this.push(`
        ${TsModuleCodeGenerator.SEPARATOR}
        // Constants
        ${TsModuleCodeGenerator.SEPARATOR}\n\n`);
      for (const constant of this.inModule.constants) {
        this.writeConstant(constant);
      }
    }

    return this.joinLinesAndFixFormatting();
  }

  private resolveClientModulePath(): string {
    const { config, inModule } = this;
    const { clientModulePath } = config;
    if (clientModulePath === undefined) {
      return "soia";
    }
    if (clientModulePath.startsWith("../")) {
      // The path to the client module is relative.
      const depth = inModule.path.split("/").length - 1;
      const prefix = "../".repeat(depth);
      return `${prefix}${clientModulePath}`;
    }
    return clientModulePath;
  }

  private writeImports(): void {
    const thisPath = paths.dirname(this.inModule.path);
    for (const entry of Object.entries(this.inModule.pathToImportedNames)) {
      const [path, importedNames] = entry;
      const { importPathExtension } = this.config;
      let tsPath =
        paths.relative(thisPath, path).replace(/\.soia/, "") +
        importPathExtension;
      if (!tsPath.startsWith(".")) {
        tsPath = `./${tsPath}`;
      }
      if (importedNames.kind === "all") {
        const alias = importedNames.alias;
        this.push(`import * as x_${alias} from "${tsPath}";\n`);
      } else {
        const names = //
          [...importedNames.names]
            .map(maybeEscapeTopLevelUpperCaseName)
            .join(", ");
        this.push(`import { ${names} } from "${tsPath}";\n`);
      }
    }
    this.pushEol();
  }

  private writeClassesForRecord(record: RecordLocation): void {
    const { fileType, typeSpeller } = this;
    const recordInfo = createRecordInfo(record, typeSpeller);
    const { className, recordType } = recordInfo;

    this.push(`
      ${TsModuleCodeGenerator.SEPARATOR}
      // ${recordType} ${className.type}
      ${TsModuleCodeGenerator.SEPARATOR}\n\n`);

    if (recordType === "struct") {
      this.writeFrozenClassForStruct(recordInfo);
      if (fileType === ".js") {
        this.defineInitFunctionForStruct(recordInfo);
      } else {
        this.declareMutableClassForStruct(recordInfo);
      }
    } else {
      this.writeClassForEnum(recordInfo);
    }

    if (this.fileType === ".d.ts") {
      this.declareNamespaceForRecord(recordInfo);
    }
  }

  private writeFrozenClassForStruct(struct: StructInfo): void {
    const { fileType } = this;
    const { className } = struct;
    this.push(
      className.isNested ? `// Exported as '${className.type}'\n` : "export ",
    );
    if (fileType === ".d.ts") {
      this.push("declare ");
    }
    this.push(`class ${className.value} extends $._FrozenBase {\n`);

    if (fileType === ".d.ts") {
      this.declarePropertiesOfFrozenClass(struct);
    }

    this.push("}\n\n"); // class
  }

  private declarePropertiesOfFrozenClass(struct: StructInfo): void {
    const { className, fields, indexableFields } = struct;
    this.push(`
      static create<_Wholeness extends "whole" | "partial" = "whole">(
        initializer: ${className.type}.Initializer<_Wholeness>
      ): ${className.type};\n\n`);
    this.push("private constructor();\n\n");
    for (const field of fields) {
      this.push(`readonly ${field.property}: ${field.tsTypes.frozen};\n`);
    }
    this.pushEol();
    if (indexableFields.length) {
      for (const indexableField of indexableFields) {
        const { searchMethodName } = indexableField;
        const { keyType, frozenValueType, searchMethodParamName } =
          indexableField.indexable!;
        this.push(`${searchMethodName}(`);
        this.push(`${searchMethodParamName}: ${keyType}`);
        this.push(`): ${frozenValueType} | undefined;\n`);
      }
      this.pushEol();
    }
    this.push(`
      toFrozen(): this;
      toMutable(): ${className.type}.Mutable;

      static readonly DEFAULT: ${className.type};
      static readonly SERIALIZER: $.Serializer<${className.type}>;

      static readonly Mutable: typeof ${className.value}_Mutable;\n`);
    this.declareNestedClasses(struct.nestedRecords);
    this.pushEol();
    this.push("readonly [$._INITIALIZER]: ");
    this.push(`${className.type}.Initializer | undefined;\n`);
    this.push("private readonly FROZEN: undefined;\n");
  }

  private declareNestedClasses(nestedKeys: readonly RecordKey[]): void {
    const { typeSpeller } = this;
    // Export the constructor of every nested class as a property of this class.
    for (const nestedKey of nestedKeys) {
      const nestedClassName = typeSpeller.getClassName(nestedKey);
      this.push(`static readonly ${nestedClassName.name}: `);
      this.push(`typeof ${nestedClassName.value};\n`);
    }
  }

  private declareMutableClassForStruct(struct: StructInfo): void {
    const { fileType } = this;
    const { className, fields, fieldsWithMutableGetter } = struct;
    this.push(`// Exported as '${className.type}.Mutable'\n`);
    if (fileType === ".d.ts") {
      this.push("declare ");
    }
    this.push(`class ${className.value}_Mutable {\n`);
    this.push(`
      constructor(initializer?: ${className.type}.Initializer);\n\n`);

    // Declare the fields.
    for (const field of fields) {
      const type = field.tsTypes["maybe-mutable"];
      this.push(`${field.property}: ${type};\n`);
    }
    this.pushEol();

    // Declare the mutable getters.
    if (fieldsWithMutableGetter.length) {
      for (const field of fieldsWithMutableGetter) {
        this.declareMutableGetter(field);
      }
      this.pushEol();
    }

    this.push(`
      toFrozen(): ${className.type};
      toMutable(): this;\n`);
    this.pushEol();
    this.push("readonly [$._INITIALIZER]: ");
    this.push(`${className.type}.Initializer | undefined;\n`);
    this.push("}\n\n"); // class
  }

  private writeClassForEnum(enumInfo: EnumInfo): void {
    const { fileType } = this;
    const { className } = enumInfo;
    this.push(
      className.isNested ? `// Exported as '${className.type}'\n` : "export ",
    );
    if (fileType === ".d.ts") {
      this.push("declare ");
    }
    this.push(`class ${className.value} extends $._EnumBase {\n`);
    if (fileType === ".d.ts") {
      this.declarePropertiesOfClassForEnum(enumInfo);
    }
    this.push("}\n\n"); // class

    if (fileType === ".js") {
      this.defineCreateValueFunctionForEnum(enumInfo);
    }
  }

  private declarePropertiesOfClassForEnum(enumInfo: EnumInfo): void {
    const { className, constantFields, onlyConstants } = enumInfo;

    // Declare the enum constants.
    for (const field of constantFields) {
      this.push(`static readonly ${field.property}:  ${className.type};\n`);
    }
    this.pushEol();

    // Declare the `create` function.
    this.push(
      `static create<_Wholeness extends "whole" | "partial" = "whole">(
        initializer: ${className.type}.Initializer<_Wholeness>
      ): ${className.type};\n\n`,
    );

    // Declare the `kind`, `value` and `union` properties.
    this.push(`readonly kind: ${className.type}.Kind;\n`);
    if (!onlyConstants) {
      this.push(`declare readonly value: ${className.type}.Value;\n`);
      this.push(`declare readonly union: ${className.type}.UnionView;\n`);
    }
    this.pushEol();

    this.push(`static readonly SERIALIZER: $.Serializer<${className.type}>;\n`);
    this.declareNestedClasses(enumInfo.nestedRecords);
  }

  private defineCreateValueFunctionForEnum(enumInfo: EnumInfo): void {
    const { typeSpeller } = this;
    const { className, onlyConstants, valueFields } = enumInfo;
    if (onlyConstants) {
      return;
    }
    this.push(`
        function createValueOf${className.value}(initializer) {
          const { kind, value } = initializer;
          switch (kind) {\n`);
    for (const field of valueFields) {
      const returnValue = toFrozenExpression({
        type: field.type,
        inExpr: "value",
        maybeUndefined: false,
        typeSpeller: typeSpeller,
      });
      this.push(`
          case ${field.quotedName}: {
            return ${returnValue};
          }\n`);
    }
    this.push("}\n}\n\n");
  }

  private declareMutableGetter(field: StructField): void {
    const { mutable } = field.tsTypes;
    this.push(`get ${field.mutableGetterName}(): ${mutable};\n`);
  }

  private defineInitFunctionForStruct(record: StructInfo): void {
    const { typeSpeller } = this;
    const { className, fields } = record;
    this.push(`
      function init${className.value}(target, initializer) {\n`);
    for (const field of fields) {
      const inExpr = `initializer.${field.property}`;
      const rvalue = toFrozenExpression({
        type: field.type,
        inExpr: inExpr,
        maybeUndefined: true,
        typeSpeller: typeSpeller,
      });
      this.push(`target.${field.property} = ${rvalue};\n`);
    }
    this.push("}\n\n"); // function
  }

  private declareNamespaceForRecord(record: RecordInfo): void {
    const { typeSpeller } = this;
    const { className } = record;

    this.push(`export declare namespace ${className.type} {\n`);

    if (record.recordType === "struct") {
      this.declareStructSpecificTypes(record);
    } else {
      this.declareEnumSpecificTypes(record);
    }

    // Declare a type alias for every nested class.
    for (const nestedRecord of record.nestedRecords) {
      const nestedClassName = typeSpeller.getClassName(nestedRecord);
      this.push(
        `export type ${nestedClassName.name} = ${nestedClassName.value};\n`,
      );
    }

    this.push("}\n\n"); // namespace
  }

  private declareStructSpecificTypes(struct: StructInfo): void {
    const { className, fields } = struct;

    // Declare the Initializer interface.
    if (fields.length) {
      this.push(
        'interface _Initializer<_Wholeness extends "whole" | "partial"> {\n',
      );
      for (const field of fields) {
        const type = field.tsTypes.initializer;
        this.push(`readonly ${field.property}: ${type};\n`);
      }
      this.push("}\n\n");
      this.push(
        `export type Initializer<_Wholeness extends "whole" | "partial" = "whole"> =
          _Wholeness extends "whole" ? _Initializer<"whole"> : Partial<_Initializer<"partial">>;\n\n`,
      );
    } else {
      // The only value of type `Record<string | number | symbol, never>` is the
      // empty object `{}`.
      this.push(
        `export type Initializer<_Wholeness extends "whole" | "partial" = "whole"> =
          {[_: string]: never} | OrMutable;\n\n`,
      );
    }

    // Declare the Mutable and OrMutable types.
    this.push(`
      export type Mutable = ${className.value}_Mutable;
      export type OrMutable = ${className.name} | Mutable;\n\n`);
  }

  private declareEnumSpecificTypes(enumInfo: EnumInfo): void {
    const { initializerType, kindType, onlyConstants, unionViewType } =
      enumInfo;
    this.push(`export type Kind = ${kindType};\n\n`);
    if (!onlyConstants) {
      this.push(`export type Value = ${enumInfo.valueType};\n\n`);
    }
    this.push(
      `export type Initializer<_Wholeness extends "whole" | "partial" = "whole"> = ${initializerType};\n\n`,
    );
    if (!onlyConstants) {
      this.push(`export type UnionView = ${unionViewType};\n\n`);
    }
  }

  private writeMethod(method: Method): void {
    const { fileType, typeSpeller } = this;
    const { number, requestType, responseType } = method;
    const name = method.name.text;
    const varName = maybeEscapeTopLevelUpperCaseName(name);
    if (fileType === ".d.ts") {
      const reqTsType = typeSpeller.getTsType(requestType!, "frozen");
      const respTsType = typeSpeller.getTsType(responseType!, "frozen");
      this.push(`
        export const ${varName}: $.Method<${reqTsType}, ${respTsType}>;\n\n`);
    } else {
      const reqSerializer = this.getSerializerExpr(requestType!);
      const respSerializer = this.getSerializerExpr(responseType!);
      this.push(`
        export const ${varName} = {
          name: "${name}",
          number: ${number},
          requestSerializer: ${reqSerializer},
          responseSerializer: ${respSerializer},
      };\n\n`);
    }
  }

  private getSerializerExpr(type: ResolvedType): string {
    switch (type.kind) {
      case "record": {
        const className = this.typeSpeller.getClassName(type.key);
        return `${className.value}.SERIALIZER`;
      }
      case "array": {
        const item = this.getSerializerExpr(type.item);
        return `$.arraySerializer(${item})`;
      }
      case "optional": {
        const other = this.getSerializerExpr(type.other);
        return `$.optionalSerializer(${other})`;
      }
      case "primitive": {
        return `$.primitiveSerializer("${type.primitive}")`;
      }
    }
    throw TypeError();
  }

  private writeRecordSpec(record: RecordLocation): void {
    const { typeSpeller } = this;
    const recordInfo = createRecordInfo(record, typeSpeller);

    if (recordInfo.recordType === "struct") {
      this.writeStructSpec(recordInfo);
    } else {
      this.writeEnumSpec(recordInfo);
    }
  }

  private writeStructSpec(struct: StructInfo): void {
    const { className, fields, removedNumbers } = struct;
    const { parentClassValue } = className;
    this.push(`
      {
         kind: "struct",
         ctor: ${className.value},
         initFn: init${className.value},
         name: "${className.recordName}",\n`);
    if (parentClassValue) {
      this.push(`parentCtor: ${parentClassValue},\n`);
    }
    this.push("fields: [\n");
    for (const field of fields) {
      this.push(`
        {
          name: "${field.originalName}",
          property: "${field.property}",
          number: ${field.number},
          type: ${this.getTypeSpecExpr(field.type)},\n`);
      if (field.hasMutableGetter) {
        this.push(`mutableGetter: "${field.mutableGetterName}",\n`);
      }
      if (field.indexable) {
        this.push(`
          indexable: {
            searchMethod: "${field.searchMethodName}",
            keyFn: (v) => ${field.indexable.keyExpression},\n`);
        const { hashableExpression } = field.indexable;
        if (hashableExpression !== "k") {
          this.push(`keyToHashable: (k) => ${hashableExpression},\n`);
        }
        this.push("},\n");
      }
      this.push("},\n");
    }
    this.push("],\n");
    if (removedNumbers.length) {
      const numbers = struct.removedNumbers.join(", ");
      this.push(`removedNumbers: [${numbers}],\n`);
    }
    this.push("},\n");
  }

  private writeEnumSpec(enumInfo: EnumInfo): void {
    const {
      className,
      constantFields,
      onlyConstants,
      removedNumbers,
      valueFields,
    } = enumInfo;
    const { parentClassValue } = className;
    this.push(`
      {
         kind: "enum",
         ctor: ${className.value},\n`);
    if (!onlyConstants) {
      this.push(`createValueFn: createValueOf${className.value},\n`);
    }
    this.push(`name: "${className.recordName}",\n`);
    if (parentClassValue) {
      this.push(`parentCtor: ${parentClassValue},\n`);
    }
    this.push("fields: [\n");
    for (const field of constantFields) {
      if (field.name === "?") {
        // Since it is common to all enums, we don't need to specify it here.
        continue;
      }
      this.push(`
        {
          name: "${field.name}",
          number: ${field.number},
        },\n`);
    }
    for (const field of valueFields) {
      this.push(`
        {
          name: "${field.name}",
          number: ${field.number},
          type: ${this.getTypeSpecExpr(field.type)},
        },\n`);
    }
    this.push("],\n");
    if (removedNumbers.length) {
      const numbers = enumInfo.removedNumbers.join(", ");
      this.push(`removedNumbers: [${numbers}],\n`);
    }
    this.push("},\n");
  }

  private getTypeSpecExpr(type: ResolvedType): string {
    switch (type.kind) {
      case "record": {
        const className = this.typeSpeller.getClassName(type.key);
        return `{ kind: "record", ctor: ${className.value} }`;
      }
      case "array": {
        const item = this.getTypeSpecExpr(type.item);
        if (type.key) {
          const keyChain = type.key.path.map((n) => n.name.text).join(".");
          return `{ kind: "array", item: ${item}, keyChain: "${keyChain}" }`;
        } else {
          return `{ kind: "array", item: ${item} }`;
        }
      }
      case "optional": {
        const other = this.getTypeSpecExpr(type.other);
        return `{ kind: "optional", other: ${other} }`;
      }
      case "primitive": {
        return `{ kind: "primitive", primitive: "${type.primitive}" }`;
      }
    }
    throw TypeError();
  }

  private writeConstant(constant: Constant): void {
    const { fileType, typeSpeller } = this;
    const name = constant.name.text;
    if (fileType === ".d.ts") {
      const type = typeSpeller.getTsType(constant.type!, "frozen");
      this.push(`export const ${name}: ${type};\n\n`);
    } else {
      this.push(`export const ${name} = `);
      this.push(this.getSerializerExpr(constant.type!));
      this.push(".fromJson(");
      this.push(JSON.stringify(constant.valueAsDenseJson));
      this.push(");\n\n");
    }
  }

  private static readonly SEPARATOR = `// ${"-".repeat(80 - "// ".length)}`;

  private push(code: string): void {
    this.code += code.trimStart();
  }

  private pushEol(): void {
    this.code += "\n";
  }

  private joinLinesAndFixFormatting(): string {
    const indentUnit = "  ";
    let result = "";
    // The indent at every line is obtained by repeating indentUnit N times,
    // where N is the length of this array.
    const contextStack: Array<"{" | "(" | "[" | "<" | ":" | "."> = [];
    // Returns the last element in `contextStack`.
    const peakTop = (): string => contextStack.at(-1)!;
    const getMatchingLeftBracket = (r: "}" | ")" | "]" | ">"): string => {
      switch (r) {
        case "}":
          return "{";
        case ")":
          return "(";
        case "]":
          return "[";
        case ">":
          return "<";
      }
    };
    for (let line of this.code.split("\n")) {
      line = line.trim();
      if (line.length <= 0) {
        // Don't indent empty lines.
        result += "\n";
        continue;
      }

      const firstChar = line[0];
      switch (firstChar) {
        case "}":
        case ")":
        case "]":
        case ">": {
          const left = getMatchingLeftBracket(firstChar);
          while (contextStack.pop() !== left) {
            if (contextStack.length <= 0) {
              throw Error();
            }
          }
          break;
        }
        case ".": {
          if (peakTop() !== ".") {
            contextStack.push(".");
          }
          break;
        }
      }
      const indent = indentUnit.repeat(contextStack.length);
      result += `${indent}${line.trimEnd()}\n`;
      if (line.startsWith("//")) {
        continue;
      }
      const lastChar = line.slice(-1);
      switch (lastChar) {
        case "{":
        case "(":
        case "[":
        case "<": {
          // The next line will be indented
          contextStack.push(lastChar);
          break;
        }
        case ":":
        case "=": {
          if (peakTop() !== ":") {
            contextStack.push(":");
          }
          break;
        }
        case ";":
        case ",": {
          if (peakTop() === "." || peakTop() === ":") {
            contextStack.pop();
          }
        }
      }
    }

    return (
      result
        // Remove spaces enclosed within curly brackets if that's all there is.
        .replace(/\{\s+\}/g, "{}")
        // Remove spaces enclosed within round brackets if that's all there is.
        .replace(/\(\s+\)/g, "()")
        // Remove spaces enclosed within square brackets if that's all there is.
        .replace(/\[\s+\]/g, "[]")
        // Remove empty line following an open curly bracket.
        .replace(/(\{\n *)\n/g, "$1")
        // Remove empty line preceding a closed curly bracket.
        .replace(/\n(\n *\})/g, "$1")
        // Coalesce consecutive empty lines.
        .replace(/\n\n\n+/g, "\n\n")
        .replace(/\n\n$/g, "\n")
    );
  }

  private readonly typeSpeller: TypeSpeller;
  private code = "";
}

export const GENERATOR = new TypescriptCodeGenerator();
