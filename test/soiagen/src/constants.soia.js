"use strict";
// GENERATED CODE, DO NOT EDIT
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ONE_SINGLE_QUOTED_STRING = exports.ONE_TIMESTAMP = exports.ONE_CONSTANT = void 0;
const $ = __importStar(require("soia"));
const enums_soia_1 = require("./enums.soia");
// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------
exports.ONE_CONSTANT = enums_soia_1.JsonValue.fromCopyable({
    kind: "array",
    value: $._toFrozenArray([
        enums_soia_1.JsonValue.fromCopyable({
            kind: "boolean",
            value: true,
        }),
        enums_soia_1.JsonValue.fromCopyable({
            kind: "number",
            value: 3.14,
        }),
        enums_soia_1.JsonValue.fromCopyable({
            kind: "string",
            value: "\n        foo\n        bar",
        }),
        enums_soia_1.JsonValue.fromCopyable({
            kind: "object",
            value: $._toFrozenArray([
                enums_soia_1.JsonValue.Pair.create({
                    name: "foo",
                    value: enums_soia_1.JsonValue.fromCopyable("NULL"),
                }),
            ], (e) => e),
        }),
    ], (e) => e),
});
exports.ONE_TIMESTAMP = $.Timestamp.parse("2023-12-31T00:53:48+00:00");
exports.ONE_SINGLE_QUOTED_STRING = "\"Foo\"";
//# sourceMappingURL=constants.soia.js.map