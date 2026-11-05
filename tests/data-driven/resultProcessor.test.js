import { describe, test, expect } from "@jest/globals";
import { processResult } from "../../src/resultProcessor.js";

// Valid input and expected result combinations
describe("Student result processing - valid data", () => {
  test.each([
    {
      id: "R01",
      scores: [],
      expected: { average: 0, status: "No Scores" },
    },
    {
      id: "R02",
      scores: [0],
      expected: { average: 0, status: "Fail" },
    },
    {
      id: "R03",
      scores: [100],
      expected: { average: 100, status: "Pass" },
    },
    {
      id: "R04",
      scores: [49],
      expected: { average: 49, status: "Fail" },
    },
    {
      id: "R05",
      scores: [50],
      expected: { average: 50, status: "Pass" },
    },
    {
      id: "R06",
      scores: [51],
      expected: { average: 51, status: "Pass" },
    },
    {
      id: "R07",
      scores: [40, 60],
      expected: { average: 50, status: "Pass" },
    },
    {
      id: "R08",
      scores: [40, 59],
      expected: { average: 49.5, status: "Fail" },
    },
    {
      id: "R09",
      scores: [50, 50],
      expected: { average: 50, status: "Pass" },
    },
    {
      id: "R10",
      scores: [75, 75, 75],
      expected: { average: 75, status: "Pass" },
    },
    {
      id: "R11",
      scores: [20, 20, 20],
      expected: { average: 20, status: "Fail" },
    },
    {
      id: "R12",
      scores: [0, 100],
      expected: { average: 50, status: "Pass" },
    },
    {
      id: "R13",
      scores: [10.5, 20.5],
      expected: { average: 15.5, status: "Fail" },
    },
    {
      id: "R14",
      scores: [49.99],
      expected: { average: 49.99, status: "Fail" },
    },
    {
      id: "R15",
      scores: [50.01],
      expected: { average: 50.01, status: "Pass" },
    },
    {
      id: "R16",
      scores: [25, 50, 75],
      expected: { average: 50, status: "Pass" },
    },
    {
      id: "R17",
      scores: [60, 60, 80],
      expected: { average: 200 / 3, status: "Pass" },
    },
  ])("$id: processes scores $scores correctly", ({ scores, expected }) => {
    expect(processResult(scores)).toEqual(expected);
  });
});

// Invalid input types
describe("Student result processing - invalid input types", () => {
  test.each([
    ["string input", "50"],
    ["number input", 50],
    ["null input", null],
    ["undefined input", undefined],
    ["object input", { score: 50 }],
  ])("rejects %s", (description, input) => {
    expect(() => processResult(input)).toThrow(TypeError);
  });

  test.each([
    ["string score", ["50"]],
    ["nested array", [[50]]],
    ["NaN score", [NaN]],
    ["positive Infinity", [Infinity]],
    ["negative Infinity", [-Infinity]],
    ["null score", [null]],
  ])("rejects %s", (description, scores) => {
    expect(() => processResult(scores)).toThrow(TypeError);
  });
});

// Scores outside the permitted range
describe("Student result processing - score range validation", () => {
  test.each([
    ["negative score", [-1]],
    ["score above 100", [101]],
    ["negative score in mixed array", [50, -5, 80]],
    ["score above 100 in mixed array", [50, 105, 80]],
  ])("rejects %s", (description, scores) => {
    expect(() => processResult(scores)).toThrow(RangeError);
  });
});

// Input immutability
describe("Student result processing - input array immutability", () => {
  test("does not modify the original scores array", () => {
    const scores = [60, 40, 80];
    const originalScores = [...scores];

    processResult(scores);

    expect(scores).toEqual(originalScores);
  });
});