import * as $ from "soia";
export declare class Weekday extends $._EnumBase {
    static readonly MONDAY: Weekday;
    static readonly TUESDAY: Weekday;
    static readonly WEDNESDAY: Weekday;
    static readonly THURSDAY: Weekday;
    static readonly FRIDAY: Weekday;
    static readonly SATURDAY: Weekday;
    static readonly SUNDAY: Weekday;
    static fromCopyable(copyable: Weekday.Copyable): Weekday;
    static readonly DEFAULT: Weekday;
    static readonly SERIALIZER: $.Serializer<Weekday>;
    private constructor();
    readonly kind: Weekday.Kind;
    switch: <T>(switcher: Weekday.Switcher<T> | Weekday.SwitcherWithFallback<T>) => T;
}
export declare namespace Weekday {
    type ConstantKind = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
    type ValueKind = never;
    type Kind = ConstantKind | ValueKind;
    type Copyable = Weekday | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
    interface Switcher<T> {
        "MONDAY": () => T;
        "TUESDAY": () => T;
        "WEDNESDAY": () => T;
        "THURSDAY": () => T;
        "FRIDAY": () => T;
        "SATURDAY": () => T;
        "SUNDAY": () => T;
    }
    interface SwitcherWithFallback<T> extends Partial<Switcher<T>> {
        fallbackTo: () => T;
    }
}
declare class JsonValue_Pair_Mutable extends $._MutableBase {
    constructor(copyable?: JsonValue.Pair.Copyable);
    name: string;
    value: JsonValue;
    toFrozen(): JsonValue.Pair;
    toMutable: () => this;
    readonly [$._COPYABLE]: JsonValue.Pair.Copyable | undefined;
}
declare class JsonValue_Pair extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(copyable: $.WholeOrPartial<JsonValue.Pair.Copyable, Accept>): JsonValue.Pair;
    private constructor();
    readonly name: string;
    private readonly _value;
    get value(): JsonValue;
    static readonly DEFAULT: JsonValue_Pair;
    toFrozen: () => this;
    toMutable: () => JsonValue.Pair.Mutable;
    static readonly Mutable: typeof JsonValue_Pair_Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: JsonValue.Pair.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<JsonValue_Pair>;
}
export declare namespace JsonValue.Pair {
    interface Copyable {
        readonly name?: string;
        readonly value?: JsonValue.Copyable;
    }
    type Mutable = JsonValue_Pair_Mutable;
    type OrMutable = Pair | Mutable;
}
export declare class JsonValue extends $._EnumBase {
    static readonly NULL: JsonValue;
    static create<Kind extends JsonValue.ValueKind>(kind: Kind, value: JsonValue.CopyableFor<Kind>): JsonValue;
    static fromCopyable(copyable: JsonValue.Copyable): JsonValue;
    static readonly DEFAULT: JsonValue;
    static readonly SERIALIZER: $.Serializer<JsonValue>;
    private constructor();
    readonly kind: JsonValue.Kind;
    readonly value: JsonValue.Value;
    as: <Kind extends JsonValue.ValueKind>(kind: Kind) => JsonValue.ValueFor<Kind> | undefined;
    switch: <T>(switcher: JsonValue.Switcher<T> | JsonValue.SwitcherWithFallback<T>) => T;
    static readonly Pair: typeof JsonValue_Pair;
}
export declare namespace JsonValue {
    type ConstantKind = "NULL";
    type ValueKind = "boolean" | "number" | "string" | "array" | "object";
    type Kind = ConstantKind | ValueKind;
    type Copyable = JsonValue | "NULL" | {
        kind: "boolean";
        value: boolean;
    } | {
        kind: "number";
        value: number;
    } | {
        kind: "string";
        value: string;
    } | {
        kind: "array";
        value: ReadonlyArray<JsonValue.Copyable>;
    } | {
        kind: "object";
        value: ReadonlyArray<JsonValue.Pair.Copyable>;
    };
    type CopyableFor<C extends ValueKind> = C extends "boolean" ? boolean : C extends "number" ? number : C extends "string" ? string : C extends "array" ? ReadonlyArray<JsonValue.Copyable> : C extends "object" ? ReadonlyArray<JsonValue.Pair.Copyable> : never;
    type Value = boolean | number | string | ReadonlyArray<JsonValue> | ReadonlyArray<JsonValue.Pair> | undefined;
    type ValueFor<C extends ValueKind> = C extends "boolean" ? boolean : C extends "number" ? number : C extends "string" ? string : C extends "array" ? ReadonlyArray<JsonValue> : C extends "object" ? ReadonlyArray<JsonValue.Pair> : never;
    interface Switcher<T> {
        "NULL": () => T;
        "boolean": (v: boolean) => T;
        "number": (v: number) => T;
        "string": (v: string) => T;
        "array": (v: ReadonlyArray<JsonValue>) => T;
        "object": (v: ReadonlyArray<JsonValue.Pair>) => T;
    }
    interface SwitcherWithFallback<T> extends Partial<Switcher<T>> {
        fallbackTo: () => T;
    }
    type Pair = JsonValue_Pair;
}
declare class EnumWithRecursiveDefault_S_Mutable extends $._MutableBase {
    constructor(copyable?: EnumWithRecursiveDefault.S.Copyable);
    f: EnumWithRecursiveDefault;
    toFrozen(): EnumWithRecursiveDefault.S;
    toMutable: () => this;
    readonly [$._COPYABLE]: EnumWithRecursiveDefault.S.Copyable | undefined;
}
declare class EnumWithRecursiveDefault_S extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(copyable: $.WholeOrPartial<EnumWithRecursiveDefault.S.Copyable, Accept>): EnumWithRecursiveDefault.S;
    private constructor();
    private readonly _f;
    get f(): EnumWithRecursiveDefault;
    static readonly DEFAULT: EnumWithRecursiveDefault_S;
    toFrozen: () => this;
    toMutable: () => EnumWithRecursiveDefault.S.Mutable;
    static readonly Mutable: typeof EnumWithRecursiveDefault_S_Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: EnumWithRecursiveDefault.S.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<EnumWithRecursiveDefault_S>;
}
export declare namespace EnumWithRecursiveDefault.S {
    interface Copyable {
        readonly f?: EnumWithRecursiveDefault.Copyable;
    }
    type Mutable = EnumWithRecursiveDefault_S_Mutable;
    type OrMutable = S | Mutable;
}
export declare class EnumWithRecursiveDefault extends $._EnumBase {
    static create<Kind extends EnumWithRecursiveDefault.ValueKind>(kind: Kind, value: EnumWithRecursiveDefault.CopyableFor<Kind>): EnumWithRecursiveDefault;
    static fromCopyable(copyable: EnumWithRecursiveDefault.Copyable): EnumWithRecursiveDefault;
    static readonly DEFAULT: EnumWithRecursiveDefault;
    static readonly SERIALIZER: $.Serializer<EnumWithRecursiveDefault>;
    private constructor();
    readonly kind: EnumWithRecursiveDefault.Kind;
    readonly value: EnumWithRecursiveDefault.Value;
    as: <Kind extends EnumWithRecursiveDefault.ValueKind>(kind: Kind) => EnumWithRecursiveDefault.ValueFor<Kind> | undefined;
    switch: <T>(switcher: EnumWithRecursiveDefault.Switcher<T> | EnumWithRecursiveDefault.SwitcherWithFallback<T>) => T;
    static readonly S: typeof EnumWithRecursiveDefault_S;
}
export declare namespace EnumWithRecursiveDefault {
    type ConstantKind = never;
    type ValueKind = "f";
    type Kind = ConstantKind | ValueKind;
    type Copyable = EnumWithRecursiveDefault | {
        kind: "f";
        value: EnumWithRecursiveDefault.S.Copyable;
    };
    type CopyableFor<C extends ValueKind> = C extends "f" ? EnumWithRecursiveDefault.S.Copyable : never;
    type Value = EnumWithRecursiveDefault.S | undefined;
    type ValueFor<C extends ValueKind> = C extends "f" ? EnumWithRecursiveDefault.S : never;
    interface Switcher<T> {
        "f": (v: EnumWithRecursiveDefault.S) => T;
    }
    interface SwitcherWithFallback<T> extends Partial<Switcher<T>> {
        fallbackTo: () => T;
    }
    type S = EnumWithRecursiveDefault_S;
}
export {};
//# sourceMappingURL=enums.soia.d.ts.map