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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullName = void 0;
const $ = __importStar(require("soia"));
// -----------------------------------------------------------------------------
// struct FullName
// -----------------------------------------------------------------------------
// Exported as 'FullName.Builder'
class FullName_Mutable extends $._MutableBase {
    constructor(copyable = FullName.DEFAULT) {
        super();
        initFullName(this, copyable);
        Object.seal(this);
    }
    toFrozen() {
        return FullName.create(this);
    }
}
class FullName extends $._FrozenBase {
    static create(copyable) {
        if (copyable instanceof _a) {
            return copyable;
        }
        return new _a(copyable);
    }
    constructor(copyable) {
        super();
        initFullName(this, copyable);
        Object.freeze(this);
    }
}
exports.FullName = FullName;
_a = FullName;
FullName.DEFAULT = new _a({});
FullName.Mutable = FullName_Mutable;
FullName.SERIALIZER = $._newStructSerializer(_a.DEFAULT);
function initFullName(target, copyable) {
    target.firstName = copyable.firstName || "";
    target.lastName = copyable.lastName || "";
}
// -----------------------------------------------------------------------------
// Initialize the serializers
// -----------------------------------------------------------------------------
const _MODULE_PATH = "src/full_name.soia";
$._initStructSerializer(FullName.SERIALIZER, "FullName", "FullName", _MODULE_PATH, undefined, [
    ["first_name", "firstName", 0, $.primitiveSerializer("string")],
    ["last_name", "lastName", 1, $.primitiveSerializer("string")],
], []);
//# sourceMappingURL=full_name.soia.js.map