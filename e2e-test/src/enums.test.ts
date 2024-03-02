import { SerializerTester } from "../../node_modules/soia/dist/esm/serializer_tester.js";
import { JsonValue, Weekday } from "../soiagen/enums.soia.js";
import { Car } from "../soiagen/vehicles/car.soia.js";
import { expect } from "buckwheat";
import { describe, it } from "mocha";
import { EnumField } from "soia";

describe("simple enum", () => {
  const monday = Weekday.MONDAY;

  describe("#create", () => {
    it("unknown field", () => {
      expect(Weekday.create("?")).toBe(Weekday.UNKNOWN);
    });

    it("constant name", () => {
      expect(Weekday.create("MONDAY")).toBe(monday);
    });

    it("constant", () => {
      expect(Weekday.create(monday)).toBe(monday);
    });
  });

  describe("#kind", () => {
    it("constant", () => {
      expect(monday.kind).toBe("MONDAY");
    });
    it("#UNKNOWN", () => {
      expect(Weekday.UNKNOWN.kind).toBe("?");
    });
  });

  describe("#typeDescriptor", () => {
    it("#kind", () => {
      expect(Weekday.SERIALIZER.typeDescriptor.kind).toBe("enum");
    });

    it("#asJson()", () => {
      expect(JsonValue.SERIALIZER.typeDescriptor.asJson()).toMatch({
        type: {
          kind: "record",
          name: "JsonValue",
          module: "enums.soia",
        },
        records: [
          {
            kind: "enum",
            name: "JsonValue",
            module: "enums.soia",
            fields: [
              {
                name: "?",
                number: 0,
              },
              {
                name: "NULL",
                number: 1,
              },
              {
                name: "boolean",
                number: 100,
                type: {
                  kind: "primitive",
                  primitive: "bool",
                },
              },
              {
                name: "number",
                number: 6,
                type: {
                  kind: "primitive",
                  primitive: "float64",
                },
              },
              {
                name: "string",
                number: 3,
                type: {
                  kind: "primitive",
                  primitive: "string",
                },
              },
              {
                name: "array",
                number: 4,
                type: {
                  kind: "array",
                  item: {
                    kind: "record",
                    name: "JsonValue",
                    module: "enums.soia",
                  },
                },
              },
              {
                name: "object",
                number: 5,
                type: {
                  kind: "array",
                  item: {
                    kind: "record",
                    name: "JsonValue.Pair",
                    module: "enums.soia",
                  },
                },
              },
            ],
          },
          {
            kind: "struct",
            name: "JsonValue.Pair",
            module: "enums.soia",
            fields: [
              {
                name: "name",
                type: {
                  kind: "primitive",
                  primitive: "string",
                },
                number: 0,
              },
              {
                name: "value",
                type: {
                  kind: "record",
                  name: "JsonValue",
                  module: "enums.soia",
                },
                number: 1,
              },
            ],
          },
        ],
      });
      new SerializerTester(
        JsonValue.SERIALIZER,
      ).reserializeTypeAdapterAndAssertNoLoss();
    });
  });

  describe("serializer", () => {
    const serializerTester = new SerializerTester(Weekday.SERIALIZER);
    serializerTester.reserializeAndAssert(Weekday.UNKNOWN, {
      denseJson: 0,
      readableJson: "?",
      bytesAsBase16: "00",
    });
    serializerTester.reserializeAndAssert(monday, {
      denseJson: 1,
      readableJson: "MONDAY",
      bytesAsBase16: "01",
    });
    serializerTester.reserializeAndAssert(Weekday.TUESDAY, {
      denseJson: 2,
      readableJson: "TUESDAY",
      bytesAsBase16: "02",
    });
    it("deserializes alternative forms", () => {
      expect(Weekday.SERIALIZER.fromJsonCode('{"kind": "TUESDAY"}')).toBe(
        Weekday.TUESDAY,
      );
      expect(
        Weekday.SERIALIZER.fromJsonCode('{"kind": "TUESDAY", "value": {}}'),
      ).toBe(Weekday.TUESDAY);
      expect(Weekday.SERIALIZER.fromJsonCode("[2]")).toBe(Weekday.TUESDAY);
      expect(Weekday.SERIALIZER.fromJsonCode("[2,[]]")).toBe(Weekday.TUESDAY);
    });
  });

  describe("#toString", () => {
    expect(Weekday.SATURDAY.toString()).toBe('"SATURDAY"');
  });

  {
    const _: Weekday.Kind = "MONDAY";
  }
  {
    const _: Weekday.Kind = "?";
  }
});

