import { JsonValue } from "../soiagen/enums.soia.js";
import { MY_PROCEDURE, WITH_EXPLICIT_NUMBER } from "../soiagen/methods.soia.js";
import { Point } from "../soiagen/structs.soia.js";
import { expect, is } from "buckwheat";
import { describe, it } from "mocha";
import * as soia from "soia";

describe("methods", () => {
  describe("works", () => {
    it("#0", () => {
      const _: soia.Method<Point, JsonValue> = MY_PROCEDURE;
      expect(MY_PROCEDURE).toMatch({
        name: "MyProcedure",
        number: 1974132327,
        requestSerializer: is(Point.SERIALIZER),
        responseSerializer: is(JsonValue.SERIALIZER),
      });
    });
    it("#1", () => {
      const _: soia.Method<
        ReadonlyArray<Point>,
        JsonValue | null
      > = WITH_EXPLICIT_NUMBER;
      expect(WITH_EXPLICIT_NUMBER).toMatch({
        name: "WithExplicitNumber",
        number: 3,
      });
    });
  });
});
