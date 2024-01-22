import * as $ from "soia";
import { JsonValue as JsonValue, Weekday as Weekday } from "./enums.soia";
import * as x_car from "./vehicles/car.soia";
declare class Point_Mutable extends $._MutableBase {
    constructor(copyable?: Point.Copyable);
    x: number;
    y: number;
    toFrozen(): Point;
    toMutable: () => this;
    readonly [$._COPYABLE]: Point.Copyable | undefined;
}
export declare class Point extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(copyable: $.WholeOrPartial<Point.Copyable, Accept>): Point;
    private constructor();
    readonly x: number;
    readonly y: number;
    static readonly DEFAULT: Point;
    toFrozen: () => this;
    toMutable: () => Point.Mutable;
    static readonly Mutable: typeof Point_Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: Point.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<Point>;
}
export declare namespace Point {
    interface Copyable {
        readonly x?: number;
        readonly y?: number;
    }
    type Mutable = Point_Mutable;
    type OrMutable = Point | Mutable;
}
declare class Color_Mutable extends $._MutableBase {
    constructor(copyable?: Color.Copyable);
    r: number;
    g: number;
    b: number;
    toFrozen(): Color;
    toMutable: () => this;
    readonly [$._COPYABLE]: Color.Copyable | undefined;
}
export declare class Color extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(copyable: $.WholeOrPartial<Color.Copyable, Accept>): Color;
    private constructor();
    readonly r: number;
    readonly g: number;
    readonly b: number;
    static readonly DEFAULT: Color;
    toFrozen: () => this;
    toMutable: () => Color.Mutable;
    static readonly Mutable: typeof Color_Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: Color.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<Color>;
}
export declare namespace Color {
    interface Copyable {
        readonly r?: number;
        readonly g?: number;
        readonly b?: number;
    }
    type Mutable = Color_Mutable;
    type OrMutable = Color | Mutable;
}
declare class Triangle_Mutable extends $._MutableBase {
    constructor(copyable?: Triangle.Copyable);
    color: Color.OrMutable;
    points: ReadonlyArray<Point.OrMutable>;
    get mutableColor(): Color.Mutable;
    get mutablePoints(): Array<Point.OrMutable>;
    toFrozen(): Triangle;
    toMutable: () => this;
    readonly [$._COPYABLE]: Triangle.Copyable | undefined;
}
export declare class Triangle extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(copyable: $.WholeOrPartial<Triangle.Copyable, Accept>): Triangle;
    private constructor();
    readonly color: Color;
    readonly points: ReadonlyArray<Point>;
    static readonly DEFAULT: Triangle;
    toFrozen: () => this;
    toMutable: () => Triangle.Mutable;
    static readonly Mutable: typeof Triangle_Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: Triangle.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<Triangle>;
}
export declare namespace Triangle {
    interface Copyable {
        readonly color?: Color.Copyable;
        readonly points?: ReadonlyArray<Point.Copyable>;
    }
    type Mutable = Triangle_Mutable;
    type OrMutable = Triangle | Mutable;
}
declare class FullName_Mutable extends $._MutableBase {
    constructor(copyable?: FullName.Copyable);
    firstName: string;
    lastName: string;
    suffix: string;
    toFrozen(): FullName;
    toMutable: () => this;
    readonly [$._COPYABLE]: FullName.Copyable | undefined;
}
export declare class FullName extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(copyable: $.WholeOrPartial<FullName.Copyable, Accept>): FullName;
    private constructor();
    readonly firstName: string;
    readonly lastName: string;
    readonly suffix: string;
    static readonly DEFAULT: FullName;
    toFrozen: () => this;
    toMutable: () => FullName.Mutable;
    static readonly Mutable: typeof FullName_Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: FullName.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<FullName>;
}
export declare namespace FullName {
    interface Copyable {
        readonly firstName?: string;
        readonly lastName?: string;
        readonly suffix?: string;
    }
    type Mutable = FullName_Mutable;
    type OrMutable = FullName | Mutable;
}
declare class Item_User_Mutable extends $._MutableBase {
    constructor(copyable?: Item.User.Copyable);
    id: string;
    toFrozen(): Item.User;
    toMutable: () => this;
    readonly [$._COPYABLE]: Item.User.Copyable | undefined;
}
declare class Item_User extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(copyable: $.WholeOrPartial<Item.User.Copyable, Accept>): Item.User;
    private constructor();
    readonly id: string;
    static readonly DEFAULT: Item_User;
    toFrozen: () => this;
    toMutable: () => Item.User.Mutable;
    static readonly Mutable: typeof Item_User_Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: Item.User.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<Item_User>;
}
export declare namespace Item.User {
    interface Copyable {
        readonly id?: string;
    }
    type Mutable = Item_User_Mutable;
    type OrMutable = User | Mutable;
}
declare class Item_Mutable extends $._MutableBase {
    constructor(copyable?: Item.Copyable);
    bool: boolean;
    string: string;
    int32: number;
    int64: bigint;
    user: Item.User.OrMutable;
    weekday: Weekday;
    get mutableUser(): Item.User.Mutable;
    toFrozen(): Item;
    toMutable: () => this;
    readonly [$._COPYABLE]: Item.Copyable | undefined;
}
export declare class Item extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(copyable: $.WholeOrPartial<Item.Copyable, Accept>): Item;
    private constructor();
    readonly bool: boolean;
    readonly string: string;
    readonly int32: number;
    readonly int64: bigint;
    readonly user: Item.User;
    readonly weekday: Weekday;
    static readonly DEFAULT: Item;
    toFrozen: () => this;
    toMutable: () => Item.Mutable;
    static readonly Mutable: typeof Item_Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: Item.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<Item>;
    static readonly User: typeof Item_User;
}
export declare namespace Item {
    interface Copyable {
        readonly bool?: boolean;
        readonly string?: string;
        readonly int32?: number;
        readonly int64?: bigint;
        readonly user?: Item.User.Copyable;
        readonly weekday?: Weekday.Copyable;
    }
    type Mutable = Item_Mutable;
    type OrMutable = Item | Mutable;
    type User = Item_User;
}
declare class Items_Mutable extends $._MutableBase {
    constructor(copyable?: Items.Copyable);
    arrayWithBoolKey: ReadonlyArray<Item.OrMutable>;
    arrayWithStringKey: ReadonlyArray<Item.OrMutable>;
    arrayWithInt32Key: ReadonlyArray<Item.OrMutable>;
    arrayWithInt64Key: ReadonlyArray<Item.OrMutable>;
    arrayWithWrapperKey: ReadonlyArray<Item.OrMutable>;
    arrayWithEnumKey: ReadonlyArray<Item.OrMutable>;
    get mutableArrayWithBoolKey(): Array<Item.OrMutable>;
    get mutableArrayWithStringKey(): Array<Item.OrMutable>;
    get mutableArrayWithInt32Key(): Array<Item.OrMutable>;
    get mutableArrayWithInt64Key(): Array<Item.OrMutable>;
    get mutableArrayWithWrapperKey(): Array<Item.OrMutable>;
    get mutableArrayWithEnumKey(): Array<Item.OrMutable>;
    toFrozen(): Items;
    toMutable: () => this;
    readonly [$._COPYABLE]: Items.Copyable | undefined;
}
export declare class Items extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(copyable: $.WholeOrPartial<Items.Copyable, Accept>): Items;
    private constructor();
    readonly arrayWithBoolKey: ReadonlyArray<Item>;
    readonly arrayWithStringKey: ReadonlyArray<Item>;
    readonly arrayWithInt32Key: ReadonlyArray<Item>;
    readonly arrayWithInt64Key: ReadonlyArray<Item>;
    readonly arrayWithWrapperKey: ReadonlyArray<Item>;
    readonly arrayWithEnumKey: ReadonlyArray<Item>;
    private __maps;
    get arrayWithBoolKeyMap(): ReadonlyMap<boolean, Item>;
    get arrayWithStringKeyMap(): ReadonlyMap<string, Item>;
    get arrayWithInt32KeyMap(): ReadonlyMap<number, Item>;
    get arrayWithInt64KeyMap(): ReadonlyMap<string, Item>;
    get arrayWithWrapperKeyMap(): ReadonlyMap<string, Item>;
    get arrayWithEnumKeyMap(): ReadonlyMap<Weekday.Kind, Item>;
    static readonly DEFAULT: Items;
    toFrozen: () => this;
    toMutable: () => Items.Mutable;
    static readonly Mutable: typeof Items_Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: Items.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<Items>;
}
export declare namespace Items {
    interface Copyable {
        readonly arrayWithBoolKey?: ReadonlyArray<Item.Copyable>;
        readonly arrayWithStringKey?: ReadonlyArray<Item.Copyable>;
        readonly arrayWithInt32Key?: ReadonlyArray<Item.Copyable>;
        readonly arrayWithInt64Key?: ReadonlyArray<Item.Copyable>;
        readonly arrayWithWrapperKey?: ReadonlyArray<Item.Copyable>;
        readonly arrayWithEnumKey?: ReadonlyArray<Item.Copyable>;
    }
    type Mutable = Items_Mutable;
    type OrMutable = Items | Mutable;
}
declare class JsonValues_Mutable extends $._MutableBase {
    constructor(copyable?: JsonValues.Copyable);
    jsonValues: ReadonlyArray<JsonValue>;
    get mutableJsonValues(): Array<JsonValue>;
    toFrozen(): JsonValues;
    toMutable: () => this;
    readonly [$._COPYABLE]: JsonValues.Copyable | undefined;
}
export declare class JsonValues extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(copyable: $.WholeOrPartial<JsonValues.Copyable, Accept>): JsonValues;
    private constructor();
    readonly jsonValues: ReadonlyArray<JsonValue>;
    static readonly DEFAULT: JsonValues;
    toFrozen: () => this;
    toMutable: () => JsonValues.Mutable;
    static readonly Mutable: typeof JsonValues_Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: JsonValues.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<JsonValues>;
}
export declare namespace JsonValues {
    interface Copyable {
        readonly jsonValues?: ReadonlyArray<JsonValue.Copyable>;
    }
    type Mutable = JsonValues_Mutable;
    type OrMutable = JsonValues | Mutable;
}
declare class CarOwner_Mutable extends $._MutableBase {
    constructor(copyable?: CarOwner.Copyable);
    car: x_car.Car.OrMutable;
    owner: FullName.OrMutable;
    get mutableCar(): x_car.Car.Mutable;
    get mutableOwner(): FullName.Mutable;
    toFrozen(): CarOwner;
    toMutable: () => this;
    readonly [$._COPYABLE]: CarOwner.Copyable | undefined;
}
export declare class CarOwner extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(copyable: $.WholeOrPartial<CarOwner.Copyable, Accept>): CarOwner;
    private constructor();
    readonly car: x_car.Car;
    readonly owner: FullName;
    static readonly DEFAULT: CarOwner;
    toFrozen: () => this;
    toMutable: () => CarOwner.Mutable;
    static readonly Mutable: typeof CarOwner_Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: CarOwner.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<CarOwner>;
}
export declare namespace CarOwner {
    interface Copyable {
        readonly car?: x_car.Car.Copyable;
        readonly owner?: FullName.Copyable;
    }
    type Mutable = CarOwner_Mutable;
    type OrMutable = CarOwner | Mutable;
}
declare class Foo_Bar_Mutable extends $._MutableBase {
    constructor(copyable?: Foo.Bar.Copyable);
    bar: string | null;
    foos: ReadonlyArray<Foo | null> | null;
    toFrozen(): Foo.Bar;
    toMutable: () => this;
    readonly [$._COPYABLE]: Foo.Bar.Copyable | undefined;
}
declare class Foo_Bar extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(copyable: $.WholeOrPartial<Foo.Bar.Copyable, Accept>): Foo.Bar;
    private constructor();
    readonly bar: string | null;
    readonly foos: ReadonlyArray<Foo | null> | null;
    static readonly DEFAULT: Foo_Bar;
    toFrozen: () => this;
    toMutable: () => Foo.Bar.Mutable;
    static readonly Mutable: typeof Foo_Bar_Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: Foo.Bar.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<Foo_Bar>;
}
export declare namespace Foo.Bar {
    interface Copyable {
        readonly bar?: string | null;
        readonly foos?: ReadonlyArray<Foo.Copyable | null> | null;
    }
    type Mutable = Foo_Bar_Mutable;
    type OrMutable = Bar | Mutable;
}
declare class Foo_Zoo_Mutable extends $._MutableBase {
    constructor(_?: Foo.Zoo.Copyable);
    toFrozen(): Foo.Zoo;
    toMutable: () => this;
    readonly [$._COPYABLE]: Foo.Zoo.Copyable | undefined;
}
declare class Foo_Zoo extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(_: $.WholeOrPartial<Foo.Zoo.Copyable, Accept>): Foo.Zoo;
    private constructor();
    static readonly DEFAULT: Foo_Zoo;
    toFrozen: () => this;
    toMutable: () => Foo.Zoo.Mutable;
    static readonly Mutable: typeof Foo_Zoo_Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: Foo.Zoo.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<Foo_Zoo>;
}
export declare namespace Foo.Zoo {
    type Copyable = Record<string | number | symbol, never> | OrMutable;
    type Mutable = Foo_Zoo_Mutable;
    type OrMutable = Zoo | Mutable;
}
declare class Foo_Mutable extends $._MutableBase {
    constructor(copyable?: Foo.Copyable);
    bars: ReadonlyArray<Foo.Bar> | null;
    zoos: ReadonlyArray<Foo.Zoo.OrMutable | null> | null;
    get mutableZoos(): Array<Foo.Zoo.OrMutable | null>;
    toFrozen(): Foo;
    toMutable: () => this;
    readonly [$._COPYABLE]: Foo.Copyable | undefined;
}
export declare class Foo extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(copyable: $.WholeOrPartial<Foo.Copyable, Accept>): Foo;
    private constructor();
    readonly bars: ReadonlyArray<Foo.Bar> | null;
    readonly zoos: ReadonlyArray<Foo.Zoo | null> | null;
    static readonly DEFAULT: Foo;
    toFrozen: () => this;
    toMutable: () => Foo.Mutable;
    static readonly Mutable: typeof Foo_Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: Foo.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<Foo>;
    static readonly Bar: typeof Foo_Bar;
    static readonly Zoo: typeof Foo_Zoo;
}
export declare namespace Foo {
    interface Copyable {
        readonly bars?: ReadonlyArray<Foo.Bar.Copyable> | null;
        readonly zoos?: ReadonlyArray<Foo.Zoo.Copyable | null> | null;
    }
    type Mutable = Foo_Mutable;
    type OrMutable = Foo | Mutable;
    type Bar = Foo_Bar;
    type Zoo = Foo_Zoo;
}
declare class NameCollision_Foo_Foo__Foo___Mutable extends $._MutableBase {
    constructor(copyable?: NameCollision.Foo.Foo_.Foo__.Copyable);
    x: number;
    topLevelFoo: NameCollision.Foo;
    toFrozen(): NameCollision.Foo.Foo_.Foo__;
    toMutable: () => this;
    readonly [$._COPYABLE]: NameCollision.Foo.Foo_.Foo__.Copyable | undefined;
}
declare class NameCollision_Foo_Foo__Foo__ extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(copyable: $.WholeOrPartial<NameCollision.Foo.Foo_.Foo__.Copyable, Accept>): NameCollision.Foo.Foo_.Foo__;
    private constructor();
    readonly x: number;
    private readonly _topLevelFoo;
    get topLevelFoo(): NameCollision.Foo;
    static readonly DEFAULT: NameCollision_Foo_Foo__Foo__;
    toFrozen: () => this;
    toMutable: () => NameCollision.Foo.Foo_.Foo__.Mutable;
    static readonly Mutable: typeof NameCollision_Foo_Foo__Foo___Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: NameCollision.Foo.Foo_.Foo__.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<NameCollision_Foo_Foo__Foo__>;
}
export declare namespace NameCollision.Foo.Foo_.Foo__ {
    interface Copyable {
        readonly x?: number;
        readonly topLevelFoo?: NameCollision.Foo.Copyable;
    }
    type Mutable = NameCollision_Foo_Foo__Foo___Mutable;
    type OrMutable = Foo__ | Mutable;
}
declare class NameCollision_Foo_Foo__Mutable extends $._MutableBase {
    constructor(copyable?: NameCollision.Foo.Foo_.Copyable);
    foo: NameCollision.Foo.Foo_.Foo__;
    toFrozen(): NameCollision.Foo.Foo_;
    toMutable: () => this;
    readonly [$._COPYABLE]: NameCollision.Foo.Foo_.Copyable | undefined;
}
declare class NameCollision_Foo_Foo_ extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(copyable: $.WholeOrPartial<NameCollision.Foo.Foo_.Copyable, Accept>): NameCollision.Foo.Foo_;
    private constructor();
    readonly foo: NameCollision.Foo.Foo_.Foo__;
    static readonly DEFAULT: NameCollision_Foo_Foo_;
    toFrozen: () => this;
    toMutable: () => NameCollision.Foo.Foo_.Mutable;
    static readonly Mutable: typeof NameCollision_Foo_Foo__Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: NameCollision.Foo.Foo_.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<NameCollision_Foo_Foo_>;
    static readonly Foo__: typeof NameCollision_Foo_Foo__Foo__;
}
export declare namespace NameCollision.Foo.Foo_ {
    interface Copyable {
        readonly foo?: NameCollision.Foo.Foo_.Foo__.Copyable;
    }
    type Mutable = NameCollision_Foo_Foo__Mutable;
    type OrMutable = Foo_ | Mutable;
    type Foo__ = NameCollision_Foo_Foo__Foo__;
}
declare class NameCollision_Foo_Mutable extends $._MutableBase {
    constructor(copyable?: NameCollision.Foo.Copyable);
    foo: NameCollision.Foo.Foo_;
    toFrozen(): NameCollision.Foo;
    toMutable: () => this;
    readonly [$._COPYABLE]: NameCollision.Foo.Copyable | undefined;
}
declare class NameCollision_Foo extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(copyable: $.WholeOrPartial<NameCollision.Foo.Copyable, Accept>): NameCollision.Foo;
    private constructor();
    readonly foo: NameCollision.Foo.Foo_;
    static readonly DEFAULT: NameCollision_Foo;
    toFrozen: () => this;
    toMutable: () => NameCollision.Foo.Mutable;
    static readonly Mutable: typeof NameCollision_Foo_Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: NameCollision.Foo.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<NameCollision_Foo>;
    static readonly Foo_: typeof NameCollision_Foo_Foo_;
}
export declare namespace NameCollision.Foo {
    interface Copyable {
        readonly foo?: NameCollision.Foo.Foo_.Copyable;
    }
    type Mutable = NameCollision_Foo_Mutable;
    type OrMutable = Foo | Mutable;
    type Foo_ = NameCollision_Foo_Foo_;
}
declare class NameCollision_Array_Array__Mutable extends $._MutableBase {
    constructor(_?: NameCollision.Array.Array_.Copyable);
    toFrozen(): NameCollision.Array.Array_;
    toMutable: () => this;
    readonly [$._COPYABLE]: NameCollision.Array.Array_.Copyable | undefined;
}
declare class NameCollision_Array_Array_ extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(_: $.WholeOrPartial<NameCollision.Array.Array_.Copyable, Accept>): NameCollision.Array.Array_;
    private constructor();
    static readonly DEFAULT: NameCollision_Array_Array_;
    toFrozen: () => this;
    toMutable: () => NameCollision.Array.Array_.Mutable;
    static readonly Mutable: typeof NameCollision_Array_Array__Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: NameCollision.Array.Array_.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<NameCollision_Array_Array_>;
}
export declare namespace NameCollision.Array.Array_ {
    type Copyable = Record<string | number | symbol, never> | OrMutable;
    type Mutable = NameCollision_Array_Array__Mutable;
    type OrMutable = Array_ | Mutable;
}
declare class NameCollision_Array_Mutable extends $._MutableBase {
    constructor(copyable?: NameCollision.Array.Copyable);
    array: NameCollision.Array.Array_.OrMutable;
    get mutableArray(): NameCollision.Array.Array_.Mutable;
    toFrozen(): NameCollision.Array;
    toMutable: () => this;
    readonly [$._COPYABLE]: NameCollision.Array.Copyable | undefined;
}
declare class NameCollision_Array extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(copyable: $.WholeOrPartial<NameCollision.Array.Copyable, Accept>): NameCollision.Array;
    private constructor();
    readonly array: NameCollision.Array.Array_;
    static readonly DEFAULT: NameCollision_Array;
    toFrozen: () => this;
    toMutable: () => NameCollision.Array.Mutable;
    static readonly Mutable: typeof NameCollision_Array_Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: NameCollision.Array.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<NameCollision_Array>;
    static readonly Array_: typeof NameCollision_Array_Array_;
}
export declare namespace NameCollision.Array {
    interface Copyable {
        readonly array?: NameCollision.Array.Array_.Copyable;
    }
    type Mutable = NameCollision_Array_Mutable;
    type OrMutable = Array | Mutable;
    type Array_ = NameCollision_Array_Array_;
}
declare class NameCollision_Value_Mutable extends $._MutableBase {
    constructor(_?: NameCollision.Value.Copyable);
    toFrozen(): NameCollision.Value;
    toMutable: () => this;
    readonly [$._COPYABLE]: NameCollision.Value.Copyable | undefined;
}
declare class NameCollision_Value extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(_: $.WholeOrPartial<NameCollision.Value.Copyable, Accept>): NameCollision.Value;
    private constructor();
    static readonly DEFAULT: NameCollision_Value;
    toFrozen: () => this;
    toMutable: () => NameCollision.Value.Mutable;
    static readonly Mutable: typeof NameCollision_Value_Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: NameCollision.Value.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<NameCollision_Value>;
}
export declare namespace NameCollision.Value {
    type Copyable = Record<string | number | symbol, never> | OrMutable;
    type Mutable = NameCollision_Value_Mutable;
    type OrMutable = Value | Mutable;
}
declare class NameCollision_Enum_Mutable__Mutable extends $._MutableBase {
    constructor(_?: NameCollision.Enum.Mutable_.Copyable);
    toFrozen(): NameCollision.Enum.Mutable_;
    toMutable: () => this;
    readonly [$._COPYABLE]: NameCollision.Enum.Mutable_.Copyable | undefined;
}
declare class NameCollision_Enum_Mutable_ extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(_: $.WholeOrPartial<NameCollision.Enum.Mutable_.Copyable, Accept>): NameCollision.Enum.Mutable_;
    private constructor();
    static readonly DEFAULT: NameCollision_Enum_Mutable_;
    toFrozen: () => this;
    toMutable: () => NameCollision.Enum.Mutable_.Mutable;
    static readonly Mutable: typeof NameCollision_Enum_Mutable__Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: NameCollision.Enum.Mutable_.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<NameCollision_Enum_Mutable_>;
}
export declare namespace NameCollision.Enum.Mutable_ {
    type Copyable = Record<string | number | symbol, never> | OrMutable;
    type Mutable = NameCollision_Enum_Mutable__Mutable;
    type OrMutable = Mutable_ | Mutable;
}
declare class NameCollision_Enum extends $._EnumBase {
    static readonly DEFAULT_: NameCollision_Enum;
    static create<Kind extends NameCollision.Enum.ValueKind>(kind: Kind, value: NameCollision.Enum.CopyableFor<Kind>): NameCollision.Enum;
    static fromCopyable(copyable: NameCollision.Enum.Copyable): NameCollision.Enum;
    static readonly DEFAULT: NameCollision_Enum;
    static readonly SERIALIZER: $.Serializer<NameCollision_Enum>;
    private constructor();
    readonly kind: NameCollision.Enum.Kind;
    readonly value: NameCollision.Enum.Value;
    as: <Kind extends NameCollision.Enum.ValueKind>(kind: Kind) => NameCollision.Enum.ValueFor<Kind> | undefined;
    switch: <T>(switcher: NameCollision.Enum.Switcher<T> | NameCollision.Enum.SwitcherWithFallback<T>) => T;
    static readonly Mutable_: typeof NameCollision_Enum_Mutable_;
}
export declare namespace NameCollision.Enum {
    type ConstantKind = "DEFAULT";
    type ValueKind = "mutable";
    type Kind = ConstantKind | ValueKind;
    type Copyable = NameCollision.Enum | "DEFAULT" | {
        kind: "mutable";
        value: NameCollision.Enum.Mutable_.Copyable;
    };
    type CopyableFor<C extends ValueKind> = C extends "mutable" ? NameCollision.Enum.Mutable_.Copyable : never;
    type Value = NameCollision.Enum.Mutable_ | undefined;
    type ValueFor<C extends ValueKind> = C extends "mutable" ? NameCollision.Enum.Mutable_ : never;
    interface Switcher<T> {
        "DEFAULT": () => T;
        "mutable": (v: NameCollision.Enum.Mutable_) => T;
    }
    interface SwitcherWithFallback<T> extends Partial<Switcher<T>> {
        fallbackTo: () => T;
    }
    type Mutable_ = NameCollision_Enum_Mutable_;
}
declare class NameCollision_Mutable extends $._MutableBase {
    constructor(copyable?: NameCollision.Copyable);
    foo: NameCollision.Foo.OrMutable;
    array: NameCollision.Array.OrMutable;
    get mutableFoo(): NameCollision.Foo.Mutable;
    get mutableArray(): NameCollision.Array.Mutable;
    toFrozen(): NameCollision;
    toMutable: () => this;
    readonly [$._COPYABLE]: NameCollision.Copyable | undefined;
}
export declare class NameCollision extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(copyable: $.WholeOrPartial<NameCollision.Copyable, Accept>): NameCollision;
    private constructor();
    readonly foo: NameCollision.Foo;
    readonly array: NameCollision.Array;
    static readonly DEFAULT: NameCollision;
    toFrozen: () => this;
    toMutable: () => NameCollision.Mutable;
    static readonly Mutable: typeof NameCollision_Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: NameCollision.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<NameCollision>;
    static readonly Foo: typeof NameCollision_Foo;
    static readonly Array: typeof NameCollision_Array;
    static readonly Value: typeof NameCollision_Value;
    static readonly Enum: typeof NameCollision_Enum;
}
export declare namespace NameCollision {
    interface Copyable {
        readonly foo?: NameCollision.Foo.Copyable;
        readonly array?: NameCollision.Array.Copyable;
    }
    type Mutable = NameCollision_Mutable;
    type OrMutable = NameCollision | Mutable;
    type Foo = NameCollision_Foo;
    type Array = NameCollision_Array;
    type Value = NameCollision_Value;
    type Enum = NameCollision_Enum;
}
declare class RecA_Mutable extends $._MutableBase {
    constructor(copyable?: RecA.Copyable);
    a: RecA;
    b: RecB;
    toFrozen(): RecA;
    toMutable: () => this;
    readonly [$._COPYABLE]: RecA.Copyable | undefined;
}
export declare class RecA extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(copyable: $.WholeOrPartial<RecA.Copyable, Accept>): RecA;
    private constructor();
    private readonly _a;
    private readonly _b;
    get a(): RecA;
    get b(): RecB;
    static readonly DEFAULT: RecA;
    toFrozen: () => this;
    toMutable: () => RecA.Mutable;
    static readonly Mutable: typeof RecA_Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: RecA.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<RecA>;
}
export declare namespace RecA {
    interface Copyable {
        readonly a?: RecA.Copyable;
        readonly b?: RecB.Copyable;
    }
    type Mutable = RecA_Mutable;
    type OrMutable = RecA | Mutable;
}
declare class RecB_Mutable extends $._MutableBase {
    constructor(copyable?: RecB.Copyable);
    a: RecA;
    aList: ReadonlyArray<RecA | null> | null;
    toFrozen(): RecB;
    toMutable: () => this;
    readonly [$._COPYABLE]: RecB.Copyable | undefined;
}
export declare class RecB extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(copyable: $.WholeOrPartial<RecB.Copyable, Accept>): RecB;
    private constructor();
    readonly a: RecA;
    readonly aList: ReadonlyArray<RecA | null> | null;
    static readonly DEFAULT: RecB;
    toFrozen: () => this;
    toMutable: () => RecB.Mutable;
    static readonly Mutable: typeof RecB_Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: RecB.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<RecB>;
}
export declare namespace RecB {
    interface Copyable {
        readonly a?: RecA.Copyable;
        readonly aList?: ReadonlyArray<RecA.Copyable | null> | null;
    }
    type Mutable = RecB_Mutable;
    type OrMutable = RecB | Mutable;
}
declare class Name_Name1_Mutable extends $._MutableBase {
    constructor(_?: Name.Name1.Copyable);
    toFrozen(): Name.Name1;
    toMutable: () => this;
    readonly [$._COPYABLE]: Name.Name1.Copyable | undefined;
}
declare class Name_Name1 extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(_: $.WholeOrPartial<Name.Name1.Copyable, Accept>): Name.Name1;
    private constructor();
    static readonly DEFAULT: Name_Name1;
    toFrozen: () => this;
    toMutable: () => Name.Name1.Mutable;
    static readonly Mutable: typeof Name_Name1_Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: Name.Name1.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<Name_Name1>;
}
export declare namespace Name.Name1 {
    type Copyable = Record<string | number | symbol, never> | OrMutable;
    type Mutable = Name_Name1_Mutable;
    type OrMutable = Name1 | Mutable;
}
declare class Name_Name2_Mutable extends $._MutableBase {
    constructor(copyable?: Name.Name2.Copyable);
    name1: Name.Name1.OrMutable;
    get mutableName1(): Name.Name1.Mutable;
    toFrozen(): Name.Name2;
    toMutable: () => this;
    readonly [$._COPYABLE]: Name.Name2.Copyable | undefined;
}
declare class Name_Name2 extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(copyable: $.WholeOrPartial<Name.Name2.Copyable, Accept>): Name.Name2;
    private constructor();
    readonly name1: Name.Name1;
    static readonly DEFAULT: Name_Name2;
    toFrozen: () => this;
    toMutable: () => Name.Name2.Mutable;
    static readonly Mutable: typeof Name_Name2_Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: Name.Name2.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<Name_Name2>;
}
export declare namespace Name.Name2 {
    interface Copyable {
        readonly name1?: Name.Name1.Copyable;
    }
    type Mutable = Name_Name2_Mutable;
    type OrMutable = Name2 | Mutable;
}
declare class Name_Name__Name___Mutable extends $._MutableBase {
    constructor(copyable?: Name.Name_.Name__.Copyable);
    name2: Name.Name2.OrMutable;
    get mutableName2(): Name.Name2.Mutable;
    toFrozen(): Name.Name_.Name__;
    toMutable: () => this;
    readonly [$._COPYABLE]: Name.Name_.Name__.Copyable | undefined;
}
declare class Name_Name__Name__ extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(copyable: $.WholeOrPartial<Name.Name_.Name__.Copyable, Accept>): Name.Name_.Name__;
    private constructor();
    readonly name2: Name.Name2;
    static readonly DEFAULT: Name_Name__Name__;
    toFrozen: () => this;
    toMutable: () => Name.Name_.Name__.Mutable;
    static readonly Mutable: typeof Name_Name__Name___Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: Name.Name_.Name__.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<Name_Name__Name__>;
}
export declare namespace Name.Name_.Name__ {
    interface Copyable {
        readonly name2?: Name.Name2.Copyable;
    }
    type Mutable = Name_Name__Name___Mutable;
    type OrMutable = Name__ | Mutable;
}
declare class Name_Name__Mutable extends $._MutableBase {
    constructor(_?: Name.Name_.Copyable);
    toFrozen(): Name.Name_;
    toMutable: () => this;
    readonly [$._COPYABLE]: Name.Name_.Copyable | undefined;
}
declare class Name_Name_ extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(_: $.WholeOrPartial<Name.Name_.Copyable, Accept>): Name.Name_;
    private constructor();
    static readonly DEFAULT: Name_Name_;
    toFrozen: () => this;
    toMutable: () => Name.Name_.Mutable;
    static readonly Mutable: typeof Name_Name__Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: Name.Name_.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<Name_Name_>;
    static readonly Name__: typeof Name_Name__Name__;
}
export declare namespace Name.Name_ {
    type Copyable = Record<string | number | symbol, never> | OrMutable;
    type Mutable = Name_Name__Mutable;
    type OrMutable = Name_ | Mutable;
    type Name__ = Name_Name__Name__;
}
declare class Name_Mutable extends $._MutableBase {
    constructor(_?: Name.Copyable);
    toFrozen(): Name;
    toMutable: () => this;
    readonly [$._COPYABLE]: Name.Copyable | undefined;
}
export declare class Name extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(_: $.WholeOrPartial<Name.Copyable, Accept>): Name;
    private constructor();
    static readonly DEFAULT: Name;
    toFrozen: () => this;
    toMutable: () => Name.Mutable;
    static readonly Mutable: typeof Name_Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: Name.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<Name>;
    static readonly Name1: typeof Name_Name1;
    static readonly Name2: typeof Name_Name2;
    static readonly Name_: typeof Name_Name_;
}
export declare namespace Name {
    type Copyable = Record<string | number | symbol, never> | OrMutable;
    type Mutable = Name_Mutable;
    type OrMutable = Name | Mutable;
    type Name1 = Name_Name1;
    type Name2 = Name_Name2;
    type Name_ = Name_Name_;
}
export {};
//# sourceMappingURL=structs.soia.d.ts.map