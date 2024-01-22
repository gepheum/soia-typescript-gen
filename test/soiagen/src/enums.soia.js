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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumWithRecursiveDefault = exports.JsonValue = exports.Weekday = void 0;
const $ = __importStar(require("soia"));
// -----------------------------------------------------------------------------
// enum Weekday
// -----------------------------------------------------------------------------
class Weekday extends $._EnumBase {
    static fromCopyable(copyable) {
        if (copyable instanceof _a) {
            return copyable;
        }
        switch (copyable) {
            case "MONDAY": {
                return _a.MONDAY;
            }
            case "TUESDAY": {
                return _a.TUESDAY;
            }
            case "WEDNESDAY": {
                return _a.WEDNESDAY;
            }
            case "THURSDAY": {
                return _a.THURSDAY;
            }
            case "FRIDAY": {
                return _a.FRIDAY;
            }
            case "SATURDAY": {
                return _a.SATURDAY;
            }
            case "SUNDAY": {
                return _a.SUNDAY;
            }
        }
        throw new TypeError();
    }
    constructor(kind) {
        super();
        this.kind = kind;
        Object.freeze(this);
    }
}
exports.Weekday = Weekday;
_a = Weekday;
Weekday.MONDAY = new _a("MONDAY");
Weekday.TUESDAY = new _a("TUESDAY");
Weekday.WEDNESDAY = new _a("WEDNESDAY");
Weekday.THURSDAY = new _a("THURSDAY");
Weekday.FRIDAY = new _a("FRIDAY");
Weekday.SATURDAY = new _a("SATURDAY");
Weekday.SUNDAY = new _a("SUNDAY");
Weekday.DEFAULT = _a.MONDAY;
Weekday.SERIALIZER = $._newEnumSerializer(_a.DEFAULT);
// -----------------------------------------------------------------------------
// struct JsonValue.Pair
// -----------------------------------------------------------------------------
// Exported as 'JsonValue.Pair.Builder'
class JsonValue_Pair_Mutable extends $._MutableBase {
    constructor(copyable = JsonValue_Pair.DEFAULT) {
        super();
        initJsonValue_Pair(this, copyable);
        this.value = JsonValue.fromCopyable(copyable.value || JsonValue.DEFAULT);
        Object.seal(this);
    }
    toFrozen() {
        return JsonValue_Pair.create(this);
    }
}
// Exported as 'JsonValue.Pair'
class JsonValue_Pair extends $._FrozenBase {
    static create(copyable) {
        if (copyable instanceof _b) {
            return copyable;
        }
        return new _b(copyable);
    }
    constructor(copyable) {
        super();
        initJsonValue_Pair(this, copyable);
        if (copyable.value) {
            this._value = JsonValue.fromCopyable(copyable.value);
        }
        Object.freeze(this);
    }
    get value() {
        return this._value || JsonValue.DEFAULT;
    }
}
_b = JsonValue_Pair;
JsonValue_Pair.DEFAULT = new _b({});
JsonValue_Pair.Mutable = JsonValue_Pair_Mutable;
JsonValue_Pair.SERIALIZER = $._newStructSerializer(_b.DEFAULT);
function initJsonValue_Pair(target, copyable) {
    target.name = copyable.name || "";
}
// -----------------------------------------------------------------------------
// enum JsonValue
// -----------------------------------------------------------------------------
class JsonValue extends $._EnumBase {
    static create(kind, value) {
        let v;
        switch (kind) {
            case "boolean": {
                v = value;
                break;
            }
            case "number": {
                v = value;
                break;
            }
            case "string": {
                v = value;
                break;
            }
            case "array": {
                v = $._toFrozenArray(value, (e) => _c.fromCopyable(e));
                break;
            }
            case "object": {
                v = $._toFrozenArray(value, (e) => JsonValue_Pair.create(e));
                break;
            }
            default: {
                throw new TypeError();
            }
        }
        return new _c(kind, v);
    }
    static fromCopyable(copyable) {
        if (copyable instanceof _c) {
            return copyable;
        }
        if (copyable instanceof Object) {
            return this.create(copyable.kind, copyable.value);
        }
        switch (copyable) {
            case "NULL": {
                return _c.NULL;
            }
        }
        throw new TypeError();
    }
    constructor(kind, value) {
        super();
        this.kind = kind;
        this.value = value;
        Object.freeze(this);
    }
}
exports.JsonValue = JsonValue;
_c = JsonValue;
JsonValue.NULL = new _c("NULL", undefined);
JsonValue.DEFAULT = _c.NULL;
JsonValue.SERIALIZER = $._newEnumSerializer(_c.DEFAULT);
JsonValue.Pair = JsonValue_Pair;
// -----------------------------------------------------------------------------
// struct EnumWithRecursiveDefault.S
// -----------------------------------------------------------------------------
// Exported as 'EnumWithRecursiveDefault.S.Builder'
class EnumWithRecursiveDefault_S_Mutable extends $._MutableBase {
    constructor(copyable = EnumWithRecursiveDefault_S.DEFAULT) {
        super();
        this.f = EnumWithRecursiveDefault.fromCopyable(copyable.f || EnumWithRecursiveDefault.DEFAULT);
        Object.seal(this);
    }
    toFrozen() {
        return EnumWithRecursiveDefault_S.create(this);
    }
}
// Exported as 'EnumWithRecursiveDefault.S'
class EnumWithRecursiveDefault_S extends $._FrozenBase {
    static create(copyable) {
        if (copyable instanceof _d) {
            return copyable;
        }
        return new _d(copyable);
    }
    constructor(copyable) {
        super();
        if (copyable.f) {
            this._f = EnumWithRecursiveDefault.fromCopyable(copyable.f);
        }
        Object.freeze(this);
    }
    get f() {
        return this._f || EnumWithRecursiveDefault.DEFAULT;
    }
}
_d = EnumWithRecursiveDefault_S;
EnumWithRecursiveDefault_S.DEFAULT = new _d({});
EnumWithRecursiveDefault_S.Mutable = EnumWithRecursiveDefault_S_Mutable;
EnumWithRecursiveDefault_S.SERIALIZER = $._newStructSerializer(_d.DEFAULT);
// -----------------------------------------------------------------------------
// enum EnumWithRecursiveDefault
// -----------------------------------------------------------------------------
class EnumWithRecursiveDefault extends $._EnumBase {
    static create(kind, value) {
        let v;
        switch (kind) {
            case "f": {
                v = EnumWithRecursiveDefault_S.create(value);
                break;
            }
            default: {
                throw new TypeError();
            }
        }
        return new _e(kind, v);
    }
    static fromCopyable(copyable) {
        if (copyable instanceof _e) {
            return copyable;
        }
        if (copyable instanceof Object) {
            return this.create(copyable.kind, copyable.value);
        }
        throw new TypeError();
    }
    constructor(kind, value) {
        super();
        this.kind = kind;
        this.value = value;
        Object.freeze(this);
    }
}
exports.EnumWithRecursiveDefault = EnumWithRecursiveDefault;
_e = EnumWithRecursiveDefault;
EnumWithRecursiveDefault.DEFAULT = new _e("f", EnumWithRecursiveDefault_S.DEFAULT);
EnumWithRecursiveDefault.SERIALIZER = $._newEnumSerializer(_e.DEFAULT);
EnumWithRecursiveDefault.S = EnumWithRecursiveDefault_S;
// -----------------------------------------------------------------------------
// Initialize the serializers
// -----------------------------------------------------------------------------
const _MODULE_PATH = "src/enums.soia";
$._initEnumSerializer(Weekday.SERIALIZER, "Weekday", "Weekday", _MODULE_PATH, undefined, [
    ["MONDAY", 0, Weekday.MONDAY],
    ["TUESDAY", 1, Weekday.TUESDAY],
    ["WEDNESDAY", 2, Weekday.WEDNESDAY],
    ["THURSDAY", 3, Weekday.THURSDAY],
    ["FRIDAY", 4, Weekday.FRIDAY],
    ["SATURDAY", 5, Weekday.SATURDAY],
    ["SUNDAY", 6, Weekday.SUNDAY],
], []);
$._initStructSerializer(JsonValue_Pair.SERIALIZER, "Pair", "JsonValue.Pair", _MODULE_PATH, JsonValue.SERIALIZER.typeDescriptor, [
    ["name", "name", 0, $.primitiveSerializer("string")],
    ["value", "value", 1, JsonValue.SERIALIZER],
], []);
$._initEnumSerializer(JsonValue.SERIALIZER, "JsonValue", "JsonValue", _MODULE_PATH, undefined, [
    ["NULL", 0, JsonValue.NULL],
    ["boolean", 1, $.primitiveSerializer("bool")], ["number", 2, $.primitiveSerializer("float64")], ["string", 3, $.primitiveSerializer("string")], ["array", 4, $.arraySerializer(JsonValue.SERIALIZER)], ["object", 5, $.arraySerializer(JsonValue_Pair.SERIALIZER)],
], []);
$._initStructSerializer(EnumWithRecursiveDefault_S.SERIALIZER, "S", "EnumWithRecursiveDefault.S", _MODULE_PATH, EnumWithRecursiveDefault.SERIALIZER.typeDescriptor, [
    ["f", "f", 0, EnumWithRecursiveDefault.SERIALIZER],
], []);
$._initEnumSerializer(EnumWithRecursiveDefault.SERIALIZER, "EnumWithRecursiveDefault", "EnumWithRecursiveDefault", _MODULE_PATH, undefined, [
    ["f", 0, EnumWithRecursiveDefault_S.SERIALIZER],
], []);
//# sourceMappingURL=enums.soia.js.map