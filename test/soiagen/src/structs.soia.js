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
var _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Name = exports.RecB = exports.RecA = exports.NameCollision = exports.Foo = exports.CarOwner = exports.JsonValues = exports.Items = exports.Item = exports.FullName = exports.Triangle = exports.Color = exports.Point = void 0;
const $ = __importStar(require("soia"));
const enums_soia_1 = require("./enums.soia");
const x_car = __importStar(require("./vehicles/car.soia"));
// -----------------------------------------------------------------------------
// struct Point
// -----------------------------------------------------------------------------
// Exported as 'Point.Builder'
class Point_Mutable extends $._MutableBase {
    constructor(copyable = Point.DEFAULT) {
        super();
        initPoint(this, copyable);
        Object.seal(this);
    }
    toFrozen() {
        return Point.create(this);
    }
}
class Point extends $._FrozenBase {
    static create(copyable) {
        if (copyable instanceof _c) {
            return copyable;
        }
        return new _c(copyable);
    }
    constructor(copyable) {
        super();
        initPoint(this, copyable);
        Object.freeze(this);
    }
}
exports.Point = Point;
_c = Point;
Point.DEFAULT = new _c({});
Point.Mutable = Point_Mutable;
Point.SERIALIZER = $._newStructSerializer(_c.DEFAULT);
function initPoint(target, copyable) {
    target.x = copyable.x || 0;
    target.y = copyable.y || 0;
}
// -----------------------------------------------------------------------------
// struct Color
// -----------------------------------------------------------------------------
// Exported as 'Color.Builder'
class Color_Mutable extends $._MutableBase {
    constructor(copyable = Color.DEFAULT) {
        super();
        initColor(this, copyable);
        Object.seal(this);
    }
    toFrozen() {
        return Color.create(this);
    }
}
class Color extends $._FrozenBase {
    static create(copyable) {
        if (copyable instanceof _d) {
            return copyable;
        }
        return new _d(copyable);
    }
    constructor(copyable) {
        super();
        initColor(this, copyable);
        Object.freeze(this);
    }
}
exports.Color = Color;
_d = Color;
Color.DEFAULT = new _d({});
Color.Mutable = Color_Mutable;
Color.SERIALIZER = $._newStructSerializer(_d.DEFAULT);
function initColor(target, copyable) {
    target.r = copyable.r || 0;
    target.g = copyable.g || 0;
    target.b = copyable.b || 0;
}
// -----------------------------------------------------------------------------
// struct Triangle
// -----------------------------------------------------------------------------
// Exported as 'Triangle.Builder'
class Triangle_Mutable extends $._MutableBase {
    constructor(copyable = Triangle.DEFAULT) {
        super();
        initTriangle(this, copyable);
        Object.seal(this);
    }
    get mutableColor() {
        const v = this.color;
        return v instanceof Color.Mutable ? v : (this.color = v.toMutable());
    }
    get mutablePoints() {
        return this.points = $._toMutableArray(this.points);
    }
    toFrozen() {
        return Triangle.create(this);
    }
}
class Triangle extends $._FrozenBase {
    static create(copyable) {
        if (copyable instanceof _e) {
            return copyable;
        }
        return new _e(copyable);
    }
    constructor(copyable) {
        super();
        initTriangle(this, copyable);
        Object.freeze(this);
    }
}
exports.Triangle = Triangle;
_e = Triangle;
Triangle.DEFAULT = new _e({});
Triangle.Mutable = Triangle_Mutable;
Triangle.SERIALIZER = $._newStructSerializer(_e.DEFAULT);
function initTriangle(target, copyable) {
    target.color = Color.create(copyable.color || Color.DEFAULT);
    target.points = $._toFrozenArray(copyable.points || [], (e) => Point.create(e));
}
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
        if (copyable instanceof _f) {
            return copyable;
        }
        return new _f(copyable);
    }
    constructor(copyable) {
        super();
        initFullName(this, copyable);
        Object.freeze(this);
    }
}
exports.FullName = FullName;
_f = FullName;
FullName.DEFAULT = new _f({});
FullName.Mutable = FullName_Mutable;
FullName.SERIALIZER = $._newStructSerializer(_f.DEFAULT);
function initFullName(target, copyable) {
    target.firstName = copyable.firstName || "";
    target.lastName = copyable.lastName || "";
    target.suffix = copyable.suffix || "";
}
// -----------------------------------------------------------------------------
// struct Item.User
// -----------------------------------------------------------------------------
// Exported as 'Item.User.Builder'
class Item_User_Mutable extends $._MutableBase {
    constructor(copyable = Item_User.DEFAULT) {
        super();
        initItem_User(this, copyable);
        Object.seal(this);
    }
    toFrozen() {
        return Item_User.create(this);
    }
}
// Exported as 'Item.User'
class Item_User extends $._FrozenBase {
    static create(copyable) {
        if (copyable instanceof _g) {
            return copyable;
        }
        return new _g(copyable);
    }
    constructor(copyable) {
        super();
        initItem_User(this, copyable);
        Object.freeze(this);
    }
}
_g = Item_User;
Item_User.DEFAULT = new _g({});
Item_User.Mutable = Item_User_Mutable;
Item_User.SERIALIZER = $._newStructSerializer(_g.DEFAULT);
function initItem_User(target, copyable) {
    target.id = copyable.id || "";
}
// -----------------------------------------------------------------------------
// struct Item
// -----------------------------------------------------------------------------
// Exported as 'Item.Builder'
class Item_Mutable extends $._MutableBase {
    constructor(copyable = Item.DEFAULT) {
        super();
        initItem(this, copyable);
        Object.seal(this);
    }
    get mutableUser() {
        const v = this.user;
        return v instanceof Item_User.Mutable ? v : (this.user = v.toMutable());
    }
    toFrozen() {
        return Item.create(this);
    }
}
class Item extends $._FrozenBase {
    static create(copyable) {
        if (copyable instanceof _h) {
            return copyable;
        }
        return new _h(copyable);
    }
    constructor(copyable) {
        super();
        initItem(this, copyable);
        Object.freeze(this);
    }
}
exports.Item = Item;
_h = Item;
Item.DEFAULT = new _h({});
Item.Mutable = Item_Mutable;
Item.SERIALIZER = $._newStructSerializer(_h.DEFAULT);
Item.User = Item_User;
function initItem(target, copyable) {
    target.bool = copyable.bool || false;
    target.string = copyable.string || "";
    target.int32 = copyable.int32 || 0;
    target.int64 = copyable.int64 || BigInt(0);
    target.user = Item_User.create(copyable.user || Item_User.DEFAULT);
    target.weekday = enums_soia_1.Weekday.fromCopyable(copyable.weekday || enums_soia_1.Weekday.DEFAULT);
}
// -----------------------------------------------------------------------------
// struct Items
// -----------------------------------------------------------------------------
// Exported as 'Items.Builder'
class Items_Mutable extends $._MutableBase {
    constructor(copyable = Items.DEFAULT) {
        super();
        initItems(this, copyable);
        Object.seal(this);
    }
    get mutableArrayWithBoolKey() {
        return this.arrayWithBoolKey = $._toMutableArray(this.arrayWithBoolKey);
    }
    get mutableArrayWithStringKey() {
        return this.arrayWithStringKey = $._toMutableArray(this.arrayWithStringKey);
    }
    get mutableArrayWithInt32Key() {
        return this.arrayWithInt32Key = $._toMutableArray(this.arrayWithInt32Key);
    }
    get mutableArrayWithInt64Key() {
        return this.arrayWithInt64Key = $._toMutableArray(this.arrayWithInt64Key);
    }
    get mutableArrayWithWrapperKey() {
        return this.arrayWithWrapperKey = $._toMutableArray(this.arrayWithWrapperKey);
    }
    get mutableArrayWithEnumKey() {
        return this.arrayWithEnumKey = $._toMutableArray(this.arrayWithEnumKey);
    }
    toFrozen() {
        return Items.create(this);
    }
}
class Items extends $._FrozenBase {
    static create(copyable) {
        if (copyable instanceof _j) {
            return copyable;
        }
        return new _j(copyable);
    }
    constructor(copyable) {
        super();
        this.__maps = {};
        initItems(this, copyable);
        Object.freeze(this);
    }
    get arrayWithBoolKeyMap() {
        return this.__maps.arrayWithBoolKey || (this.__maps.arrayWithBoolKey = new Map(this.arrayWithBoolKey.map((v) => [v.bool, v])));
    }
    get arrayWithStringKeyMap() {
        return this.__maps.arrayWithStringKey || (this.__maps.arrayWithStringKey = new Map(this.arrayWithStringKey.map((v) => [v.string, v])));
    }
    get arrayWithInt32KeyMap() {
        return this.__maps.arrayWithInt32Key || (this.__maps.arrayWithInt32Key = new Map(this.arrayWithInt32Key.map((v) => [v.int32, v])));
    }
    get arrayWithInt64KeyMap() {
        return this.__maps.arrayWithInt64Key || (this.__maps.arrayWithInt64Key = new Map(this.arrayWithInt64Key.map((v) => [v.int64.toString(), v])));
    }
    get arrayWithWrapperKeyMap() {
        return this.__maps.arrayWithWrapperKey || (this.__maps.arrayWithWrapperKey = new Map(this.arrayWithWrapperKey.map((v) => [v.user.id, v])));
    }
    get arrayWithEnumKeyMap() {
        return this.__maps.arrayWithEnumKey || (this.__maps.arrayWithEnumKey = new Map(this.arrayWithEnumKey.map((v) => [v.weekday.kind, v])));
    }
}
exports.Items = Items;
_j = Items;
Items.DEFAULT = new _j({});
Items.Mutable = Items_Mutable;
Items.SERIALIZER = $._newStructSerializer(_j.DEFAULT);
function initItems(target, copyable) {
    target.arrayWithBoolKey = $._toFrozenArray(copyable.arrayWithBoolKey || [], (e) => Item.create(e));
    target.arrayWithStringKey = $._toFrozenArray(copyable.arrayWithStringKey || [], (e) => Item.create(e));
    target.arrayWithInt32Key = $._toFrozenArray(copyable.arrayWithInt32Key || [], (e) => Item.create(e));
    target.arrayWithInt64Key = $._toFrozenArray(copyable.arrayWithInt64Key || [], (e) => Item.create(e));
    target.arrayWithWrapperKey = $._toFrozenArray(copyable.arrayWithWrapperKey || [], (e) => Item.create(e));
    target.arrayWithEnumKey = $._toFrozenArray(copyable.arrayWithEnumKey || [], (e) => Item.create(e));
}
// -----------------------------------------------------------------------------
// struct JsonValues
// -----------------------------------------------------------------------------
// Exported as 'JsonValues.Builder'
class JsonValues_Mutable extends $._MutableBase {
    constructor(copyable = JsonValues.DEFAULT) {
        super();
        initJsonValues(this, copyable);
        Object.seal(this);
    }
    get mutableJsonValues() {
        return this.jsonValues = $._toMutableArray(this.jsonValues);
    }
    toFrozen() {
        return JsonValues.create(this);
    }
}
class JsonValues extends $._FrozenBase {
    static create(copyable) {
        if (copyable instanceof _k) {
            return copyable;
        }
        return new _k(copyable);
    }
    constructor(copyable) {
        super();
        initJsonValues(this, copyable);
        Object.freeze(this);
    }
}
exports.JsonValues = JsonValues;
_k = JsonValues;
JsonValues.DEFAULT = new _k({});
JsonValues.Mutable = JsonValues_Mutable;
JsonValues.SERIALIZER = $._newStructSerializer(_k.DEFAULT);
function initJsonValues(target, copyable) {
    target.jsonValues = $._toFrozenArray(copyable.jsonValues || [], (e) => enums_soia_1.JsonValue.fromCopyable(e));
}
// -----------------------------------------------------------------------------
// struct CarOwner
// -----------------------------------------------------------------------------
// Exported as 'CarOwner.Builder'
class CarOwner_Mutable extends $._MutableBase {
    constructor(copyable = CarOwner.DEFAULT) {
        super();
        initCarOwner(this, copyable);
        Object.seal(this);
    }
    get mutableCar() {
        const v = this.car;
        return v instanceof x_car.Car.Mutable ? v : (this.car = v.toMutable());
    }
    get mutableOwner() {
        const v = this.owner;
        return v instanceof FullName.Mutable ? v : (this.owner = v.toMutable());
    }
    toFrozen() {
        return CarOwner.create(this);
    }
}
class CarOwner extends $._FrozenBase {
    static create(copyable) {
        if (copyable instanceof _l) {
            return copyable;
        }
        return new _l(copyable);
    }
    constructor(copyable) {
        super();
        initCarOwner(this, copyable);
        Object.freeze(this);
    }
}
exports.CarOwner = CarOwner;
_l = CarOwner;
CarOwner.DEFAULT = new _l({});
CarOwner.Mutable = CarOwner_Mutable;
CarOwner.SERIALIZER = $._newStructSerializer(_l.DEFAULT);
function initCarOwner(target, copyable) {
    target.car = x_car.Car.create(copyable.car || x_car.Car.DEFAULT);
    target.owner = FullName.create(copyable.owner || FullName.DEFAULT);
}
// -----------------------------------------------------------------------------
// struct Foo.Bar
// -----------------------------------------------------------------------------
// Exported as 'Foo.Bar.Builder'
class Foo_Bar_Mutable extends $._MutableBase {
    constructor(copyable = Foo_Bar.DEFAULT) {
        super();
        initFoo_Bar(this, copyable);
        Object.seal(this);
    }
    toFrozen() {
        return Foo_Bar.create(this);
    }
}
// Exported as 'Foo.Bar'
class Foo_Bar extends $._FrozenBase {
    static create(copyable) {
        if (copyable instanceof _m) {
            return copyable;
        }
        return new _m(copyable);
    }
    constructor(copyable) {
        super();
        initFoo_Bar(this, copyable);
        Object.freeze(this);
    }
}
_m = Foo_Bar;
Foo_Bar.DEFAULT = new _m({});
Foo_Bar.Mutable = Foo_Bar_Mutable;
Foo_Bar.SERIALIZER = $._newStructSerializer(_m.DEFAULT);
function initFoo_Bar(target, copyable) {
    target.bar = copyable.bar ?? null;
    target.foos = copyable.foos ? $._toFrozenArray(copyable.foos, (e) => e ? Foo.create(e) : null) : null;
}
// -----------------------------------------------------------------------------
// struct Foo.Zoo
// -----------------------------------------------------------------------------
// Exported as 'Foo.Zoo.Builder'
class Foo_Zoo_Mutable extends $._MutableBase {
    constructor(_ = Foo_Zoo.DEFAULT) {
        super();
        Object.seal(this);
    }
    toFrozen() {
        return Foo_Zoo.DEFAULT;
    }
}
// Exported as 'Foo.Zoo'
class Foo_Zoo extends $._FrozenBase {
    static create(_) {
        return _o.DEFAULT;
    }
    constructor(_) {
        super();
        Object.freeze(this);
    }
}
_o = Foo_Zoo;
Foo_Zoo.DEFAULT = new _o({});
Foo_Zoo.Mutable = Foo_Zoo_Mutable;
Foo_Zoo.SERIALIZER = $._newStructSerializer(_o.DEFAULT);
// -----------------------------------------------------------------------------
// struct Foo
// -----------------------------------------------------------------------------
// Exported as 'Foo.Builder'
class Foo_Mutable extends $._MutableBase {
    constructor(copyable = Foo.DEFAULT) {
        super();
        initFoo(this, copyable);
        Object.seal(this);
    }
    get mutableZoos() {
        return this.zoos = $._toMutableArray(this.zoos || []);
    }
    toFrozen() {
        return Foo.create(this);
    }
}
class Foo extends $._FrozenBase {
    static create(copyable) {
        if (copyable instanceof _p) {
            return copyable;
        }
        return new _p(copyable);
    }
    constructor(copyable) {
        super();
        initFoo(this, copyable);
        Object.freeze(this);
    }
}
exports.Foo = Foo;
_p = Foo;
Foo.DEFAULT = new _p({});
Foo.Mutable = Foo_Mutable;
Foo.SERIALIZER = $._newStructSerializer(_p.DEFAULT);
Foo.Bar = Foo_Bar;
Foo.Zoo = Foo_Zoo;
function initFoo(target, copyable) {
    target.bars = copyable.bars ? $._toFrozenArray(copyable.bars, (e) => Foo_Bar.create(e)) : null;
    target.zoos = copyable.zoos ? $._toFrozenArray(copyable.zoos, (e) => e ? Foo_Zoo.create(e) : null) : null;
}
// -----------------------------------------------------------------------------
// struct NameCollision.Foo.Foo_.Foo__
// -----------------------------------------------------------------------------
// Exported as 'NameCollision.Foo.Foo_.Foo__.Builder'
class NameCollision_Foo_Foo__Foo___Mutable extends $._MutableBase {
    constructor(copyable = NameCollision_Foo_Foo__Foo__.DEFAULT) {
        super();
        initNameCollision_Foo_Foo__Foo__(this, copyable);
        this.topLevelFoo = NameCollision_Foo.create(copyable.topLevelFoo || NameCollision_Foo.DEFAULT);
        Object.seal(this);
    }
    toFrozen() {
        return NameCollision_Foo_Foo__Foo__.create(this);
    }
}
// Exported as 'NameCollision.Foo.Foo_.Foo__'
class NameCollision_Foo_Foo__Foo__ extends $._FrozenBase {
    static create(copyable) {
        if (copyable instanceof _q) {
            return copyable;
        }
        return new _q(copyable);
    }
    constructor(copyable) {
        super();
        initNameCollision_Foo_Foo__Foo__(this, copyable);
        if (copyable.topLevelFoo) {
            this._topLevelFoo = NameCollision_Foo.create(copyable.topLevelFoo);
        }
        Object.freeze(this);
    }
    get topLevelFoo() {
        return this._topLevelFoo || NameCollision.Foo.DEFAULT;
    }
}
_q = NameCollision_Foo_Foo__Foo__;
NameCollision_Foo_Foo__Foo__.DEFAULT = new _q({});
NameCollision_Foo_Foo__Foo__.Mutable = NameCollision_Foo_Foo__Foo___Mutable;
NameCollision_Foo_Foo__Foo__.SERIALIZER = $._newStructSerializer(_q.DEFAULT);
function initNameCollision_Foo_Foo__Foo__(target, copyable) {
    target.x = copyable.x || 0;
}
// -----------------------------------------------------------------------------
// struct NameCollision.Foo.Foo_
// -----------------------------------------------------------------------------
// Exported as 'NameCollision.Foo.Foo_.Builder'
class NameCollision_Foo_Foo__Mutable extends $._MutableBase {
    constructor(copyable = NameCollision_Foo_Foo_.DEFAULT) {
        super();
        initNameCollision_Foo_Foo_(this, copyable);
        Object.seal(this);
    }
    toFrozen() {
        return NameCollision_Foo_Foo_.create(this);
    }
}
// Exported as 'NameCollision.Foo.Foo_'
class NameCollision_Foo_Foo_ extends $._FrozenBase {
    static create(copyable) {
        if (copyable instanceof _r) {
            return copyable;
        }
        return new _r(copyable);
    }
    constructor(copyable) {
        super();
        initNameCollision_Foo_Foo_(this, copyable);
        Object.freeze(this);
    }
}
_r = NameCollision_Foo_Foo_;
NameCollision_Foo_Foo_.DEFAULT = new _r({});
NameCollision_Foo_Foo_.Mutable = NameCollision_Foo_Foo__Mutable;
NameCollision_Foo_Foo_.SERIALIZER = $._newStructSerializer(_r.DEFAULT);
NameCollision_Foo_Foo_.Foo__ = NameCollision_Foo_Foo__Foo__;
function initNameCollision_Foo_Foo_(target, copyable) {
    target.foo = NameCollision_Foo_Foo__Foo__.create(copyable.foo || NameCollision_Foo_Foo__Foo__.DEFAULT);
}
// -----------------------------------------------------------------------------
// struct NameCollision.Foo
// -----------------------------------------------------------------------------
// Exported as 'NameCollision.Foo.Builder'
class NameCollision_Foo_Mutable extends $._MutableBase {
    constructor(copyable = NameCollision_Foo.DEFAULT) {
        super();
        initNameCollision_Foo(this, copyable);
        Object.seal(this);
    }
    toFrozen() {
        return NameCollision_Foo.create(this);
    }
}
// Exported as 'NameCollision.Foo'
class NameCollision_Foo extends $._FrozenBase {
    static create(copyable) {
        if (copyable instanceof _s) {
            return copyable;
        }
        return new _s(copyable);
    }
    constructor(copyable) {
        super();
        initNameCollision_Foo(this, copyable);
        Object.freeze(this);
    }
}
_s = NameCollision_Foo;
NameCollision_Foo.DEFAULT = new _s({});
NameCollision_Foo.Mutable = NameCollision_Foo_Mutable;
NameCollision_Foo.SERIALIZER = $._newStructSerializer(_s.DEFAULT);
NameCollision_Foo.Foo_ = NameCollision_Foo_Foo_;
function initNameCollision_Foo(target, copyable) {
    target.foo = NameCollision_Foo_Foo_.create(copyable.foo || NameCollision_Foo_Foo_.DEFAULT);
}
// -----------------------------------------------------------------------------
// struct NameCollision.Array.Array_
// -----------------------------------------------------------------------------
// Exported as 'NameCollision.Array.Array_.Builder'
class NameCollision_Array_Array__Mutable extends $._MutableBase {
    constructor(_ = NameCollision_Array_Array_.DEFAULT) {
        super();
        Object.seal(this);
    }
    toFrozen() {
        return NameCollision_Array_Array_.DEFAULT;
    }
}
// Exported as 'NameCollision.Array.Array_'
class NameCollision_Array_Array_ extends $._FrozenBase {
    static create(_) {
        return _t.DEFAULT;
    }
    constructor(_) {
        super();
        Object.freeze(this);
    }
}
_t = NameCollision_Array_Array_;
NameCollision_Array_Array_.DEFAULT = new _t({});
NameCollision_Array_Array_.Mutable = NameCollision_Array_Array__Mutable;
NameCollision_Array_Array_.SERIALIZER = $._newStructSerializer(_t.DEFAULT);
// -----------------------------------------------------------------------------
// struct NameCollision.Array
// -----------------------------------------------------------------------------
// Exported as 'NameCollision.Array.Builder'
class NameCollision_Array_Mutable extends $._MutableBase {
    constructor(copyable = NameCollision_Array.DEFAULT) {
        super();
        initNameCollision_Array(this, copyable);
        Object.seal(this);
    }
    get mutableArray() {
        const v = this.array;
        return v instanceof NameCollision_Array_Array_.Mutable ? v : (this.array = v.toMutable());
    }
    toFrozen() {
        return NameCollision_Array.create(this);
    }
}
// Exported as 'NameCollision.Array'
class NameCollision_Array extends $._FrozenBase {
    static create(copyable) {
        if (copyable instanceof _u) {
            return copyable;
        }
        return new _u(copyable);
    }
    constructor(copyable) {
        super();
        initNameCollision_Array(this, copyable);
        Object.freeze(this);
    }
}
_u = NameCollision_Array;
NameCollision_Array.DEFAULT = new _u({});
NameCollision_Array.Mutable = NameCollision_Array_Mutable;
NameCollision_Array.SERIALIZER = $._newStructSerializer(_u.DEFAULT);
NameCollision_Array.Array_ = NameCollision_Array_Array_;
function initNameCollision_Array(target, copyable) {
    target.array = NameCollision_Array_Array_.create(copyable.array || NameCollision_Array_Array_.DEFAULT);
}
// -----------------------------------------------------------------------------
// struct NameCollision.Value
// -----------------------------------------------------------------------------
// Exported as 'NameCollision.Value.Builder'
class NameCollision_Value_Mutable extends $._MutableBase {
    constructor(_ = NameCollision_Value.DEFAULT) {
        super();
        Object.seal(this);
    }
    toFrozen() {
        return NameCollision_Value.DEFAULT;
    }
}
// Exported as 'NameCollision.Value'
class NameCollision_Value extends $._FrozenBase {
    static create(_) {
        return _v.DEFAULT;
    }
    constructor(_) {
        super();
        Object.freeze(this);
    }
}
_v = NameCollision_Value;
NameCollision_Value.DEFAULT = new _v({});
NameCollision_Value.Mutable = NameCollision_Value_Mutable;
NameCollision_Value.SERIALIZER = $._newStructSerializer(_v.DEFAULT);
// -----------------------------------------------------------------------------
// struct NameCollision.Enum.Mutable_
// -----------------------------------------------------------------------------
// Exported as 'NameCollision.Enum.Mutable_.Builder'
class NameCollision_Enum_Mutable__Mutable extends $._MutableBase {
    constructor(_ = NameCollision_Enum_Mutable_.DEFAULT) {
        super();
        Object.seal(this);
    }
    toFrozen() {
        return NameCollision_Enum_Mutable_.DEFAULT;
    }
}
// Exported as 'NameCollision.Enum.Mutable_'
class NameCollision_Enum_Mutable_ extends $._FrozenBase {
    static create(_) {
        return _w.DEFAULT;
    }
    constructor(_) {
        super();
        Object.freeze(this);
    }
}
_w = NameCollision_Enum_Mutable_;
NameCollision_Enum_Mutable_.DEFAULT = new _w({});
NameCollision_Enum_Mutable_.Mutable = NameCollision_Enum_Mutable__Mutable;
NameCollision_Enum_Mutable_.SERIALIZER = $._newStructSerializer(_w.DEFAULT);
// -----------------------------------------------------------------------------
// enum NameCollision.Enum
// -----------------------------------------------------------------------------
// Exported as 'NameCollision.Enum'
class NameCollision_Enum extends $._EnumBase {
    static create(kind, value) {
        let v;
        switch (kind) {
            case "mutable": {
                v = NameCollision_Enum_Mutable_.create(value);
                break;
            }
            default: {
                throw new TypeError();
            }
        }
        return new _x(kind, v);
    }
    static fromCopyable(copyable) {
        if (copyable instanceof _x) {
            return copyable;
        }
        if (copyable instanceof Object) {
            return this.create(copyable.kind, copyable.value);
        }
        switch (copyable) {
            case "DEFAULT": {
                return _x.DEFAULT_;
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
_x = NameCollision_Enum;
NameCollision_Enum.DEFAULT_ = new _x("DEFAULT", undefined);
NameCollision_Enum.DEFAULT = _x.DEFAULT_;
NameCollision_Enum.SERIALIZER = $._newEnumSerializer(_x.DEFAULT);
NameCollision_Enum.Mutable_ = NameCollision_Enum_Mutable_;
// -----------------------------------------------------------------------------
// struct NameCollision
// -----------------------------------------------------------------------------
// Exported as 'NameCollision.Builder'
class NameCollision_Mutable extends $._MutableBase {
    constructor(copyable = NameCollision.DEFAULT) {
        super();
        initNameCollision(this, copyable);
        Object.seal(this);
    }
    get mutableFoo() {
        const v = this.foo;
        return v instanceof NameCollision_Foo.Mutable ? v : (this.foo = v.toMutable());
    }
    get mutableArray() {
        const v = this.array;
        return v instanceof NameCollision_Array.Mutable ? v : (this.array = v.toMutable());
    }
    toFrozen() {
        return NameCollision.create(this);
    }
}
class NameCollision extends $._FrozenBase {
    static create(copyable) {
        if (copyable instanceof _y) {
            return copyable;
        }
        return new _y(copyable);
    }
    constructor(copyable) {
        super();
        initNameCollision(this, copyable);
        Object.freeze(this);
    }
}
exports.NameCollision = NameCollision;
_y = NameCollision;
NameCollision.DEFAULT = new _y({});
NameCollision.Mutable = NameCollision_Mutable;
NameCollision.SERIALIZER = $._newStructSerializer(_y.DEFAULT);
NameCollision.Foo = NameCollision_Foo;
NameCollision.Array = NameCollision_Array;
NameCollision.Value = NameCollision_Value;
NameCollision.Enum = NameCollision_Enum;
function initNameCollision(target, copyable) {
    target.foo = NameCollision_Foo.create(copyable.foo || NameCollision_Foo.DEFAULT);
    target.array = NameCollision_Array.create(copyable.array || NameCollision_Array.DEFAULT);
}
// -----------------------------------------------------------------------------
// struct RecA
// -----------------------------------------------------------------------------
// Exported as 'RecA.Builder'
class RecA_Mutable extends $._MutableBase {
    constructor(copyable = RecA.DEFAULT) {
        super();
        this.a = RecA.create(copyable.a || RecA.DEFAULT);
        this.b = RecB.create(copyable.b || RecB.DEFAULT);
        Object.seal(this);
    }
    toFrozen() {
        return RecA.create(this);
    }
}
class RecA extends $._FrozenBase {
    static create(copyable) {
        if (copyable instanceof _z) {
            return copyable;
        }
        return new _z(copyable);
    }
    constructor(copyable) {
        super();
        if (copyable.a) {
            this._a = _z.create(copyable.a);
        }
        if (copyable.b) {
            this._b = RecB.create(copyable.b);
        }
        Object.freeze(this);
    }
    get a() {
        return this._a || _z.DEFAULT;
    }
    get b() {
        return this._b || RecB.DEFAULT;
    }
}
exports.RecA = RecA;
_z = RecA;
RecA.DEFAULT = new _z({});
RecA.Mutable = RecA_Mutable;
RecA.SERIALIZER = $._newStructSerializer(_z.DEFAULT);
// -----------------------------------------------------------------------------
// struct RecB
// -----------------------------------------------------------------------------
// Exported as 'RecB.Builder'
class RecB_Mutable extends $._MutableBase {
    constructor(copyable = RecB.DEFAULT) {
        super();
        initRecB(this, copyable);
        Object.seal(this);
    }
    toFrozen() {
        return RecB.create(this);
    }
}
class RecB extends $._FrozenBase {
    static create(copyable) {
        if (copyable instanceof _0) {
            return copyable;
        }
        return new _0(copyable);
    }
    constructor(copyable) {
        super();
        initRecB(this, copyable);
        Object.freeze(this);
    }
}
exports.RecB = RecB;
_0 = RecB;
RecB.DEFAULT = new _0({});
RecB.Mutable = RecB_Mutable;
RecB.SERIALIZER = $._newStructSerializer(_0.DEFAULT);
function initRecB(target, copyable) {
    target.a = RecA.create(copyable.a || RecA.DEFAULT);
    target.aList = copyable.aList ? $._toFrozenArray(copyable.aList, (e) => e ? RecA.create(e) : null) : null;
}
// -----------------------------------------------------------------------------
// struct Name.Name1
// -----------------------------------------------------------------------------
// Exported as 'Name.Name1.Builder'
class Name_Name1_Mutable extends $._MutableBase {
    constructor(_ = Name_Name1.DEFAULT) {
        super();
        Object.seal(this);
    }
    toFrozen() {
        return Name_Name1.DEFAULT;
    }
}
// Exported as 'Name.Name1'
class Name_Name1 extends $._FrozenBase {
    static create(_) {
        return _1.DEFAULT;
    }
    constructor(_) {
        super();
        Object.freeze(this);
    }
}
_1 = Name_Name1;
Name_Name1.DEFAULT = new _1({});
Name_Name1.Mutable = Name_Name1_Mutable;
Name_Name1.SERIALIZER = $._newStructSerializer(_1.DEFAULT);
// -----------------------------------------------------------------------------
// struct Name.Name2
// -----------------------------------------------------------------------------
// Exported as 'Name.Name2.Builder'
class Name_Name2_Mutable extends $._MutableBase {
    constructor(copyable = Name_Name2.DEFAULT) {
        super();
        initName_Name2(this, copyable);
        Object.seal(this);
    }
    get mutableName1() {
        const v = this.name1;
        return v instanceof Name_Name1.Mutable ? v : (this.name1 = v.toMutable());
    }
    toFrozen() {
        return Name_Name2.create(this);
    }
}
// Exported as 'Name.Name2'
class Name_Name2 extends $._FrozenBase {
    static create(copyable) {
        if (copyable instanceof _2) {
            return copyable;
        }
        return new _2(copyable);
    }
    constructor(copyable) {
        super();
        initName_Name2(this, copyable);
        Object.freeze(this);
    }
}
_2 = Name_Name2;
Name_Name2.DEFAULT = new _2({});
Name_Name2.Mutable = Name_Name2_Mutable;
Name_Name2.SERIALIZER = $._newStructSerializer(_2.DEFAULT);
function initName_Name2(target, copyable) {
    target.name1 = Name_Name1.create(copyable.name1 || Name_Name1.DEFAULT);
}
// -----------------------------------------------------------------------------
// struct Name.Name_.Name__
// -----------------------------------------------------------------------------
// Exported as 'Name.Name_.Name__.Builder'
class Name_Name__Name___Mutable extends $._MutableBase {
    constructor(copyable = Name_Name__Name__.DEFAULT) {
        super();
        initName_Name__Name__(this, copyable);
        Object.seal(this);
    }
    get mutableName2() {
        const v = this.name2;
        return v instanceof Name_Name2.Mutable ? v : (this.name2 = v.toMutable());
    }
    toFrozen() {
        return Name_Name__Name__.create(this);
    }
}
// Exported as 'Name.Name_.Name__'
class Name_Name__Name__ extends $._FrozenBase {
    static create(copyable) {
        if (copyable instanceof _3) {
            return copyable;
        }
        return new _3(copyable);
    }
    constructor(copyable) {
        super();
        initName_Name__Name__(this, copyable);
        Object.freeze(this);
    }
}
_3 = Name_Name__Name__;
Name_Name__Name__.DEFAULT = new _3({});
Name_Name__Name__.Mutable = Name_Name__Name___Mutable;
Name_Name__Name__.SERIALIZER = $._newStructSerializer(_3.DEFAULT);
function initName_Name__Name__(target, copyable) {
    target.name2 = Name_Name2.create(copyable.name2 || Name_Name2.DEFAULT);
}
// -----------------------------------------------------------------------------
// struct Name.Name_
// -----------------------------------------------------------------------------
// Exported as 'Name.Name_.Builder'
class Name_Name__Mutable extends $._MutableBase {
    constructor(_ = Name_Name_.DEFAULT) {
        super();
        Object.seal(this);
    }
    toFrozen() {
        return Name_Name_.DEFAULT;
    }
}
// Exported as 'Name.Name_'
class Name_Name_ extends $._FrozenBase {
    static create(_) {
        return _4.DEFAULT;
    }
    constructor(_) {
        super();
        Object.freeze(this);
    }
}
_4 = Name_Name_;
Name_Name_.DEFAULT = new _4({});
Name_Name_.Mutable = Name_Name__Mutable;
Name_Name_.SERIALIZER = $._newStructSerializer(_4.DEFAULT);
Name_Name_.Name__ = Name_Name__Name__;
// -----------------------------------------------------------------------------
// struct Name
// -----------------------------------------------------------------------------
// Exported as 'Name.Builder'
class Name_Mutable extends $._MutableBase {
    constructor(_ = Name.DEFAULT) {
        super();
        Object.seal(this);
    }
    toFrozen() {
        return Name.DEFAULT;
    }
}
class Name extends $._FrozenBase {
    static create(_) {
        return _5.DEFAULT;
    }
    constructor(_) {
        super();
        Object.freeze(this);
    }
}
exports.Name = Name;
_5 = Name;
Name.DEFAULT = new _5({});
Name.Mutable = Name_Mutable;
Name.SERIALIZER = $._newStructSerializer(_5.DEFAULT);
Name.Name1 = Name_Name1;
Name.Name2 = Name_Name2;
Name.Name_ = Name_Name_;
// -----------------------------------------------------------------------------
// Initialize the serializers
// -----------------------------------------------------------------------------
const _MODULE_PATH = "src/structs.soia";
$._initStructSerializer(Point.SERIALIZER, "Point", "Point", _MODULE_PATH, undefined, [
    ["x", "x", 0, $.primitiveSerializer("int32")],
    ["y", "y", 1, $.primitiveSerializer("int32")],
], []);
$._initStructSerializer(Color.SERIALIZER, "Color", "Color", _MODULE_PATH, undefined, [
    ["r", "r", 0, $.primitiveSerializer("int32")],
    ["g", "g", 1, $.primitiveSerializer("int32")],
    ["b", "b", 2, $.primitiveSerializer("int32")],
], []);
$._initStructSerializer(Triangle.SERIALIZER, "Triangle", "Triangle", _MODULE_PATH, undefined, [
    ["color", "color", 0, Color.SERIALIZER],
    ["points", "points", 1, $.arraySerializer(Point.SERIALIZER)],
], []);
$._initStructSerializer(FullName.SERIALIZER, "FullName", "FullName", _MODULE_PATH, undefined, [
    ["first_name", "firstName", 0, $.primitiveSerializer("string")],
    ["last_name", "lastName", 2, $.primitiveSerializer("string")],
    ["suffix", "suffix", 3, $.primitiveSerializer("string")],
], [1]);
$._initStructSerializer(Item_User.SERIALIZER, "User", "Item.User", _MODULE_PATH, Item.SERIALIZER.typeDescriptor, [
    ["id", "id", 0, $.primitiveSerializer("string")],
], []);
$._initStructSerializer(Item.SERIALIZER, "Item", "Item", _MODULE_PATH, undefined, [
    ["bool", "bool", 0, $.primitiveSerializer("bool")],
    ["string", "string", 1, $.primitiveSerializer("string")],
    ["int32", "int32", 2, $.primitiveSerializer("int32")],
    ["int64", "int64", 3, $.primitiveSerializer("int64")],
    ["user", "user", 4, Item_User.SERIALIZER],
    ["weekday", "weekday", 5, enums_soia_1.Weekday.SERIALIZER],
], []);
$._initStructSerializer(Items.SERIALIZER, "Items", "Items", _MODULE_PATH, undefined, [
    ["array_with_bool_key", "arrayWithBoolKey", 0, $.arraySerializer(Item.SERIALIZER)],
    ["array_with_string_key", "arrayWithStringKey", 1, $.arraySerializer(Item.SERIALIZER)],
    ["array_with_int32_key", "arrayWithInt32Key", 2, $.arraySerializer(Item.SERIALIZER)],
    ["array_with_int64_key", "arrayWithInt64Key", 3, $.arraySerializer(Item.SERIALIZER)],
    ["array_with_wrapper_key", "arrayWithWrapperKey", 4, $.arraySerializer(Item.SERIALIZER)],
    ["array_with_enum_key", "arrayWithEnumKey", 5, $.arraySerializer(Item.SERIALIZER)],
], []);
$._initStructSerializer(JsonValues.SERIALIZER, "JsonValues", "JsonValues", _MODULE_PATH, undefined, [
    ["json_values", "jsonValues", 0, $.arraySerializer(enums_soia_1.JsonValue.SERIALIZER)],
], []);
$._initStructSerializer(CarOwner.SERIALIZER, "CarOwner", "CarOwner", _MODULE_PATH, undefined, [
    ["car", "car", 0, x_car.Car.SERIALIZER],
    ["owner", "owner", 1, FullName.SERIALIZER],
], []);
$._initStructSerializer(Foo_Bar.SERIALIZER, "Bar", "Foo.Bar", _MODULE_PATH, Foo.SERIALIZER.typeDescriptor, [
    ["bar", "bar", 0, $.nullableSerializer($.primitiveSerializer("string"))],
    ["foos", "foos", 1, $.nullableSerializer($.arraySerializer($.nullableSerializer(Foo.SERIALIZER)))],
], []);
$._initStructSerializer(Foo_Zoo.SERIALIZER, "Zoo", "Foo.Zoo", _MODULE_PATH, Foo.SERIALIZER.typeDescriptor, [], []);
$._initStructSerializer(Foo.SERIALIZER, "Foo", "Foo", _MODULE_PATH, undefined, [
    ["bars", "bars", 0, $.nullableSerializer($.arraySerializer(Foo_Bar.SERIALIZER))],
    ["zoos", "zoos", 1, $.nullableSerializer($.arraySerializer($.nullableSerializer(Foo_Zoo.SERIALIZER)))],
], []);
$._initStructSerializer(NameCollision_Foo_Foo__Foo__.SERIALIZER, "Foo", "NameCollision.Foo.Foo.Foo", _MODULE_PATH, NameCollision_Foo_Foo_.SERIALIZER.typeDescriptor, [
    ["x", "x", 0, $.primitiveSerializer("int32")],
    ["top_level_foo", "topLevelFoo", 1, NameCollision_Foo.SERIALIZER],
], []);
$._initStructSerializer(NameCollision_Foo_Foo_.SERIALIZER, "Foo", "NameCollision.Foo.Foo", _MODULE_PATH, NameCollision_Foo.SERIALIZER.typeDescriptor, [
    ["foo", "foo", 0, NameCollision_Foo_Foo__Foo__.SERIALIZER],
], []);
$._initStructSerializer(NameCollision_Foo.SERIALIZER, "Foo", "NameCollision.Foo", _MODULE_PATH, NameCollision.SERIALIZER.typeDescriptor, [
    ["foo", "foo", 0, NameCollision_Foo_Foo_.SERIALIZER],
], []);
$._initStructSerializer(NameCollision_Array_Array_.SERIALIZER, "Array", "NameCollision.Array.Array", _MODULE_PATH, NameCollision_Array.SERIALIZER.typeDescriptor, [], []);
$._initStructSerializer(NameCollision_Array.SERIALIZER, "Array", "NameCollision.Array", _MODULE_PATH, NameCollision.SERIALIZER.typeDescriptor, [
    ["array", "array", 0, NameCollision_Array_Array_.SERIALIZER],
], []);
$._initStructSerializer(NameCollision_Value.SERIALIZER, "Value", "NameCollision.Value", _MODULE_PATH, NameCollision.SERIALIZER.typeDescriptor, [], []);
$._initStructSerializer(NameCollision_Enum_Mutable_.SERIALIZER, "Mutable", "NameCollision.Enum.Mutable", _MODULE_PATH, NameCollision_Enum.SERIALIZER.typeDescriptor, [], []);
$._initEnumSerializer(NameCollision_Enum.SERIALIZER, "Enum", "NameCollision.Enum", _MODULE_PATH, NameCollision.SERIALIZER.typeDescriptor, [
    ["DEFAULT", 0, NameCollision_Enum.DEFAULT_],
    ["mutable", 1, NameCollision_Enum_Mutable_.SERIALIZER],
], []);
$._initStructSerializer(NameCollision.SERIALIZER, "NameCollision", "NameCollision", _MODULE_PATH, undefined, [
    ["foo", "foo", 0, NameCollision_Foo.SERIALIZER],
    ["array", "array", 1, NameCollision_Array.SERIALIZER],
], []);
$._initStructSerializer(RecA.SERIALIZER, "RecA", "RecA", _MODULE_PATH, undefined, [
    ["a", "a", 0, RecA.SERIALIZER],
    ["b", "b", 1, RecB.SERIALIZER],
], []);
$._initStructSerializer(RecB.SERIALIZER, "RecB", "RecB", _MODULE_PATH, undefined, [
    ["a", "a", 0, RecA.SERIALIZER],
    ["a_list", "aList", 1, $.nullableSerializer($.arraySerializer($.nullableSerializer(RecA.SERIALIZER)))],
], []);
$._initStructSerializer(Name_Name1.SERIALIZER, "Name1", "Name.Name1", _MODULE_PATH, Name.SERIALIZER.typeDescriptor, [], []);
$._initStructSerializer(Name_Name2.SERIALIZER, "Name2", "Name.Name2", _MODULE_PATH, Name.SERIALIZER.typeDescriptor, [
    ["name1", "name1", 0, Name_Name1.SERIALIZER],
], []);
$._initStructSerializer(Name_Name__Name__.SERIALIZER, "Name", "Name.Name.Name", _MODULE_PATH, Name_Name_.SERIALIZER.typeDescriptor, [
    ["name2", "name2", 0, Name_Name2.SERIALIZER],
], []);
$._initStructSerializer(Name_Name_.SERIALIZER, "Name", "Name.Name", _MODULE_PATH, Name.SERIALIZER.typeDescriptor, [], []);
$._initStructSerializer(Name.SERIALIZER, "Name", "Name", _MODULE_PATH, undefined, [], []);
//# sourceMappingURL=structs.soia.js.map