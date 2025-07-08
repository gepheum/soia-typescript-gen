import { SerializerTester } from "../../node_modules/soia/dist/esm/serializer_tester.js";
import {
  CarOwner,
  Floats,
  FullName,
  Item,
  Items,
  Point,
  Triangle,
} from "../soiagen/structs.js";
import { expect } from "buckwheat";
import { describe, it } from "mocha";
import { ByteString, Timestamp } from "soia";
import { MutableForm, StructDescriptor, StructField } from "soia";

describe("structs", () => {
  it("reserialize", () => {
    const serializer = Point.SERIALIZER;
    const serializerTester = new SerializerTester(serializer);
    serializerTester.reserializeAndAssert(
      Point.create({
        x: 10,
        y: 11,
      }),
      {
        denseJson: [10, 11],
        readableJson: {
          x: 10,
          y: 11,
        },
        bytesAsBase16: "f80a0b",
      },
    );
    serializerTester.reserializeAndAssert(Point.DEFAULT, {
      denseJson: [],
      readableJson: {},
      bytesAsBase16: "f6",
    });
    serializerTester.reserializeAndAssert(Point.DEFAULT.toMutable(), {
      denseJson: [],
      readableJson: {},
      bytesAsBase16: "f6",
    });
    serializerTester.deserializeZeroAndAssert((p) => p.x === 0 && p.y === 0);
  });

  it("create partial versus whole", () => {
    {
      const _: Point = Point.create<"partial">({
        x: 10,
      });
    }
    {
      const _: Point = Point.create<"partial">({
        x: 10,
      });
    }
    {
      const _: Point = Point.create<"whole">({
        x: 10,
        y: 11,
      });
    }
  });

  it("#toString()", () => {
    expect(Point.DEFAULT.toString()).toBe("{}");
    expect(Point.create<"partial">({ x: 10 }).toString()).toBe(
      '{\n  "x": 10\n}',
    );
    expect(Point.create<"partial">({ x: 10, y: 20 }).toString()).toBe(
      '{\n  "x": 10,\n  "y": 20\n}',
    );
  });

  it("properties of default Point", () => {
    expect(Point.DEFAULT.x).toBe(0);
    expect(Point.DEFAULT.y).toBe(0);
  });

  it("make modified copy", () => {
    const mutablePoint = Point.create({
      x: 10,
      y: 11,
    }).toMutable();
    mutablePoint.y = 12;
    const point = mutablePoint.toFrozen();
    expect(point.x).toBe(10);
    expect(point.y).toBe(12);
  });

  it("#toFrozen() returns this if this is frozen", () => {
    const point = Point.create({
      x: 10,
      y: 11,
    });
    expect(point.toFrozen()).toBe(point);
  });

  describe("mutableArray() getter", () => {
    const p0 = Point.create<"partial">({ x: 10 });
    const p1 = Point.create<"partial">({ x: 11 });
    const points = Object.freeze([p0, p1]);
    it("#0", () => {
      const mutableTriangle = new Triangle.Mutable();
      mutableTriangle.mutablePoints.push(p0);
      expect(mutableTriangle.points).toMatch([p0]);
    });
    it("#1", () => {
      const mutableTriangle = new Triangle.Mutable();
      mutableTriangle.points = points;
      const mutablePoints = mutableTriangle.mutablePoints;
      // Would throw an error if a copy wasn't made.
      mutablePoints.push(p0);
      it("#1.0", () => {
        expect(mutableTriangle.points).toBe(mutablePoints);
      });
      it("#1.1", () => {
        expect(mutableTriangle.mutablePoints).toBe(mutablePoints);
      });
    });
    it("#2", () => {
      const mutableTriangle = new Triangle.Mutable();
      mutableTriangle.points = points;
      const mutablePointsBefore = mutableTriangle.mutablePoints;
      mutableTriangle.points = points;
      const mutablePointsAfter = [p0, p1];
      mutablePointsAfter.push(p0);
      it("#2.0", () => {
        expect(mutableTriangle.points).toMatch([p0, p1, p0]);
      });
      it("#2.1", () => {
        expect(mutablePointsBefore).toMatch([p0, p1]);
      });
    });
  });

  it("mutable struct getter", () => {
    const mutable = new CarOwner.Mutable();
    mutable.mutableOwner.firstName = "John";
    mutable.mutableOwner.lastName = "Doe";
    mutable.mutableCar.mutableOwner.userId = BigInt(123);
    mutable.mutableCar.purchaseTime = Timestamp.parse("2024-03-11T08:00:00Z");
    let carOwner: CarOwner = mutable.toFrozen();
    expect(carOwner).toMatch({
      car: {
        purchaseTime: {
          unixMillis: 1710144000000,
        },
        owner: {
          userId: BigInt("123"),
        },
      },
      owner: {
        firstName: "John",
        lastName: "Doe",
      },
    });
    mutable.owner = FullName.create<"partial">({
      firstName: "Jane",
      lastName: "Jackson",
    });
    mutable.mutableOwner.lastName = "Johnson";
    carOwner = mutable.toFrozen();
    expect(carOwner).toMatch({
      car: {
        purchaseTime: {
          unixMillis: 1710144000000,
        },
        owner: {
          userId: BigInt("123"),
        },
      },
      owner: {
        firstName: "Jane",
        lastName: "Johnson",
      },
    });
  });

  describe("floats", () => {
    const serializerTester = new SerializerTester(Floats.SERIALIZER);
    serializerTester.reserializeAndAssert(
      Floats.create<"partial">({ x: 0 / 0 }),
      {
        denseJson: ["NaN"],
        readableJson: {
          x: "NaN",
        },
        bytesAsBase16: "f7f00000c07f",
      },
    );
    serializerTester.reserializeAndAssert(
      Floats.create<"partial">({ y: 1 / 0 }),
      {
        denseJson: [0, "Infinity"],
        readableJson: {
          y: "Infinity",
        },
        bytesAsBase16: "f800f1000000000000f07f",
      },
    );
    serializerTester.reserializeAndAssert(
      Floats.create<"partial">({ y: -1 / 0 }),
      {
        denseJson: [0, "-Infinity"],
        readableJson: {
          y: "-Infinity",
        },
        bytesAsBase16: "f800f1000000000000f0ff",
      },
    );
  });
});

