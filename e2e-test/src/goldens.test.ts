import {
  Assertion,
  BytesExpression,
  Color,
  Point,
  PointExpression,
  StringExpression,
  TypedValue,
  UNIT_TESTS,
} from "../soiagen/goldens.js";
import * as assert from "assert";
import { describe } from "mocha";
import * as soia from "soia";

class AssertionError extends assert.AssertionError {
  addContext(context: string): void {
    this.message = this.message ? `${this.message}\n${context}` : context;
  }
}

describe("goldens", () => {
  for (let i = 0; i < UNIT_TESTS.length; ++i) {
    const unitTest = UNIT_TESTS[i]!;
    if (unitTest.testNumber !== UNIT_TESTS[0]!.testNumber + i) {
      throw new Error(
        `Test numbers are not sequential at test #${i}: ` +
          `found ${unitTest.testNumber}, ` +
          `expected ${UNIT_TESTS[0]!.testNumber + i}`,
      );
    }
    try {
      verifyAssertion(unitTest.assertion);
    } catch (e) {
      if (e instanceof AssertionError) {
        e.addContext(`While evaluating test #${unitTest.testNumber}`);
      }
      throw e;
    }
  }
});

function verifyAssertion(assertion: Assertion): void {
  switch (assertion.union.kind) {
    case "bytes_equal": {
      const actual = evaluateBytes(assertion.union.value.actual).toBase16();
      const expected = evaluateBytes(assertion.union.value.expected).toBase16();
      if (actual !== expected) {
        throw new AssertionError({
          actual: "hex:" + actual,
          expected: "hex:" + expected,
        });
      }
      break;
    }
    case "string_equal": {
      const actual = evaluateString(assertion.union.value.actual);
      const expected = evaluateString(assertion.union.value.expected);
      if (actual !== expected) {
        throw new AssertionError({
          actual: actual,
          expected: expected,
          message: `Actual: ${JSON.stringify(actual)}`,
        });
      }
      break;
    }
    case "reserialize_value": {
      return reserializeValueAndVerify(assertion.union.value);
    }
    case "reserialize_large_string": {
      return reserializeLargeStringAndVerify(assertion.union.value);
    }
    case "reserialize_large_array": {
      return reserializeLargeArrayAndVerify(assertion.union.value);
    }
    case "?":
      throw new Error();
    default: {
      const _: never = assertion.union;
      throw new Error(`Unhandled assertion kind: ${_}`);
    }
  }
}

