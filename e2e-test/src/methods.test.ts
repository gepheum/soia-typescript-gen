import { expect, is } from "buckwheat";
import { describe, it } from "mocha";
import * as soia from "soia";
import { JsonValue } from "../soiagen/enums.js";
import {
  MyMethod,
  MyProcedure,
  MyRequest,
  MyResponse,
  WithExplicitNumber,
} from "../soiagen/methods.js";
import { Point } from "../soiagen/structs.js";

describe("methods", () => {
  describe("works", () => {
    it("#0", () => {
      const _: soia.Method<Point, JsonValue> = MyProcedure;
      expect(MyProcedure).toMatch({
        name: "MyProcedure",
        number: 1974132327,
        requestSerializer: is(Point.serializer),
        responseSerializer: is(JsonValue.serializer),
      });
      expect(MyMethod).toMatch({
        name: "MyMethod",
        requestSerializer: is(MyRequest.serializer),
        responseSerializer: is(MyResponse.serializer),
      });
    });
    it("#1", () => {
      const _: soia.Method<
        ReadonlyArray<Point>,
        JsonValue | null
      > = WithExplicitNumber;
      expect(WithExplicitNumber).toMatch({
        name: "WithExplicitNumber",
        number: 3,
      });
    });
  });
});