describe("struct reflection", () => {
  it("get module path", () => {
    expect(FullName.SERIALIZER.typeDescriptor.modulePath).toBe("structs.soia");
  });

  it("get record name", () => {
    expect(FullName.SERIALIZER.typeDescriptor.name).toBe("FullName");
    expect(FullName.SERIALIZER.typeDescriptor.qualifiedName).toBe("FullName");
    expect(Item.User.SERIALIZER.typeDescriptor.name).toBe("User");
    expect(Item.User.SERIALIZER.typeDescriptor.qualifiedName).toBe("Item.User");
  });

  it("get parent type", () => {
    expect(Item.User.SERIALIZER.typeDescriptor.parentType).toBe(
      Item.SERIALIZER.typeDescriptor,
    );
    expect(Item.SERIALIZER.typeDescriptor.parentType).toBe(undefined);
  });

  it("get field", () => {
    const typeDescriptor = FullName.SERIALIZER.typeDescriptor;
    expect(typeDescriptor.kind).toBe("struct");

    const firstName: StructField<FullName> =
      typeDescriptor.getField("firstName");
    const lastName: StructField<FullName> =
      typeDescriptor.getField("lastName")!;
    expect(firstName).toBe(typeDescriptor.getField(0)!);
    expect(lastName).toBe(typeDescriptor.getField(2)!);
    expect(lastName).toBe(typeDescriptor.getField("last_name")!);

    expect(firstName.name).toBe("first_name");
    expect(firstName.property).toBe("firstName");
    expect(firstName.number).toBe(0);
    expect(lastName.name).toBe("last_name");

    const lastNameType = lastName.type;
    expect(lastNameType.kind).toBe("primitive");
    if (lastNameType.kind === "primitive") {
      expect(lastNameType.primitive).toBe("string");
    }

    expect(typeDescriptor.getField("foo")).toBe(undefined);
    expect(typeDescriptor.getField(1)).toBe(undefined);

    // Let's make sure that the return type is nullable.
    // Let's make sure that the return type is nullable.
    {
      const absentField = typeDescriptor.getField("foo");
      const _: undefined extends typeof absentField ? true : never = true;
    }
    {
      const absentField = typeDescriptor.getField(1);
      const _: undefined extends typeof absentField ? true : never = true;
    }
  });

  it("get and set field", () => {
    const typeDescriptor = FullName.SERIALIZER.typeDescriptor;
    const firstName: StructField<FullName> =
      typeDescriptor.getField("firstName");

    const fullName = FullName.create<"partial">({
      firstName: "Jane",
      lastName: "Doe",
    });
    const mutableFullName = fullName.toMutable();
    expect(firstName.get(fullName)).toBe("Jane");
    expect(firstName.get(mutableFullName)).toBe("Jane");
    firstName.set(mutableFullName, "John");
    expect(firstName.get(mutableFullName)).toBe("John");
  });

  it("create new mutable with reflection", () => {
    function copyValue<T, Value>(
      field: StructField<T, Value>,
      source: T | MutableForm<T>,
      target: MutableForm<T>,
    ): void {
      const value: Value = field.get(source);
      field.set(target, value);
    }

    function copyAllFieldsButOne<T>(
      descriptor: StructDescriptor<T>,
      copyable: T,
      skipName: string,
    ): T {
      const mutable: MutableForm<T> = descriptor.newMutable();
      for (const field of descriptor.fields) {
        if (field.name !== skipName) {
          copyValue(field, copyable, mutable);
        }
      }
      return mutable.toFrozen();
    }

    const fullName = FullName.create<"partial">({
      firstName: "Jane",
      lastName: "Doe",
    });
    const copy = copyAllFieldsButOne(
      FullName.SERIALIZER.typeDescriptor,
      fullName,
      "first_name",
    );
    expect(FullName.SERIALIZER.toJson(copy)).toMatch(["", 0, "Doe"]);
  });

  it("TypeDescriptor#asJson()", () => {
    expect(FullName.SERIALIZER.typeDescriptor.asJson()).toMatch({
      type: {
        kind: "record",
        value: "structs.soia:FullName",
      },
      records: [
        {
          kind: "struct",
          id: "structs.soia:FullName",
          fields: [
            {
              name: "first_name",
              type: {
                kind: "primitive",
                value: "string",
              },
              number: 0,
            },
            {
              name: "last_name",
              type: {
                kind: "primitive",
                value: "string",
              },
              number: 2,
            },
            {
              name: "suffix",
              type: {
                kind: "primitive",
                value: "string",
              },
              number: 3,
            },
          ],
          removed_fields: [1],
        },
      ],
    });
  });
  new SerializerTester(
    FullName.SERIALIZER,
  ).reserializeTypeAdapterAndAssertNoLoss();
});

