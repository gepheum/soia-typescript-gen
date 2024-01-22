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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfiles = exports.UserProfile = exports.User = void 0;
const $ = __importStar(require("soia"));
// -----------------------------------------------------------------------------
// struct User
// -----------------------------------------------------------------------------
// Exported as 'User.Builder'
class User_Mutable extends $._MutableBase {
    constructor(copyable = User.DEFAULT) {
        super();
        initUser(this, copyable);
        Object.seal(this);
    }
    toFrozen() {
        return User.create(this);
    }
}
class User extends $._FrozenBase {
    static create(copyable) {
        if (copyable instanceof _a) {
            return copyable;
        }
        return new _a(copyable);
    }
    constructor(copyable) {
        super();
        initUser(this, copyable);
        Object.freeze(this);
    }
}
exports.User = User;
_a = User;
User.DEFAULT = new _a({});
User.Mutable = User_Mutable;
User.SERIALIZER = $._newStructSerializer(_a.DEFAULT);
function initUser(target, copyable) {
    target.userId = copyable.userId || BigInt(0);
}
// -----------------------------------------------------------------------------
// struct UserProfile
// -----------------------------------------------------------------------------
// Exported as 'UserProfile.Builder'
class UserProfile_Mutable extends $._MutableBase {
    constructor(copyable = UserProfile.DEFAULT) {
        super();
        initUserProfile(this, copyable);
        Object.seal(this);
    }
    get mutableUser() {
        const v = this.user;
        return v instanceof User.Mutable ? v : (this.user = v.toMutable());
    }
    toFrozen() {
        return UserProfile.create(this);
    }
}
class UserProfile extends $._FrozenBase {
    static create(copyable) {
        if (copyable instanceof _b) {
            return copyable;
        }
        return new _b(copyable);
    }
    constructor(copyable) {
        super();
        initUserProfile(this, copyable);
        Object.freeze(this);
    }
}
exports.UserProfile = UserProfile;
_b = UserProfile;
UserProfile.DEFAULT = new _b({});
UserProfile.Mutable = UserProfile_Mutable;
UserProfile.SERIALIZER = $._newStructSerializer(_b.DEFAULT);
function initUserProfile(target, copyable) {
    target.user = User.create(copyable.user || User.DEFAULT);
}
// -----------------------------------------------------------------------------
// struct UserProfiles
// -----------------------------------------------------------------------------
// Exported as 'UserProfiles.Builder'
class UserProfiles_Mutable extends $._MutableBase {
    constructor(copyable = UserProfiles.DEFAULT) {
        super();
        initUserProfiles(this, copyable);
        Object.seal(this);
    }
    get mutableProfiles() {
        return this.profiles = $._toMutableArray(this.profiles);
    }
    toFrozen() {
        return UserProfiles.create(this);
    }
}
class UserProfiles extends $._FrozenBase {
    static create(copyable) {
        if (copyable instanceof _c) {
            return copyable;
        }
        return new _c(copyable);
    }
    constructor(copyable) {
        super();
        this.__maps = {};
        initUserProfiles(this, copyable);
        Object.freeze(this);
    }
    get profilesMap() {
        return this.__maps.profiles || (this.__maps.profiles = new Map(this.profiles.map((v) => [v.user.userId.toString(), v])));
    }
}
exports.UserProfiles = UserProfiles;
_c = UserProfiles;
UserProfiles.DEFAULT = new _c({});
UserProfiles.Mutable = UserProfiles_Mutable;
UserProfiles.SERIALIZER = $._newStructSerializer(_c.DEFAULT);
function initUserProfiles(target, copyable) {
    target.profiles = $._toFrozenArray(copyable.profiles || [], (e) => UserProfile.create(e));
}
// -----------------------------------------------------------------------------
// Initialize the serializers
// -----------------------------------------------------------------------------
const _MODULE_PATH = "src/user.soia";
$._initStructSerializer(User.SERIALIZER, "User", "User", _MODULE_PATH, undefined, [
    ["user_id", "userId", 0, $.primitiveSerializer("int64")],
], []);
$._initStructSerializer(UserProfile.SERIALIZER, "UserProfile", "UserProfile", _MODULE_PATH, undefined, [
    ["user", "user", 0, User.SERIALIZER],
], []);
$._initStructSerializer(UserProfiles.SERIALIZER, "UserProfiles", "UserProfiles", _MODULE_PATH, undefined, [
    ["profiles", "profiles", 0, $.arraySerializer(UserProfile.SERIALIZER)],
], []);
//# sourceMappingURL=user.soia.js.map