function reserializeValueAndVerify(input: Assertion.ReserializeValue): void {
  const typedValues = [
    input.value,
    TypedValue.create({
      kind: "round_trip_dense_json",
      value: input.value,
    }),
    TypedValue.create({
      kind: "round_trip_readable_json",
      value: input.value,
    }),
    TypedValue.create({
      kind: "round_trip_bytes",
      value: input.value,
    }),
  ];
  for (const inputValue of typedValues) {
    try {
      // Verify bytes - check if actual matches any of the expected values
      const actualBytes = evaluateBytes(
        BytesExpression.create({
          kind: "to_bytes",
          value: input.value,
        }),
      );
      const bytesMatch = input.expectedBytes.some((expectedBytes) => {
        const expected = evaluateBytes(
          BytesExpression.create({
            kind: "literal",
            value: expectedBytes,
          }),
        );
        return actualBytes.toBase16() === expected.toBase16();
      });
      if (!bytesMatch) {
        throw new AssertionError({
          actual: "hex:" + actualBytes.toBase16(),
          expected: input.expectedBytes.map((b) => "hex:" + b.toBase16()).join(" or "),
        });
      }

      // Verify dense JSON - check if actual matches any of the expected values
      const actualDenseJson = evaluateString(
        StringExpression.create({
          kind: "to_dense_json",
          value: input.value,
        }),
      );
      if (!input.expectedDenseJson.includes(actualDenseJson)) {
        throw new AssertionError({
          actual: actualDenseJson,
          expected: input.expectedDenseJson.join(" or "),
        });
      }

      // Verify readable JSON - check if actual matches any of the expected values
      const actualReadableJson = evaluateString(
        StringExpression.create({
          kind: "to_readable_json",
          value: input.value,
        }),
      );
      if (!input.expectedReadableJson.includes(actualReadableJson)) {
        throw new AssertionError({
          actual: actualReadableJson,
          expected: input.expectedReadableJson.join(" or "),
        });
      }
    } catch (e) {
      if (e instanceof AssertionError) {
        e.addContext(`input value: ${inputValue}`);
      }
      throw e;
    }
  }
  const typedValue = evaluteTypedValue(input.value);
  for (const alternativeJson of input.alternativeJsons) {
    try {
      const roundTripJson = toDenseJson(
        typedValue.serializer,
        fromJsonKeepUnrecognizedFields(
          typedValue.serializer,
          evaluateString(alternativeJson),
        ),
      );
      // Check if roundTripJson matches any of the expected values
      if (!input.expectedDenseJson.includes(roundTripJson)) {
        throw new AssertionError({
          actual: roundTripJson,
          expected: input.expectedDenseJson.join(" or "),
        });
      }
    } catch (e) {
      if (e instanceof AssertionError) {
        e.addContext(
          `while processing alternative JSON: ${evaluateString(alternativeJson)}`,
        );
      }
      throw e;
    }
  }
  for (const alternativeBytes of input.alternativeBytes) {
    try {
      const roundTripBytes = toBytes(
        typedValue.serializer,
        fromBytesDropUnrecognizedFields(
          typedValue.serializer,
          evaluateBytes(alternativeBytes),
        ),
      );
      // Check if roundTripBytes matches any of the expected values
      const roundTripBytesHex = roundTripBytes.toBase16();
      const bytesMatch = input.expectedBytes.some((expectedBytes) => {
        return expectedBytes.toBase16() === roundTripBytesHex;
      });
      if (!bytesMatch) {
        throw new AssertionError({
          actual: "hex:" + roundTripBytesHex,
          expected: input.expectedBytes.map((b) => "hex:" + b.toBase16()).join(" or "),
        });
      }
    } catch (e) {
      if (e instanceof AssertionError) {
        e.addContext(
          `while processing alternative bytes: ${evaluateBytes(alternativeBytes).toBase16()}`,
        );
      }
      throw e;
    }
  }
  if (input.expectedTypeDescriptor) {
    const actual = JSON.stringify(
      typedValue.serializer.typeDescriptor.asJson(),
      null,
      2,
    );
    verifyAssertion(
      Assertion.create({
        kind: "string_equal",
        value: {
          actual: {
            kind: "literal",
            value: actual,
          },
          expected: {
            kind: "literal",
            value: input.expectedTypeDescriptor,
          },
        },
      }),
    );
  }
}

function reserializeLargeStringAndVerify(input: Assertion.ReserializeLargeString): void {
  const str = "a".repeat(input.numChars);
  {
    const json = toDenseJson(soia.primitiveSerializer("string"), str);
    const roundTrip = fromJsonDropUnrecognizedFields(
      soia.primitiveSerializer("string"),
      json,
    );
    if (roundTrip !== str) {
      throw new AssertionError({
        actual: roundTrip,
        expected: str,
      });
    }
  }
  {
    const json = toReadableJson(soia.primitiveSerializer("string"), str);
    const roundTrip = fromJsonDropUnrecognizedFields(
      soia.primitiveSerializer("string"),
      json,
    );
    if (roundTrip !== str) {
      throw new AssertionError({
        actual: roundTrip,
        expected: str,
      });
    }
  }
  {
    const bytes = toBytes(soia.primitiveSerializer("string"), str);
    if (!bytes.toBase16().startsWith(input.expectedBytePrefix.toBase16())) {
      throw new AssertionError({
        actual: "hex:" + bytes.toBase16(),
        expected: "hex:" + input.expectedBytePrefix.toBase16() + "...",
      });
    }
    const roundTrip = fromBytesDropUnrecognizedFields(
      soia.primitiveSerializer("string"),
      bytes,
    );
    if (roundTrip !== str) {
      throw new AssertionError({
        actual: roundTrip,
        expected: str,
      });
    }
  }
}

