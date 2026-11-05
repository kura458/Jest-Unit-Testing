import { jest } from "@jest/globals";
import { FakeDatabase } from "../../src/fakeDatabase.js";

let database;
let lifecycleEvents = [];
let nestedEvents = [];

beforeAll(() => {
  database = new FakeDatabase();
  database.connect();
  lifecycleEvents.push("beforeAll");
});

beforeEach(() => {
  database.records = [];
  lifecycleEvents.push("beforeEach");
});

afterEach(() => {
  lifecycleEvents.push("afterEach");
  jest.restoreAllMocks();
});

afterAll(() => {
  database.disconnect();
  lifecycleEvents.push("afterAll");

  expect(database.connected).toBe(false);

  // Verify the complete nested hook execution order.
  expect(nestedEvents).toEqual([
    "nested beforeAll",
    "nested beforeEach",
    "nested test",
    "nested afterEach",
    "nested afterAll"
  ]);
});

describe("FakeDatabase lifecycle", () => {
  test("connects before inserting records", () => {
    expect(database.connected).toBe(true);

    database.insert({ id: 1, name: "Sara" });

    expect(database.records).toHaveLength(1);
    expect(database.records[0].name).toBe("Sara");
  });

  test("rejects insertion when disconnected", () => {
    database.disconnect();

    expect(() => {
      database.insert({ id: 2, name: "Marta" });
    }).toThrow("Database not connected");

    expect(database.records).toHaveLength(0);

    database.connect();
  });

  test("starts with empty records for every test", () => {
    expect(database.records).toHaveLength(0);
  });

  test("remains connected while suite tests are running", () => {
    expect(database.connected).toBe(true);
  });

  describe("Nested lifecycle hooks", () => {
    beforeAll(() => {
      nestedEvents.push("nested beforeAll");
    });

    beforeEach(() => {
      nestedEvents.push("nested beforeEach");
    });

    afterEach(() => {
      nestedEvents.push("nested afterEach");
    });

    afterAll(() => {
      nestedEvents.push("nested afterAll");
    });

    test("records the nested hook execution order", () => {
      nestedEvents.push("nested test");

      expect(nestedEvents).toContain("nested beforeAll");
      expect(nestedEvents).toContain("nested beforeEach");
    });
  });

  describe("Cleanup and error handling", () => {
    test("uses a disconnect spy to verify cleanup", () => {
      const disconnectSpy = jest.spyOn(database, "disconnect");

      database.disconnect();

      expect(disconnectSpy).toHaveBeenCalledTimes(1);
      expect(database.connected).toBe(false);

      database.connect();
    });

    test("catches a rejected database operation", () => {
      database.disconnect();

      expect(() => {
        database.insert({ id: 3, name: "John" });
      }).toThrow("Database not connected");

      database.connect();
    });
  });
});