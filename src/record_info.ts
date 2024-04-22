import { ClassName } from "./class_speller.js";
import { TsType } from "./ts_type.js";
import { TYPE_FLAVORS, TypeFlavor, TypeSpeller } from "./type_speller.js";
import {
  Field,
  PrimitiveType,
  RecordKey,
  RecordLocation,
  ResolvedRecordRef,
  ResolvedType,
  capitalize,
  convertCase,
} from "soiac";

/**
 * A `RecordInfo` contains all the information required for generating
 * TypeScript classes for a given struct or enum.
 */
export type RecordInfo = StructInfo | EnumInfo;

export interface StructInfo {
  readonly recordType: "struct";
  readonly className: ClassName;
  readonly nestedRecords: readonly RecordKey[];
  readonly removedNumbers: readonly number[];

  /** Fields sorted by number. */
  readonly fields: readonly StructField[];

  /**
   * Subset of the fields which must should have a mutable getter generated in
   * the Mutable class.
   */
  readonly fieldsWithMutableGetter: readonly StructField[];
  /** Subset of the fields which are indexable. */
  readonly indexableFields: readonly StructField[];
}

export interface EnumInfo {
  readonly recordType: "enum";
  readonly className: ClassName;
  readonly nestedRecords: readonly RecordKey[];
  readonly removedNumbers: readonly number[];

  /** True if all the fields of the enum are constant fields. */
  readonly onlyConstants: boolean;
  readonly constantFields: readonly EnumConstantField[];
  readonly valueFields: readonly EnumValueField[];
  readonly kindType: TsType;
  /** Union of `undefined` and the frozen type of all the value fields */
  readonly valueType: TsType;
  readonly initializerType: TsType;
  readonly valueOnlyInitializerType: TsType;
  readonly unionViewType: TsType;
}

export interface StructField {
  /**
   * Name of the generated property for this field, in lowerCamel format.
   * Note that it might be a typescript keyword, because TypeScript allows
   * property names to be keywords.
   */
  readonly property: string;
  /**
   * Name of the field as it appears in the `.soia` file, in lower_case format.
   * You probably meant to use `property`.
   */
  readonly originalName: string;
  /** True if a mutable getter should be generated in the Mutable class. */
  readonly hasMutableGetter: boolean;
  /** Name of the mutableX() generated method in the Mutable class. */
  readonly mutableGetterName: string;
  /** Name of the search method generated in the frozen class. */
  readonly searchMethodName: string;
  readonly number: number;
  /** Schema field type, e.g. `int32`. */
  readonly type: ResolvedType;
  /**
   * True if the field type depends on the struct where the field is defined.
   */
  readonly isRecursive: boolean;
  /** Matching TypeScript type for each type flavor. */
  readonly tsTypes: Readonly<Record<TypeFlavor, TsType>>;
  /** Set if the field has keyed array type. */
  readonly indexable?: Indexable;
}

export interface Indexable {
  readonly keyType: TsType;
  /** The key expression. References the value as `v`. */
  keyExpression: string;
  /**
   * Transforms the key into a hashable value, meaning a value which can be
   * stored in a Set. References the key as `k`.
   */
  hashableExpression: string;
  frozenValueType: TsType;
  /** Name of the only parameter of the search method. */
  readonly searchMethodParamName: string;
}

export type EnumField = EnumConstantField | EnumValueField;

// Information about a constant field within an enum.
export interface EnumConstantField {
  // To distinguish from EnumValueField.
  readonly isConstant: true;

  // Name of the field as it appears in the `.soia` file, in UPPER_CASE format.
  readonly name: string;
  // TypeScript string literal of `Kind` type.
  // Same as `"${name}"`.
  readonly quotedName: string;
  // Name of the generated static readonly property for this field.
  // In UPPER_CASE format.
  // It is either the name as-is or the result of appending an underscore to the
  // name if the name conflicts with another generated property.
  readonly property: string;
  readonly number: number;
}

export interface EnumValueField {
  // To distinguish from EnumConstantField.
  readonly isConstant: false;

  // Name of the field as it appears in the `.soia` file, in lower_case format.
  readonly name: string;
  // TypeScript string literal of `Kind` type.
  // Same as `"${name}"`.
  readonly quotedName: string;
  readonly number: number;
  // Schema field type, e.g. `int32`.
  readonly type: ResolvedType;
  // True if the field type depends on the struct where the field is defined.
  readonly isRecursive: boolean;
  // Matching TypeScript type for each type flavor.
  readonly tsTypes: Readonly<Record<TypeFlavor, TsType>>;
}

export function createRecordInfo(
  record: RecordLocation,
  typeSpeller: TypeSpeller,
  alreadyInitialized: ReadonlySet<RecordKey>,
): RecordInfo {
  return new RecordInfoCreator(
    record,
    typeSpeller,
    alreadyInitialized,
  ).create();
}

class RecordInfoCreator {
  constructor(
    private readonly record: RecordLocation,
    private readonly typeSpeller: TypeSpeller,
    private readonly alreadyInitialized: ReadonlySet<RecordKey>,
  ) {
    this.className = this.typeSpeller.getClassName(record.record.key);
  }

