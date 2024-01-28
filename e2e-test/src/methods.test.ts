import { expect, is } from "buckwheat";
import { describe, it } from "mocha";
import {
  MY_PROCEDURE,
  WITH_EXPLICIT_NUMBER,
} from "../soiagen/src/methods.soia.js";
import { Point } from "../soiagen/src/structs.soia.js";
import { JsonValue } from "../soiagen/src/enums.soia.js";
import * as soia from "soia";

describe("procedures", () => {
  it("works", () => {
    {
      const _: soia.Method<Point, JsonValue> = MY_PROCEDURE;
      expect(MY_PROCEDURE).toMatch({
        name: "MyProcedure",
        number: 1974132327,
        requestSerializer: is(Point.SERIALIZER),
        responseSerializer: is(JsonValue.SERIALIZER),
      });
    }
    {
      const _: soia.Method<
        ReadonlyArray<Point>,
        JsonValue | null
      > = WITH_EXPLICIT_NUMBER;
      expect(WITH_EXPLICIT_NUMBER).toMatch({
        name: "WithExplicitNumber",
        number: 3,
      });
    }
  });
});