function reserializeLargeArrayAndVerify(input: Assertion.ReserializeLargeArray): void {
  const array = Array<number>(input.numItems).fill(1);
  const serializer = soia.arraySerializer(soia.primitiveSerializer("int32"));
  const isArray = (arr: readonly number[]): boolean => {
    return arr.length === input.numItems && arr.every((v) => v === 1);
  }
  {
    const json = toDenseJson(serializer, array);
    const roundTrip = fromJsonDropUnrecognizedFields(serializer, json);
    if (!isArray(roundTrip)) {
      throw new AssertionError({
        actual: roundTrip,
        expected: array,
      });
    }
  }
  {
    const json = toReadableJson(serializer, array);
    const roundTrip = fromJsonDropUnrecognizedFields(serializer, json);
    if (!isArray(roundTrip)) {
      throw new AssertionError({
        actual: roundTrip,
        expected: array,
      });
    }
  }
  {
    const bytes = toBytes(serializer, array);
    if (!bytes.toBase16().startsWith(input.expectedBytePrefix.toBase16())) {
      throw new AssertionError({
        actual: "hex:" + bytes.toBase16(),
        expected: "hex:" + input.expectedBytePrefix.toBase16() + "...",
      });
    }
    const roundTrip = fromBytesDropUnrecognizedFields(serializer, bytes);
    if (!isArray(roundTrip)) {
      throw new AssertionError({
        actual: roundTrip,
        expected: array,
      });
    }
  }
}

function evaluateBytes(expr: BytesExpression): soia.ByteString {
  switch (expr.union.kind) {
    case "literal":
      return expr.union.value;
    case "point_to_bytes":
      return toBytes(Point.SERIALIZER, evaluatePoint(expr.union.value));
    case "to_bytes": {
      const literal = evaluteTypedValue(expr.union.value);
      return toBytes(literal.serializer, literal.value);
    }
    case "?":
      throw new Error();
  }
}

function evaluateString(expr: StringExpression): string {
  switch (expr.union.kind) {
    case "literal":
      return expr.union.value;
    case "point_to_dense_json":
      return toDenseJson(Point.SERIALIZER, evaluatePoint(expr.union.value));
    case "point_to_readable_json":
      return toReadableJson(Point.SERIALIZER, evaluatePoint(expr.union.value));
    case "to_dense_json": {
      const literal = evaluteTypedValue(expr.union.value);
      return toDenseJson(literal.serializer, literal.value);
    }
    case "to_readable_json": {
      const literal = evaluteTypedValue(expr.union.value);
      return toReadableJson(literal.serializer, literal.value);
    }
    case "?":
      throw new Error();
  }
}

function evaluatePoint(point: PointExpression): Point {
  switch (point.union.kind) {
    case "literal":
      return point.union.value;
    case "from_json_keep_unrecognized":
      return fromJsonKeepUnrecognizedFields(
        Point.SERIALIZER,
        evaluateString(point.union.value),
      );
    case "from_json_drop_unrecognized":
      return fromJsonDropUnrecognizedFields(
        Point.SERIALIZER,
        evaluateString(point.union.value),
      );
    case "from_bytes_keep_unrecognized":
      return fromBytesKeepUnrecognized(
        Point.SERIALIZER,
        evaluateBytes(point.union.value),
      );
    case "from_bytes_drop_unrecognized":
      return fromBytesDropUnrecognizedFields(
        Point.SERIALIZER,
        evaluateBytes(point.union.value),
      );
    case "?":
      throw new Error();
  }
}

interface TypedValueType<T> {
  value: T;
  serializer: soia.Serializer<T>;
}

