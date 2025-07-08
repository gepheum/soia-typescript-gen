import { toBase16 } from "../../node_modules/soia/dist/esm/serializer_tester.js";
import {
  BarAfter,
  EnumAfter,
  FooAfter,
  FooBefore,
  RemovalAfter,
  RemovalBefore,
  Zelda,
} from "../soiagen/schema_change.js";
import { expect } from "buckwheat";
import { describe, it } from "mocha";

describe("schema change", () => {
  describe("unrecognized fields", () => {
    const foo = FooAfter.create({
      bars: [
        BarAfter.create({
          x: 2.5,
          s: "S0",
        }),
        BarAfter.create({
          x: 2.0,
          s: "S1",
        }),
        BarAfter.DEFAULT,
        BarAfter.create<"partial">({
          x: 3.0,
        }),
      ],
      n: 100,
      enums: [
        EnumAfter.UNKNOWN,
        EnumAfter.A,
        EnumAfter.B,
        EnumAfter.create({ kind: "c", value: "CcC" }),
      ],
      bit: true,
    });

    it("are kept in JSON format", () => {
      const fooBefore = FooBefore.SERIALIZER.fromJson(
        FooAfter.SERIALIZER.toJson(foo),
        "keep-unrecognized-fields",
      );
      const reserialized = FooAfter.SERIALIZER.fromJson(
        FooBefore.SERIALIZER.toJson(fooBefore),
        "keep-unrecognized-fields",
      );
      expect(reserialized).toMatch(foo);
    });

    it("are kept in JSON format even when made mutable", () => {
      const fooBefore = FooBefore.SERIALIZER.fromJson(
        FooAfter.SERIALIZER.toJson(foo.toMutable()),
        "keep-unrecognized-fields",
      );
      const reserialized = FooAfter.SERIALIZER.fromJson(
        FooBefore.SERIALIZER.toJson(fooBefore.toMutable()),
        "keep-unrecognized-fields",
      );
      expect(reserialized).toMatch(foo);
    });

    it("are kept in binary format", () => {
      const fooBefore = FooBefore.SERIALIZER.fromBytes(
        FooAfter.SERIALIZER.toBytes(foo).toBuffer(),
        "keep-unrecognized-fields",
      );
      const reserialized = FooAfter.SERIALIZER.fromBytes(
        FooBefore.SERIALIZER.toBytes(fooBefore).toBuffer(),
        "keep-unrecognized-fields",
      );
      expect(reserialized).toMatch(foo);
    });

    it("make a struct not default", () => {
      const structHolder = Zelda.StructHolder.create({
        s: Zelda.Struct.create({
          a: 3,
        }),
      });
      const structHolderBefore = Zelda.StructHolderBefore.SERIALIZER.fromBytes(
        Zelda.StructHolder.SERIALIZER.toBytes(structHolder).toBuffer(),
        "keep-unrecognized-fields",
      );
      expect(
        toBase16(
          Zelda.StructHolderBefore.SERIALIZER.toBytes(
            structHolderBefore,
          ).toBuffer(),
        ),
      ).toMatch("f7f703");
    });

    it("make an enum not default", () => {
      const enumHolder = Zelda.EnumHolder.create({
        e: Zelda.Enum.A,
      });
      const enumHolderBefore = Zelda.EnumHolderBefore.SERIALIZER.fromBytes(
        Zelda.EnumHolder.SERIALIZER.toBytes(enumHolder).toBuffer(),
        "keep-unrecognized-fields",
      );
      expect(
        toBase16(
          Zelda.EnumHolderBefore.SERIALIZER.toBytes(
            enumHolderBefore,
          ).toBuffer(),
        ),
      ).toMatch("f701");
    });
  });

  describe("removed fields", () => {
    const before = RemovalBefore.create({
      a: "AA",
      b: "BB",
      es: [
        RemovalBefore.E.C,
        RemovalBefore.E.D,
        RemovalBefore.E.create({ kind: "e", value: "EE" }),
      ],
    });

    const expected = RemovalBefore.create<"partial">({
      b: "BB",
      es: [RemovalBefore.E.C, RemovalBefore.E.UNKNOWN, RemovalBefore.E.UNKNOWN],
    });

    it("are removed when deserializing from JSON", () => {
      const reserialized = RemovalBefore.SERIALIZER.fromJson(
        RemovalAfter.SERIALIZER.toJson(
          RemovalAfter.SERIALIZER.fromJson(
            RemovalBefore.SERIALIZER.toJson(before),
            "keep-unrecognized-fields",
          ),
        ),
        "keep-unrecognized-fields",
      );
      expect(reserialized).toMatch(expected);
    });

    it("are removed when deserializing from bytes", () => {
      const reserialized = RemovalBefore.SERIALIZER.fromBytes(
        RemovalAfter.SERIALIZER.toBytes(
          RemovalAfter.SERIALIZER.fromBytes(
            RemovalBefore.SERIALIZER.toBytes(before).toBuffer(),
            "keep-unrecognized-fields",
          ),
        ).toBuffer(),
        "keep-unrecognized-fields",
      );
      expect(reserialized).toMatch(expected);
    });
  });
});
