/**
 * @fileoverview Returns a TypeScript expression transforming a value from a
 * `initializer` type into a `frozen` or `maybe-mutable` type.
 */
import { TypeSpeller } from "./type_speller.js";
import type { ResolvedType } from "soiac";

export interface TransformExpressionArg {
  type: ResolvedType;
  // Input TypeScript expression, e.g. "foo.bar".
  inExpr: string;
  // True if the input expression may be "undefined".
  maybeUndefined: boolean;
  outFlavor: "frozen" | "maybe-mutable";
  typeSpeller: TypeSpeller;
}

export function makeTransformExpression(arg: TransformExpressionArg): string {
  const { type, inExpr, maybeUndefined, outFlavor, typeSpeller } = arg;
  if (type.kind === "record") {
    const frozenClass = typeSpeller.getClassName(type.key);
    const defaultExpr =
      type.recordType === "struct"
        ? `${frozenClass.value}.DEFAULT`
        : `${frozenClass.value}.UNKNOWN`;
    const inExprOrDefault = maybeUndefined
      ? `${inExpr} || ${defaultExpr}`
      : inExpr;
    return `${frozenClass.value}.create(${inExprOrDefault})`;
  } else if (type.kind === "array") {
    const transformItemExpr = makeTransformExpression({
      type: type.item,
      inExpr: "e",
      maybeUndefined: false,
      outFlavor: outFlavor,
      typeSpeller: typeSpeller,
    });
    const inExprOrEmpty = maybeUndefined ? `${inExpr} || []` : inExpr;
    if (transformItemExpr === "e") {
      const id = "$._identity";
      return outFlavor === "frozen"
        ? `$._toFrozenArray(\n${inExprOrEmpty},\n ${id})`
        : `$._toFrozenOrMutableArray(\n${inExprOrEmpty},\n ${id})`;
    } else {
      const lambdaExpr = `(e) => ${transformItemExpr}`;
      const funName =
        outFlavor === "frozen"
          ? "$._toFrozenArray"
          : "$._toFrozenOrMutableArray";
      return `${funName}(\n${inExprOrEmpty},\n${lambdaExpr},\n)`;
    }
  } else if (type.kind === "nullable") {
    const valueType = type.value;
    const valueExpr = makeTransformExpression({
      type: valueType,
      inExpr: inExpr,
      maybeUndefined: false,
      outFlavor: outFlavor,
      typeSpeller: typeSpeller,
    });
    if (valueExpr === inExpr) {
      return maybeUndefined ? `${inExpr} ?? null` : inExpr;
    }
    // The condition for returning valueExpr.
    let condition: string;
    if (canBeFalsy(valueType)) {
      if (maybeUndefined) {
        // This is one way to test that inExpr is not null or undefined.
        // Works because if inExpr was === 0, then we would have already
        // returned.
        condition = `((${inExpr} ?? 0) !== 0)`;
      } else {
        condition = `${inExpr} !== null`;
      }
    } else {
      // Just rely on implicit boolean conversion.
      // Also works if maybeUndefined is true.
      condition = inExpr;
    }
    return `${condition} ? ${valueExpr} : null`;
  }
  // A primitive type.
  if (!maybeUndefined) {
    return inExpr;
  }
  const { primitive } = type;
  let defaultValue: string;
  if (primitive === "bool") {
    defaultValue = "false";
  } else if (
    primitive === "int32" ||
    primitive === "float32" ||
    primitive === "float64"
  ) {
    defaultValue = "0";
  } else if (primitive === "int64" || primitive === "uint64") {
    defaultValue = "BigInt(0)";
  } else if (primitive === "timestamp") {
    defaultValue = "$.Timestamp.UNIX_EPOCH";
  } else if (primitive === "string") {
    defaultValue = '""';
  } else if (primitive === "bytes") {
    defaultValue = "$.ByteString.EMPTY";
  } else {
    const _: never = primitive;
    throw TypeError();
  }
  return `${inExpr} || ${defaultValue}`;
}

// Returns true if values of the given type can ever be falsy.
// See https://developer.mozilla.org/en-US/docs/Glossary/Falsy
function canBeFalsy(type: ResolvedType): boolean {
  if (type.kind === "nullable") {
    return true;
  }
  if (type.kind !== "primitive") {
    return false;
  }
  const { primitive } = type;
  return (
    primitive === "bool" ||
    primitive === "int32" ||
    primitive === "int64" ||
    primitive === "uint64" ||
    primitive === "float32" ||
    primitive === "float64" ||
    primitive === "string"
  );
}
