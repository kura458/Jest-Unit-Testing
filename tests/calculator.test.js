
import { add } from "../src/calculator.js";

describe("Calculator add function", () => {
  test("should add two positive numbers", () => {
    expect(add(2, 3)).toBe(5);
  });
});
