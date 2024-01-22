import * as $ from "soia";
declare class FullName_Mutable extends $._MutableBase {
    constructor(copyable?: FullName.Copyable);
    firstName: string;
    lastName: string;
    toFrozen(): FullName;
    toMutable: () => this;
    readonly [$._COPYABLE]: FullName.Copyable | undefined;
}
export declare class FullName extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(copyable: $.WholeOrPartial<FullName.Copyable, Accept>): FullName;
    private constructor();
    readonly firstName: string;
    readonly lastName: string;
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
    }
    type Mutable = FullName_Mutable;
    type OrMutable = FullName | Mutable;
}
export {};
//# sourceMappingURL=full_name.soia.d.ts.map