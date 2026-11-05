import { checkEligibility } from "../../src/eligibility.js";

import {
  ageMutant,
  scoreMutant,
  logicalMutant,
  secondOrderMutant,
  thirdOrderMutant
} from "../../src/eligibilityMutants.js";

// Baseline tests for the original eligibility function.
const baselineCases = [
  {
    description: "rejects minimum age",
    age: 0,
    score: 100,
    hasDocument: true,
    expected: "Not Eligible"
  },
  {
    description: "rejects age below 18",
    age: 17,
    score: 100,
    hasDocument: true,
    expected: "Not Eligible"
  },
  {
    description: "accepts exact age and score thresholds",
    age: 18,
    score: 60,
    hasDocument: true,
    expected: "Eligible"
  },
  {
    description: "accepts maximum valid age and score",
    age: 120,
    score: 100,
    hasDocument: true,
    expected: "Eligible"
  },
  {
    description: "rejects score below 60",
    age: 18,
    score: 59,
    hasDocument: true,
    expected: "Not Eligible"
  },
  {
    description: "rejects missing document",
    age: 18,
    score: 60,
    hasDocument: false,
    expected: "Not Eligible"
  },
  {
    description: "accepts values above both thresholds",
    age: 19,
    score: 61,
    hasDocument: true,
    expected: "Eligible"
  }
];

describe("Original eligibility function", () => {
  test.each(baselineCases)(
    "$description",
    ({ age, score, hasDocument, expected }) => {
      expect(
        checkEligibility(age, score, hasDocument)
      ).toBe(expected);
    }
  );
});

// Each input is valid:
// age: integer from 0 to 120
// score: integer from 0 to 100
// hasDocument: Boolean
const mutantCases = [
  {
    name: "FOM 1 - age relational operator",
    mutant: ageMutant,
    age: 18,
    score: 60,
    hasDocument: true,
    originalOutput: "Eligible",
    mutantOutput: "Not Eligible"
  },
  {
    name: "FOM 2 - score relational operator",
    mutant: scoreMutant,
    age: 18,
    score: 60,
    hasDocument: true,
    originalOutput: "Eligible",
    mutantOutput: "Not Eligible"
  },
  {
    name: "FOM 3 - logical operator",
    mutant: logicalMutant,
    age: 18,
    score: 0,
    hasDocument: false,
    originalOutput: "Not Eligible",
    mutantOutput: "Eligible"
  },
  {
    name: "SOM - both relational operators",
    mutant: secondOrderMutant,
    age: 18,
    score: 60,
    hasDocument: true,
    originalOutput: "Eligible",
    mutantOutput: "Not Eligible"
  },
  {
    name: "TOM - all three operator changes",
    mutant: thirdOrderMutant,
    age: 18,
    score: 60,
    hasDocument: true,
    originalOutput: "Eligible",
    mutantOutput: "Not Eligible"
  }
];

describe("First-order and higher-order mutant investigation", () => {
  test.each(mutantCases)(
    "kills $name",
    ({
      mutant,
      age,
      score,
      hasDocument,
      originalOutput,
      mutantOutput
    }) => {
      const originalResult = checkEligibility(
        age,
        score,
        hasDocument
      );

      const mutantResult = mutant(
        age,
        score,
        hasDocument
      );

      expect(originalResult).toBe(originalOutput);
      expect(mutantResult).toBe(mutantOutput);

      // A mutant is killed when its output differs
      // from the original function's output.
      expect(mutantResult).not.toBe(originalResult);
    }
  );
});