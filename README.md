[![npm](https://img.shields.io/npm/v/soia-typescript-gen)](https://www.npmjs.com/package/soia-typescript-gen)
[![build](https://github.com/gepheum/soia-typescript-generator/workflows/Build/badge.svg)](https://github.com/gepheum/soia-typescript-generator/actions)

# Soia's TypeScript code generator

Official plugin for generating TypeScript/JavaScript code from [.soia](https://github.com/gepheum/soia) files.

Generated code can run Node, Deno or in the browser.

## Installation

From your project's root directory, run `npm i --save-dev soia-typescript-gen`.

In your `soia.yml` file, add the following snippet under `generators`:
```yaml
  - mod: soia-typescript-gen
    config:
      # Possible values: "" (CommonJS), ".js" (ES Modules), ".ts" (Deno)
      importPathExtension: ""
```

The `npm run soiac` command will now generate .js and .t.ts files within the `soiagen` directory.

For more information, see this TypeScript project [example](https://github.com/gepheum/soia-typescript-example).

## TypeScript generated code guide

The examples below are for the code generated from [this](https://github.com/gepheum/soia-typescript-example/blob/main/soia_src/user.soia) .soia file.

### Referring to generated symbols

```typescript
import { TARZAN, User, UserHistory, UserRegistry } from "../soiagen/user";
```

### Struct classes

For every struct `S` in the .soia file, soia generates a frozen/deeply immutable class `S` and a mutable class `S.Mutable`.

#### Frozen struct classes

```typescript
// User.create({...}) consructs a frozen/deeply immutable User
const john = User.create({
  userId: 42,
  name: "John Doe",
});

assert(john.name === "John Doe");
assert(john.quote === "");

// create<"whole">({...}) forces you to initialize all the fields of the struct.
// You will get a TypeScript compile-time error if you miss one.
const jane = User.create<"whole">({
  userId: 43,
  name: "Jane Doe",
  quote: "I am Jane.",
  pets: [{ name: "Fluffy" }, { name: "Fido" }],
  subscriptionStatus: "PREMIUM",
});

const janeHistory = UserHistory.create({
  user: jane,
  // ^ the object you pass to create({...}) can contain struct values
  sessions: [
    {
      login: Timestamp.fromUnixMillis(1234),
      logout: Timestamp.fromUnixMillis(2345),
    },
  ],
});

const defaultUser = User.DEFAULT;
assert(defaultUser.name === "");
// User.DEFAULT is same as User.create({});
```

#### Mutable struct classes

```typescript
// User.Mutable is a mutable version of User.
const lylaMut = new User.Mutable();
lylaMut.userId = 44;
lylaMut.name = "Lyla Doe";

// The User.Mutable() constructor also accepts an initializer object.
const jolyMut = new User.Mutable({ userId: 45 });
jolyMut.name = "Joly Doe";

const jolyHistoryMut = new UserHistory.Mutable();
jolyHistoryMut.user = jolyMut;
// ^ The right-hand side of the assignment can be either frozen or mutable.

// jolyHistoryMut.user.quote = "I am Joly.";
// ^ Does not compile: quote is readonly because jolyHistoryMut.user is possibly
// frozen

// The mutableUser() getter first checks if 'user' is already a mutable struct,
// and if so, returns it. Otherwise, it assigns to 'user' a mutable shallow copy
// of itself and returns it.
jolyHistoryMut.mutableUser.quote = "I am Joly.";

// Similarly, mutablePets() first checks if 'pets' is already a mutable array,
// and if so, returns it. Otherwise, it assigns to 'pets' a mutable shallow copy
// of itself and returns it.
lylaMut.mutablePets.push(User.Pet.create({ name: "Cupcake" }));
lylaMut.mutablePets.push(new User.Pet.Mutable({ name: "Simba" }));
```

#### Converting between frozen and mutable

```typescript
// toMutable() does a shallow copy of the frozen struct, so it's cheap. All the
// properties of the copy hold a frozen value.
const evilJaneMut = jane.toMutable();
evilJaneMut.name = "Evil Jane";

// toFrozen() recursively copies the mutable values held by properties of the
// object. It's cheap if all the values are frozen, like in this example.
const evilJane: User = evilJaneMut.toFrozen();
```

#### Writing logic agnostic of mutability

```typescript
// 'User.OrMutable' is a type alias for 'User | User.Mutable'.
function greet(user: User.OrMutable) {
  console.log(`Hello, ${user.name}`);
}

greet(jane);
// Hello, Jane Doe
greet(lylaMut);
// Hello, Lyla Doe
```

### Enum classes

The definition of the `SubscriptionStatus` enum in the .soia file is:
```rust
enum SubscriptionStatus {
  FREE;
  trial: Trial;
  PREMIUM;
}
```

#### Making enum values

```typescript
const johnStatus = User.SubscriptionStatus.FREE;
const janeStatus = User.SubscriptionStatus.PREMIUM;
const lylaStatus = User.SubscriptionStatus.create("PREMIUM");
// ^ same as User.SubscriptionStatus.PREMIUM
const jolyStatus = User.SubscriptionStatus.UNKNOWN;

// Use create({kind: ..., value: ...}) for data variants.
const roniStatus = User.SubscriptionStatus.create({
  kind: "trial",
  value: {
    startTime: Timestamp.fromUnixMillis(1234),
  },
});
```

#### Conditions on enums

```typescript
// Use e.kind === "CONSTANT_NAME" to check if the enum value is a constant.
assert(johnStatus.kind === "FREE");
assert(johnStatus.value === undefined);

// Use "?" for UNKNOWN.
assert(jolyStatus.kind === "?");

assert(roniStatus.kind === "trial");
assert(roniStatus.value!.startTime.unixMillis === 1234);

function getSubscriptionInfoText(status: User.SubscriptionStatus): string {
  // Use the union() getter for typesafe switches on enums.
  switch (status.union.kind) {
    case "?":
      return "Unknown subscription status";
    case "FREE":
      return "Free user";
    case "PREMIUM":
      return "Premium user";
    case "trial":
      // Here he compiler knows that the type of union.value is 'User.Trial'.
      return "On trial since " + status.union.value.startTime;
  }
}
```

### Serialization

Every frozen struct class and enum class has a static readonly `SERIALIZER` property which can be used for serializing and deserializing instances of the class.

```typescript

const serializer = User.SERIALIZER;

// Serialize 'john' to dense JSON.
console.log(serializer.toJsonCode(john));
// [42,"John Doe"]

// Serialize 'john' to readable JSON.
console.log(serializer.toJsonCode(john, "readable"));
// {
//   "user_id": 42,
//   "name": "John Doe"
// }

// The dense JSON flavor is the flavor you should pick if you intend to
// deserialize the value in the future. Soia allows fields to be renamed, and
// because fields names are not part of the dense JSON, renaming a field does
// not prevent you from deserializing the value.
// You should pick the readable flavor mostly for debugging purposes.

// Serialize 'john' to binary format.
console.log(serializer.toBytes(john));

// The binary format is not human readable, but it is a bit more compact than
// JSON, and serialization/deserialization can be a bit faster in languages like
// C++. Only use it when this small performance gain is likely to matter, which
// should be rare.
```

### Deserialization

```typescript
const reserializedJohn = serializer.fromJsonCode(serializer.toJsonCode(john));
assert(reserializedJohn.name === "John Doe");

const reserializedJane = serializer.fromJsonCode(
  serializer.toJsonCode(jane, "readable"),
);
assert(reserializedJane.name === "Jane Doe");

const reserializedLyla = serializer.fromBytes(
  serializer.toBytes(lylaMut).toBuffer(),
);
assert(reserializedLyla.name === "Lyla Doe");
```

### Frozen arrays and copies

```typescript
const pets = [
  User.Pet.create({ name: "Fluffy" }),
  User.Pet.create({ name: "Fido" }),
];

const jade = User.create({
  pets: pets,
  // ^ makes a copy of 'pets' because 'pets' is mutable
});

// jade.pets.push(...)
// ^ Compile-time error: pets is readonly

assert(jade.pets !== pets);

const jack = User.create({
  pets: jade.pets,
  // ^ doesn't make a copy because 'jade.pets' is frozen
});

assert(jack.pets === jade.pets);
```

### Keyed arrays

```typescript
const userRegistry = UserRegistry.create({
  users: [john, jane, lylaMut],
});

// searchUsers() returns the user with the given key, specified in the .soia
// file. In this example, the key is the user id. Runs in O(1).
assert(userRegistry.searchUsers(42) === john);
assert(userRegistry.searchUsers(100) === undefined);
```

### Constants

```typescript
console.log(TARZAN);
// User {
//   userId: 123,
//   name: 'Tarzan',
//   quote: 'AAAAaAaAaAyAAAAaAaAaAyAAAAaAaAaA',
//   pets: [ User_Pet { name: 'Cheeta', heightInMeters: 1.67, picture: '🐒' } ],
//   subscriptionStatus: User_SubscriptionStatus {
//     kind: 'trial',
//     value: User_Trial { startTime: [Timestamp] }
//   }
// }
```

### Soia services

#### Starting a soia service on an HTTP server

Full example [here](https://github.com/gepheum/soia-typescript-example/blob/main/src/server.ts).

#### Sending RPCs to a soia service

Full example [here](https://github.com/gepheum/soia-typescript-example/blob/main/src/client.ts).

### Reflection

Reflection allows you to inspect a soia type at runtime.

```typescript
const fieldNames: string[] = [];
for (const field of User.SERIALIZER.typeDescriptor.fields) {
  const { name, number, property, type } = field;
  fieldNames.push(name);
}
console.log(fieldNames);
// [ 'user_id', 'name', 'quote', 'pets', 'subscription_status' ]

// A type descriptor can be serialized to JSON and deserialized later.
const typeDescriptor = parseTypeDescriptor(
  User.SERIALIZER.typeDescriptor.asJson(),
);
```

### Writing unit tests

With mocha and [buckwheat](https://github.com/gepheum/buckwheat).

```typescript
expect(tarzan).toMatch({
  name: "Tarzan",
  quote: /^A/, // must start with the letter A
  pets: [
    {
      name: "Cheeta",
      heightInMeters: near(1.6, 0.1),
    },
  ],
  subscriptionStatus: {
    kind: "trial",
    value: {
      startTime: Timestamp.fromUnixMillis(1234),
    },
  },
  // `userId` is not specified so it can be anything
});
```