function evaluteTypedValue<T>(literal: TypedValue): TypedValueType<unknown> {
  switch (literal.union.kind) {
    case "bool":
      return {
        value: literal.union.value,
        serializer: soia.primitiveSerializer("bool"),
      };
    case "int32":
      return {
        value: literal.union.value,
        serializer: soia.primitiveSerializer("int32"),
      };
    case "int64":
      return {
        value: literal.union.value,
        serializer: soia.primitiveSerializer("int64"),
      };
    case "uint64":
      return {
        value: literal.union.value,
        serializer: soia.primitiveSerializer("uint64"),
      };
    case "float32":
      return {
        value: literal.union.value,
        serializer: soia.primitiveSerializer("float32"),
      };
    case "float64":
      return {
        value: literal.union.value,
        serializer: soia.primitiveSerializer("float64"),
      };
    case "timestamp":
      return {
        value: literal.union.value,
        serializer: soia.primitiveSerializer("timestamp"),
      };
    case "string":
      return {
        value: literal.union.value,
        serializer: soia.primitiveSerializer("string"),
      };
    case "bytes":
      return {
        value: literal.union.value,
        serializer: soia.primitiveSerializer("bytes"),
      };
    case "bool_optional":
      return {
        value: literal.union.value,
        serializer: soia.optionalSerializer(soia.primitiveSerializer("bool")),
      };
    case "ints": {
      return {
        value: literal.union.value,
        serializer: soia.arraySerializer(soia.primitiveSerializer("int32")),
      };
    }
    case "point": {
      return {
        value: literal.union.value,
        serializer: Point.SERIALIZER,
      };
    }
    case "color": {
      return {
        value: literal.union.value,
        serializer: Color.SERIALIZER,
      };
    }
    case "round_trip_dense_json": {
      const other = evaluteTypedValue(literal.union.value);
      return {
        value: other.serializer.fromJson(
          toDenseJson(other.serializer, other.value),
        ),
        serializer: other.serializer,
      };
    }
    case "round_trip_readable_json": {
      const other = evaluteTypedValue(literal.union.value);
      return {
        value: other.serializer.fromJson(
          toReadableJson(other.serializer, other.value),
        ),
        serializer: other.serializer,
      };
    }
    case "round_trip_bytes": {
      const other = evaluteTypedValue(literal.union.value);
      return {
        value: fromBytesDropUnrecognizedFields(
          other.serializer,
          toBytes(other.serializer, other.value),
        ),
        serializer: other.serializer,
      };
    }
    case "?":
      throw new Error();
  }
}

function toDenseJson<T>(serializer: soia.Serializer<T>, input: T): string {
  try {
    return serializer.toJsonCode(input);
  } catch (e) {
    throw new Error(`Failed to serialize ${input} to dense JSON: ${e}`);
  }
}

function toReadableJson<T>(serializer: soia.Serializer<T>, input: T): string {
  try {
    return serializer.toJsonCode(input, "readable");
  } catch (e) {
    throw new Error(`Failed to serialize ${input} to readable JSON: ${e}`);
  }
}

function toBytes<T>(serializer: soia.Serializer<T>, input: T): soia.ByteString {
  try {
    return soia.ByteString.sliceOf(serializer.toBytes(input).toBuffer());
  } catch (e) {
    throw new Error(`Failed to serialize ${input} to bytes: ${e}`);
  }
}

function fromJsonKeepUnrecognizedFields<T>(
  serializer: soia.Serializer<T>,
  json: string,
): T {
  try {
    return serializer.fromJsonCode(json, "keep-unrecognized-fields");
  } catch (e) {
    throw new Error(`Failed to deserialize ${json}: ${e}`);
  }
}

function fromJsonDropUnrecognizedFields<T>(
  serializer: soia.Serializer<T>,
  json: string,
): T {
  try {
    return serializer.fromJsonCode(json);
  } catch (e) {
    throw new Error(`Failed to deserialize ${json}: ${e}`);
  }
}

function fromBytesDropUnrecognizedFields<T>(
  serializer: soia.Serializer<T>,
  bytes: soia.ByteString,
): T {
  try {
    return serializer.fromBytes(bytes.toBuffer());
  } catch (e) {
    throw new Error(`Failed to deserialize ${bytes.toBase16()}: ${e}`);
  }
}

function fromBytesKeepUnrecognized<T>(
  serializer: soia.Serializer<T>,
  bytes: soia.ByteString,
): T {
  try {
    return serializer.fromBytes(bytes.toBuffer(), "keep-unrecognized-fields");
  } catch (e) {
    throw new Error(`Failed to deserialize ${bytes.toBase16()}: ${e}`);
  }
}
