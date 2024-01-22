// GENERATED CODE, DO NOT EDIT

import * as $ from "soia";

import { JsonValue as JsonValue } from "./enums.soia";
import { Point as Point } from "./structs.soia";

// -----------------------------------------------------------------------------
// Methods
// -----------------------------------------------------------------------------

export const MY_PROCEDURE: $.Method<Point, JsonValue> = {
  name: "MyProcedure",
  number: 1974132327,
  requestSerializer: Point.SERIALIZER,
  responseSerializer: JsonValue.SERIALIZER,
};

export const WITH_EXPLICIT_NUMBER: $.Method<ReadonlyArray<Point>, JsonValue | null> = {
  name: "WithExplicitNumber",
  number: 3,
  requestSerializer: $.arraySerializer(Point.SERIALIZER),
  responseSerializer: $.nullableSerializer(JsonValue.SERIALIZER),
};