describe("struct with indexed arrays", () => {
  describe("works", () => {
    const item0 = Item.create({
      bool: false,
      int32: 10,
      int64: BigInt(10),
      string: "s10",
      user: { id: "id10" },
      weekday: "MONDAY",
      timestamp: Timestamp.fromUnixMillis(123),
      bytes: ByteString.fromBase16("AA88"),
    });
    const item1 = Item.create({
      bool: true,
      int32: 11,
      int64: BigInt(11),
      string: "s11",
      user: { id: "id11" },
      weekday: "TUESDAY",
      timestamp: Timestamp.fromUnixMillis(234),
      bytes: ByteString.fromBase16("AA99"),
    });
    const item2 = Item.create({
      bool: true,
      int32: 12,
      int64: BigInt(120000000000),
      string: "s12",
      user: { id: "id12" },
      weekday: "WEDNESDAY",
      timestamp: Timestamp.fromUnixMillis(345),
      bytes: ByteString.fromBase16("BB00"),
    });
    const array = [item0, item1, item2];
    const items = Items.create({
      arrayWithBoolKey: array,
      arrayWithInt32Key: array,
      arrayWithInt64Key: array,
      arrayWithStringKey: array,
      arrayWithWrapperKey: array,
      arrayWithEnumKey: array,
      arrayWithBytesKey: array,
      arrayWithTimestampKey: array,
    });

    it("#0", () => {
      expect(items.searchArrayWithBoolKey(false)).toBe(item0);
    });
    it("#1", () => {
      expect(items.searchArrayWithBoolKey(true)).toBe(item2);
    });
    it("#2", () => {
      expect(items.searchArrayWithEnumKey("TUESDAY")).toBe(item1);
    });
    it("#3", () => {
      expect(items.searchArrayWithInt32Key(10)).toBe(item0);
    });
    it("#4", () => {
      expect(items.searchArrayWithInt64Key(BigInt("120000000000"))).toBe(item2);
    });
    it("#5", () => {
      expect(items.searchArrayWithStringKey("s12")).toBe(item2);
    });
    it("#6", () => {
      expect(items.searchArrayWithWrapperKey("id12")).toBe(item2);
    });
    it("#7", () => {
      expect(items.searchArrayWithBytesKey(ByteString.fromBase16("BB00"))).toBe(
        item2,
      );
    });
    it("#8", () => {
      expect(
        items.searchArrayWithTimestampKey(Timestamp.fromUnixMillis(345)),
      ).toBe(item2);
    });
    it("#9", () => {
      expect(items.searchArrayWithStringKey(" ")).toBe(undefined);
    });
    it("10", () => {
      expect(Items.create<"partial">({}).searchArrayWithStringKey(" ")).toBe(
        undefined,
      );
    });

    const mutableItems = items.toMutable();
    it("11", () => {
      expect(mutableItems.arrayWithEnumKey).toMatch(array);
    });
    Items.SERIALIZER.toJson(items);
    Items.SERIALIZER.toJson(items.toMutable());
    it("#12", () => {
      expect(mutableItems.toString()).toBe(items.toString());
    });
    it("#13", () => {
      expect(mutableItems.toString()).toMatch(
        Items.SERIALIZER.toJsonCode(items, "readable"),
      );
    });

    it("TypeDescriptor#asJson()", () => {
      expect(Items.SERIALIZER.typeDescriptor.asJson()).toMatch({
        type: {
          kind: "record",
          value: "structs.soia:Items",
        },
        records: [
          {
            fields: [
              {
                name: "array_with_bool_key",
                type: {
                  value: {
                    key_chain: "bool",
                  },
                },
              },
              {
                name: "array_with_string_key",
                type: {
                  value: {
                    key_chain: "string",
                  },
                },
              },
              {
                name: "array_with_int32_key",
                type: {
                  value: {
                    key_chain: "int32",
                  },
                },
              },
              {
                name: "array_with_int64_key",
                type: {
                  value: {
                    key_chain: "int64",
                  },
                },
              },
              {
                name: "array_with_wrapper_key",
                type: {
                  kind: "array",
                  value: {
                    key_chain: "user.id",
                  },
                },
              },
              {
                name: "array_with_enum_key",
                type: {
                  value: {
                    key_chain: "weekday.kind",
                  },
                },
              },
              {
                name: "array_with_bytes_key",
                type: {
                  value: {
                    key_chain: "bytes",
                  },
                },
              },
              {
                name: "array_with_timestamp_key",
                type: {
                  value: {
                    key_chain: "timestamp",
                  },
                },
              },
            ],
          },
          {},
          {},
          {},
        ],
      });
    });
  });
});
