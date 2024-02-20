import {
  BarAfter,
  FooAfter,
  FooBefore,
} from "../soiagen/schema_change.soia.js";
import { expect } from "buckwheat";
import { describe, it } from "mocha";

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
      BarAfter.create({
        x: 3.0,
      }),
    ],
    n: 100,
    bit: true,
  });

  it("are kept in JSON format", () => {
    const fooBefore = FooBefore.SERIALIZER.fromJson(
      FooAfter.SERIALIZER.toJson(foo),
    );
    const reserialized = FooAfter.SERIALIZER.fromJson(
      FooBefore.SERIALIZER.toJson(fooBefore),
    );
    expect(reserialized).toMatch(foo);
  });

  it("are kept in binary format", () => {
    const fooBefore = FooBefore.SERIALIZER.fromBytes(
      FooAfter.SERIALIZER.toBytes(foo).toBuffer(),
    );
    const reserialized = FooAfter.SERIALIZER.fromBytes(
      FooBefore.SERIALIZER.toBytes(fooBefore).toBuffer(),
    );
    expect(reserialized).toMatch(foo);
  });
});