  private readonly className: ClassName;

  create(): RecordInfo {
    const { recordType } = this.record.record;
    if (recordType === "struct") {
      return this.createStructInfo();
    } else {
      return this.createEnumInfo();
    }
  }

  private createStructInfo(): StructInfo {
    const { record } = this.record;

    const fields: StructField[] = [];
    for (const field of record.fields) {
      const structField = this.createStructField(field);
      fields.push(structField);
    }

    // Sort fields by number.
    fields.sort((a, b) => a.number - b.number);

    return {
      recordType: "struct",
      className: this.className,
      nestedRecords: record.nestedRecords.map((r) => r.key),
      removedNumbers: record.removedNumbers.slice(),
      fields: fields,
      fieldsWithMutableGetter: fields.filter((f) => f.hasMutableGetter),
      indexableFields: fields.filter((f) => f.indexable),
    };
  }

  private createStructField(field: Field): StructField {
    const { typeSpeller } = this;
    const { type } = field;
    if (!type) {
      throw TypeError();
    }
    const originalName = field.name.text;
    const desiredName = convertCase(
      originalName,
      "lower_underscore",
      "lowerCamel",
    );
    const property = getStructFieldProperty(desiredName);
    const mutableGetterName = `mutable${capitalize(desiredName)}`;
    const searchMethodName = `search${capitalize(desiredName)}`;
    const tsTypes = this.getTsTypes(field);
    // If the Soia type of the field is recursice, the type of the corresponding
    // field in the Mutable class is frozen.
    const hasMutableGetter =
      !field.isRecursive &&
      !tsTypes.mutable.isNever &&
      type.kind !== "optional";
    let indexable: Indexable | undefined;
    if (type.kind === "array" && type.key) {
      // The field is indexable.
      const { key } = type;
      let keyType = typeSpeller.getTsType(key.keyType, "frozen");
      if (key.keyType.kind === "record") {
        // The actual key type is the Kind type of the enum..
        keyType = TsType.simple(`${keyType}.Kind`);
      }
      const frozenValueType = typeSpeller.getTsType(type.item, "frozen");
      const propertiesChain = key.fieldNames
        .map((n) => {
          const desiredName = convertCase(
            n.text,
            "lower_underscore",
            "lowerCamel",
          );
          return getStructFieldProperty(desiredName);
        })
        .join(".");
      const keyExpression = `v.${propertiesChain}`;
      const hashableExpression = this.getHashableExpression(key.keyType);
      let searchMethodParamName = key.fieldNames
        .map((token, i) =>
          convertCase(
            token.text,
            "lower_underscore",
            i == 0 ? "lowerCamel" : "UpperCamel",
          ),
        )
        .join("");
      if (
        TYPESCRIPT_KEYWORDS.has(searchMethodParamName) ||
        searchMethodParamName === "this"
      ) {
        searchMethodParamName = `${searchMethodParamName}_`;
      }
      indexable = {
        keyType: keyType,
        keyExpression: keyExpression,
        hashableExpression: hashableExpression,
        frozenValueType: frozenValueType,
        searchMethodParamName: searchMethodParamName,
      };
    }
    return {
      property: property,
      originalName: originalName,
      hasMutableGetter: hasMutableGetter,
      mutableGetterName: mutableGetterName,
      searchMethodName: searchMethodName,
      number: field.number,
      type: type,
      isRecursive: field.isRecursive,
      tsTypes: tsTypes,
      indexable: indexable,
    };
  }

  private createEnumInfo(): EnumInfo {
    const { className } = this;
    const { record } = this.record;
    const constantFields: EnumConstantField[] = [];
    const valueFields: EnumValueField[] = [];
    const typesInKindTypeUnion: TsType[] = [];
    const typesInValueTypeUnion: TsType[] = [TsType.UNDEFINED];
    const typesInInitializerUnion: TsType[] = [];
    const typesInValueOnlyInitializerUnion: TsType[] = [];
    const typesInUnionView: TsType[] = [];

    typesInInitializerUnion.push(TsType.simple(className.type));

    const registerConstantField = (f: EnumConstantField) => {
      constantFields.push(f);
      const nameLiteral = TsType.literal(f.name);
      typesInKindTypeUnion.push(nameLiteral);
      typesInInitializerUnion.push(nameLiteral);
      typesInUnionView.push(
        TsType.inlineInterface({
          kind: nameLiteral,
          value: TsType.UNDEFINED,
        }),
      );
    };

    // Register the special UNKNOWN field.
    registerConstantField({
      isConstant: true,
      name: "?",
      quotedName: '"?"',
      property: "UNKNOWN",
      number: 0,
    });
    for (const field of record.fields) {
      const { type } = field;
      if (type === undefined) {
        // A constant field.
        registerConstantField(this.createEnumConstantField(field));
      } else {
        // A value field.
        const enumField = this.createEnumValueField(field);
        const { name } = enumField;
        const nameLiteral = TsType.literal(name);
        const { frozen, initializer } = enumField.tsTypes;
        valueFields.push(enumField);
        typesInValueTypeUnion.push(frozen);
        typesInKindTypeUnion.push(nameLiteral);
        typesInInitializerUnion.push(
          TsType.inlineInterface({
            kind: nameLiteral,
            value: initializer,
          }),
        );
        const valueInitializer = TsType.inlineInterface({
          kind: nameLiteral,
          value: initializer,
        });
        typesInValueOnlyInitializerUnion.push(valueInitializer);
        typesInUnionView.push(valueInitializer);
      }
    }

    return {
      recordType: "enum",
      className: className,
      nestedRecords: record.nestedRecords.map((r) => r.key),
      removedNumbers: record.removedNumbers.slice(),
      onlyConstants: !valueFields.length,
      constantFields: constantFields,
      valueFields: valueFields,
      kindType: TsType.union(typesInKindTypeUnion),
      valueType: TsType.union(typesInValueTypeUnion),
      initializerType: TsType.union(typesInInitializerUnion),
      valueOnlyInitializerType: TsType.union(typesInValueOnlyInitializerUnion),
      unionViewType: TsType.union(typesInUnionView),
    };
  }

