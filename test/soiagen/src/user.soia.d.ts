import * as $ from "soia";
declare class User_Mutable extends $._MutableBase {
    constructor(copyable?: User.Copyable);
    userId: bigint;
    toFrozen(): User;
    toMutable: () => this;
    readonly [$._COPYABLE]: User.Copyable | undefined;
}
export declare class User extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(copyable: $.WholeOrPartial<User.Copyable, Accept>): User;
    private constructor();
    readonly userId: bigint;
    static readonly DEFAULT: User;
    toFrozen: () => this;
    toMutable: () => User.Mutable;
    static readonly Mutable: typeof User_Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: User.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<User>;
}
export declare namespace User {
    interface Copyable {
        readonly userId?: bigint;
    }
    type Mutable = User_Mutable;
    type OrMutable = User | Mutable;
}
declare class UserProfile_Mutable extends $._MutableBase {
    constructor(copyable?: UserProfile.Copyable);
    user: User.OrMutable;
    get mutableUser(): User.Mutable;
    toFrozen(): UserProfile;
    toMutable: () => this;
    readonly [$._COPYABLE]: UserProfile.Copyable | undefined;
}
export declare class UserProfile extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(copyable: $.WholeOrPartial<UserProfile.Copyable, Accept>): UserProfile;
    private constructor();
    readonly user: User;
    static readonly DEFAULT: UserProfile;
    toFrozen: () => this;
    toMutable: () => UserProfile.Mutable;
    static readonly Mutable: typeof UserProfile_Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: UserProfile.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<UserProfile>;
}
export declare namespace UserProfile {
    interface Copyable {
        readonly user?: User.Copyable;
    }
    type Mutable = UserProfile_Mutable;
    type OrMutable = UserProfile | Mutable;
}
declare class UserProfiles_Mutable extends $._MutableBase {
    constructor(copyable?: UserProfiles.Copyable);
    profiles: ReadonlyArray<UserProfile.OrMutable>;
    get mutableProfiles(): Array<UserProfile.OrMutable>;
    toFrozen(): UserProfiles;
    toMutable: () => this;
    readonly [$._COPYABLE]: UserProfiles.Copyable | undefined;
}
export declare class UserProfiles extends $._FrozenBase {
    static create<Accept extends "partial" | "whole" = "partial">(copyable: $.WholeOrPartial<UserProfiles.Copyable, Accept>): UserProfiles;
    private constructor();
    readonly profiles: ReadonlyArray<UserProfile>;
    private __maps;
    get profilesMap(): ReadonlyMap<string, UserProfile>;
    static readonly DEFAULT: UserProfiles;
    toFrozen: () => this;
    toMutable: () => UserProfiles.Mutable;
    static readonly Mutable: typeof UserProfiles_Mutable;
    private FROZEN;
    readonly [$._COPYABLE]: UserProfiles.Copyable | undefined;
    static readonly SERIALIZER: $.Serializer<UserProfiles>;
}
export declare namespace UserProfiles {
    interface Copyable {
        readonly profiles?: ReadonlyArray<UserProfile.Copyable>;
    }
    type Mutable = UserProfiles_Mutable;
    type OrMutable = UserProfiles | Mutable;
}
export {};
//# sourceMappingURL=user.soia.d.ts.map