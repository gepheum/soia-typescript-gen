import * as $ from "soia";
import { User as User } from "../user.soia";
declare class Car_Mutable extends $._MutableBase {
    constructor(copyable?: Car.Copyable);
    model: string;
    purchaseTime: $.Timestamp;
    owner: User.OrMutable;
    get mutableOwner(): User.Mutable;
    toFrozen(): Car;
    toMutable: () => this;
    readonly [$._COPYABLE]: Car.Copyable | undefined;
}
export declare class Car extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(copyable: $.WholeOrPartial<Car.Copyable, Accept>): Car;
    private constructor();
    readonly model: string;
    readonly purchaseTime: $.Timestamp;
    readonly owner: User;
    static readonly DEFAULT: Car;
    toFrozen: () => this;
    toMutable: () => Car.Mutable;
    static readonly Mutable: typeof Car_Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: Car.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<Car>;
}
export declare namespace Car {
    interface Copyable {
        readonly model?: string;
        readonly purchaseTime?: $.Timestamp;
        readonly owner?: User.Copyable;
    }
    type Mutable = Car_Mutable;
    type OrMutable = Car | Mutable;
}
export {};
//# sourceMappingURL=car.soia.d.ts.map