  private createEnumConstantField(field: Field): EnumConstantField {
    const name = field.name.text;
    const quotedName = `"${name}"`;
    const property = getEnumFieldProperty(name);
    return {
      isConstant: true,
      name: name,
      quotedName: quotedName,
      property: property,
      number: field.number,
    };
  }

  private createEnumValueField(field: Field): EnumValueField {
    const { type } = field;
    if (!type) {
      throw new TypeError();
    }
    const name = field.name.text;
    const quotedName = `"${name}"`;
    return {
      isConstant: false,
      name: name,
      quotedName: quotedName,
      number: field.number,
      type: type,
      isRecursive: field.isRecursive,
      tsTypes: this.getTsTypes(field),
    };
  }

  private getTsTypes(field: Field): Record<TypeFlavor, TsType> {
    const { type } = field;
    if (!type) {
      throw new TypeError();
    }
    const allRecordsFrozen = field.isRecursive;
    const tsTypes = {} as Record<TypeFlavor, TsType>;
    for (const flavor of TYPE_FLAVORS) {
      const tsType = this.typeSpeller.getTsType(type, flavor, allRecordsFrozen);
      tsTypes[flavor] = tsType;
    }
    return tsTypes;
  }

  /**
   * Returns an expression for transforming the key of an indexable array into a
   * hashable value, meaning a value which can be stored in a Set.
   * References the key as `k`.
   */
  getHashableExpression(type: PrimitiveType | ResolvedRecordRef): string {
    switch (type.kind) {
      case "primitive":
        switch (type.primitive) {
          case "bool":
          case "int32":
          case "float32":
          case "float64":
          case "string":
            return "k";
          case "int64":
          case "uint64":
            // BigInt is not hashable.
            return "k.toString()";
          case "timestamp":
            return "k.unixMillis";
          case "bytes":
            return "k.toBase16()";
        }
      case "record": {
        return "k";
      }
    }
  }
}

// Only care about properties in lowerCamel format.
const STRUCT_COMMON_GENERATED_PROPERTIES: ReadonlySet<string> = new Set([
  "toFrozen",
  "toMutable",
]);

// Only care about properties in UPPER_CASE format.
const ENUM_COMMON_GENERATED_PROPERTIES: ReadonlySet<string> = new Set([
  "SERIALIZER",
  "UNKNOWN",
]);

/**
 * Returns the name of the TypeScript property for the given struct field.
 * Expects a field name as it appears in the `.soia` file.
 */
export function structFieldNameToProperty(fieldName: string): string {
  return getStructFieldProperty(
    convertCase(fieldName, "lower_underscore", "lowerCamel"),
  );
}

// Returns the name of the TypeScript property for the given struct field.
// Obtained by appending a "_" suffix to the desired name if it conflicts with a
// common generated property.
function getStructFieldProperty(desiredName: string): string {
  return /^mutable[0-9A-Z]/.test(desiredName) ||
    /^search[0-9A-Z]/.test(desiredName) ||
    STRUCT_COMMON_GENERATED_PROPERTIES.has(desiredName)
    ? `${desiredName}_`
    : desiredName;
}

// Returns the name of the static readonly TypeScript property for the given
// constant enum field.
// Obtained by appending a "_" suffix to the desired name if it conflicts with a
// common generated property.
function getEnumFieldProperty(desiredName: string): string {
  return ENUM_COMMON_GENERATED_PROPERTIES.has(desiredName)
    ? `${desiredName}_`
    : desiredName;
}

const TYPESCRIPT_KEYWORDS = new Set([
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "function",
  "if",
  "import",
  "in",
  "instanceof",
  "new",
  "null",
  "return",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "as",
  "implements",
  "interface",
  "let",
  "package",
  "private",
  "protected",
  "public",
  "static",
  "yield",
  "any",
  "boolean",
  "constructor",
  "declare",
  "get",
  "module",
  "require",
  "number",
  "set",
  "string",
  "symbol",
  "type",
  "from",
  "of",
  "namespace",
  "async",
  "await",
]);
