
import { describe, test, expect } from "@jest/globals";
import { getApplicationCategory } from "../../src/applicationCategory.js";

describe("Application category - boundary and expected result tests", () => {
  test.each([
    { score: 100, expected: "Excellent" },
    { score: 90, expected: "Excellent" },
    { score: 89, expected: "Pass" },
    { score: 50, expected: "Pass" },
    { score: 49, expected: "Fail" },
    { score: 0, expected: "Fail" },
  ])("score $score returns $expected", ({ score, expected }) => {
    expect(getApplicationCategory(score)).toBe(expected);
  });
});
