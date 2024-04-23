import { SerializerTester } from "../../../node_modules/soia/dist/esm/serializer_tester.js";
import { Car } from "../../soiagen/vehicles/car.soia.js";
import { expect } from "buckwheat";
import { describe, it } from "mocha";
import { Timestamp } from "soia";

describe("Car", () => {
  it("TypeDescriptor#asJson()", () => {
    expect(Car.SERIALIZER.typeDescriptor.asJson()).toMatch({
      type: {
        kind: "record",
        name: "Car",
        module: "vehicles/car.soia",
      },
      records: [
        {
          kind: "struct",
          name: "Car",
          module: "vehicles/car.soia",
          fields: [
            {
              name: "model",
              type: {
                kind: "primitive",
                primitive: "string",
              },
              number: 0,
            },
            {
              name: "purchase_time",
              type: {
                kind: "primitive",
                primitive: "timestamp",
              },
              number: 1,
            },
            {
              name: "owner",
              type: {
                kind: "record",
                name: "User",
                module: "user.soia",
              },
              number: 2,
            },
            {
              name: "second_owner",
              type: {
                kind: "optional",
                other: {
                  kind: "record",
                  name: "User",
                  module: "user.soia",
                },
              },
              number: 3,
            },
          ],
        },
        {
          kind: "struct",
          name: "User",
          module: "user.soia",
          fields: [
            {
              name: "user_id",
              type: {
                kind: "primitive",
                primitive: "int64",
              },
              number: 0,
            },
          ],
        },
      ],
    });
    new SerializerTester(
      Car.SERIALIZER,
    ).reserializeTypeAdapterAndAssertNoLoss();
  });

  it("reserialize", () => {
    const serializer = Car.SERIALIZER;
    const serializerTester = new SerializerTester(serializer);
    serializerTester.reserializeAndAssert(
      Car.create({
        model: "Toyota Camry",
        owner: {
          userId: BigInt(123),
        },
        purchaseTime: Timestamp.fromUnixMillis(5000),
      }),
      {
        denseJson: ["Toyota Camry", 5000, ["123"]],
        readableJson: {
          model: "Toyota Camry",
          purchase_time: {
            unix_millis: 5000,
            formatted: "1970-01-01T00:00:05.000Z",
          },
          owner: {
            user_id: "123",
          },
        },
        bytesAsBase16: "f903f30c546f796f74612043616d7279ef8813000000000000f77b",
      },
    );
  });
});