describe("recursive enum", () => {
  describe("#from", () => {
    it("constant name", () => {
      expect(JsonValue.create("NULL")).toBe(JsonValue.NULL);
    });

    it("constant", () => {
      expect(JsonValue.create(JsonValue.NULL)).toBe(JsonValue.NULL);
    });
  });

  const complexValue = JsonValue.create({
    kind: "array",
    value: [
      "NULL",
      {
        kind: "boolean",
        value: true,
      },
      JsonValue.NULL,
      {
        kind: "object",
        value: [
          {
            name: "foo",
            value: {
              kind: "string",
              value: "bar",
            },
          },
        ],
      },
    ],
  });

  const serializerTester = new SerializerTester(JsonValue.SERIALIZER);
  serializerTester.reserializeAndAssert(JsonValue.NULL, {
    denseJson: 1,
    readableJson: "NULL",
    bytesAsBase16: "01",
  });
  serializerTester.reserializeAndAssert(complexValue, {
    denseJson: [4, [1, [100, true], 1, [5, [["foo", [3, "bar"]]]]]],
    readableJson: {
      kind: "array",
      value: [
        "NULL",
        {
          kind: "boolean",
          value: true,
        },
        "NULL",
        {
          kind: "object",
          value: [
            {
              name: "foo",
              value: {
                kind: "string",
                value: "bar",
              },
            },
          ],
        },
      ],
    },
    bytesAsBase16: "fdf90401f8640101fef7f8f303666f6ffcf303626172",
  });

  it("#kind", () => {
    expect(complexValue.kind).toBe("array");
  });

  it("#value", () => {
    expect(Array.isArray(complexValue.value)).toBe(true);
  });

  it("#union", () => {
    expect(complexValue.union).toBe(complexValue as JsonValue.UnionView);
  });

  it("switch", () => {
    const arrayLength = (() => {
      switch (complexValue.union.kind) {
        case "?":
          return -1;
        case "array":
          return complexValue.union.value.length;
        default:
          return 0;
      }
    })();
    expect(arrayLength).toBe(4);
  });

  it("#toString", () => {
    expect(complexValue.toString()).toBe(
      [
        "{",
        '  "kind": "array",',
        '  "value": [',
        '    "NULL",',
        "    {",
        '      "kind": "boolean",',
        '      "value": true',
        "    },",
        '    "NULL",',
        "    {",
        '      "kind": "object",',
        '      "value": [',
        "        {",
        '          "name": "foo",',
        '          "value": {',
        '            "kind": "string",',
        '            "value": "bar"',
        "          }",
        "        }",
        "      ]",
        "    }",
        "  ]",
        "}",
      ].join("\n"),
    );
  });

  {
    const _: JsonValue.Kind = "NULL";
  }
  {
    const _: JsonValue.Kind = "array";
  }
});

describe("enum reflection", () => {
  it("get module path", () => {
    expect(Car.SERIALIZER.typeDescriptor.modulePath).toBe("vehicles/car.soia");
  });

  it("get record name", () => {
    expect(JsonValue.SERIALIZER.typeDescriptor.name).toBe("JsonValue");
    expect(JsonValue.SERIALIZER.typeDescriptor.qualifiedName).toBe("JsonValue");
    expect(JsonValue.Pair.SERIALIZER.typeDescriptor.name).toBe("Pair");
    expect(JsonValue.Pair.SERIALIZER.typeDescriptor.qualifiedName).toBe(
      "JsonValue.Pair",
    );
  });

  it("get parent type", () => {
    expect(JsonValue.Pair.SERIALIZER.typeDescriptor.parentType).toBe(
      JsonValue.SERIALIZER.typeDescriptor,
    );
    expect(JsonValue.SERIALIZER.typeDescriptor.parentType).toBe(undefined);
  });

  it("get field", () => {
    const typeDescriptor = JsonValue.SERIALIZER.typeDescriptor;
    expect(typeDescriptor.kind).toBe("enum");

    const nullField: EnumField<JsonValue> = typeDescriptor.getField("NULL");
    const arrayField: EnumField<JsonValue> = typeDescriptor.getField("array");
    const unknownField: EnumField<JsonValue> = typeDescriptor.getField("?");

    expect(nullField).toBe(typeDescriptor.getField(1)!);
    expect(arrayField).toBe(typeDescriptor.getField(4)!);
    expect(unknownField).toBe(typeDescriptor.getField(0)!);

    expect(nullField.name).toBe("NULL");
    expect(nullField.number).toBe(1);
    expect(arrayField.name).toBe("array");
    expect(arrayField.number).toBe(4);
    expect(unknownField.name).toBe("?");
    expect(unknownField.number).toBe(0);

    const arrayType = arrayField.type!;
    expect(arrayType.kind).toBe("array");
    if (arrayType.kind === "array") {
      expect(arrayType.itemType.kind).toBe("enum");
    }

    expect(typeDescriptor.getField("foo")).toBe(undefined);
    expect(typeDescriptor.getField(10)).toBe(undefined);

    // Let's make sure that the return type is nullable.
    {
      const absentField = typeDescriptor.getField("foo");
      const _: undefined extends typeof absentField ? true : never = true;
    }
    {
      const absentField = typeDescriptor.getField(10);
      const _: undefined extends typeof absentField ? true : never = true;
    }
  });
});
