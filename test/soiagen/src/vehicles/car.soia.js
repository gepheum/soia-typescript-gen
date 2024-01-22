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
exports.Car = void 0;
const $ = __importStar(require("soia"));
const user_soia_1 = require("../user.soia");
// -----------------------------------------------------------------------------
// struct Car
// -----------------------------------------------------------------------------
// Exported as 'Car.Builder'
class Car_Mutable extends $._MutableBase {
    constructor(copyable = Car.DEFAULT) {
        super();
        initCar(this, copyable);
        Object.seal(this);
    }
    get mutableOwner() {
        const v = this.owner;
        return v instanceof user_soia_1.User.Mutable ? v : (this.owner = v.toMutable());
    }
    toFrozen() {
        return Car.create(this);
    }
}
class Car extends $._FrozenBase {
    static create(copyable) {
        if (copyable instanceof _a) {
            return copyable;
        }
        return new _a(copyable);
    }
    constructor(copyable) {
        super();
        initCar(this, copyable);
        Object.freeze(this);
    }
}
exports.Car = Car;
_a = Car;
Car.DEFAULT = new _a({});
Car.Mutable = Car_Mutable;
Car.SERIALIZER = $._newStructSerializer(_a.DEFAULT);
function initCar(target, copyable) {
    target.model = copyable.model || "";
    target.purchaseTime = copyable.purchaseTime || $.Timestamp.UNIX_EPOCH;
    target.owner = user_soia_1.User.create(copyable.owner || user_soia_1.User.DEFAULT);
}
// -----------------------------------------------------------------------------
// Initialize the serializers
// -----------------------------------------------------------------------------
const _MODULE_PATH = "src/vehicles/car.soia";
$._initStructSerializer(Car.SERIALIZER, "Car", "Car", _MODULE_PATH, undefined, [
    ["model", "model", 0, $.primitiveSerializer("string")],
    ["purchase_time", "purchaseTime", 1, $.primitiveSerializer("timestamp")],
    ["owner", "owner", 2, user_soia_1.User.SERIALIZER],
], []);
//# sourceMappingURL=car.soia.js.map