import { describe, test, expect } from "@jest/globals";
import { evaluateScholarship } from "../../src/scholarship.js";
import { scholarshipCases } from "../fixtures/scholarshipCases.js";

// ============================================================================
// PART 1: QUESTION 7 - DECISION TABLE, VALIDATION & ARRAY TEST TABLE
// ============================================================================

// Object-based data-driven tests (23 cases from the fixture).
describe("Scholarship eligibility decision table (Fixture-based)", () => {
  test.each(scholarshipCases)(
    "$description",
    ({ student, expected }) => {
      expect(evaluateScholarship(student)).toBe(expected);
    }
  );
});

// Input validation tests.
describe("Scholarship input validation (Q7)", () => {
  test("rejects null student", () => {
    expect(() => evaluateScholarship(null)).toThrow(TypeError);
  });

  test("rejects a non-object student", () => {
    expect(() => evaluateScholarship("student")).toThrow(TypeError);
  });

  test("rejects an array instead of a student object", () => {
    expect(() => evaluateScholarship([])).toThrow(TypeError);
  });

  test("rejects a missing student object", () => {
    expect(() => evaluateScholarship()).toThrow(TypeError);
  });

  test("rejects a string average", () => {
    expect(() =>
      evaluateScholarship({
        average: "90",
        attendance: 95,
        credits: 15,
        disciplinaryAction: false
      })
    ).toThrow(TypeError);
  });

  test("rejects NaN average", () => {
    expect(() =>
      evaluateScholarship({
        average: NaN,
        attendance: 95,
        credits: 15,
        disciplinaryAction: false
      })
    ).toThrow(TypeError);
  });

  test("rejects infinite average", () => {
    expect(() =>
      evaluateScholarship({
        average: Infinity,
        attendance: 95,
        credits: 15,
        disciplinaryAction: false
      })
    ).toThrow(TypeError);
  });

  test("rejects average below zero", () => {
    expect(() =>
      evaluateScholarship({
        average: -1,
        attendance: 95,
        credits: 15,
        disciplinaryAction: false
      })
    ).toThrow(RangeError);
  });

  test("rejects average above 100", () => {
    expect(() =>
      evaluateScholarship({
        average: 101,
        attendance: 95,
        credits: 15,
        disciplinaryAction: false
      })
    ).toThrow(RangeError);
  });

  test("rejects a string attendance value", () => {
    expect(() =>
      evaluateScholarship({
        average: 90,
        attendance: "95",
        credits: 15,
        disciplinaryAction: false
      })
    ).toThrow(TypeError);
  });

  test("rejects NaN attendance", () => {
    expect(() =>
      evaluateScholarship({
        average: 90,
        attendance: NaN,
        credits: 15,
        disciplinaryAction: false
      })
    ).toThrow(TypeError);
  });

  test("rejects attendance below zero", () => {
    expect(() =>
      evaluateScholarship({
        average: 90,
        attendance: -1,
        credits: 15,
        disciplinaryAction: false
      })
    ).toThrow(RangeError);
  });

  test("rejects attendance above 100", () => {
    expect(() =>
      evaluateScholarship({
        average: 90,
        attendance: 101,
        credits: 15,
        disciplinaryAction: false
      })
    ).toThrow(RangeError);
  });

  test("rejects string credits", () => {
    expect(() =>
      evaluateScholarship({
        average: 90,
        attendance: 95,
        credits: "15",
        disciplinaryAction: false
      })
    ).toThrow(TypeError);
  });

  test("rejects fractional credits", () => {
    expect(() =>
      evaluateScholarship({
        average: 90,
        attendance: 95,
        credits: 15.5,
        disciplinaryAction: false
      })
    ).toThrow(RangeError);
  });

  test("rejects negative credits", () => {
    expect(() =>
      evaluateScholarship({
        average: 90,
        attendance: 95,
        credits: -1,
        disciplinaryAction: false
      })
    ).toThrow(RangeError);
  });

  test("rejects a non-Boolean disciplinary action", () => {
    expect(() =>
      evaluateScholarship({
        average: 90,
        attendance: 95,
        credits: 15,
        disciplinaryAction: "false"
      })
    ).toThrow(TypeError);
  });

  test("rejects a missing disciplinary action", () => {
    expect(() =>
      evaluateScholarship({
        average: 90,
        attendance: 95,
        credits: 15
      })
    ).toThrow(TypeError);
  });
});

// Equivalent array-based data-driven test table.
describe("Scholarship eligibility using an array-based table (Q7)", () => {
  const arrayCases = [
    [95, 97, 18, false, "Full Scholarship"],
    [85, 90, 12, false, "Partial Scholarship"],
    [70, 75, 10, false, "Not Eligible"],
    [95, 98, 18, true, "Rejected"]
  ];

  test.each(arrayCases)(
    "average=%s, attendance=%s, credits=%s, disciplinaryAction=%s",
    (average, attendance, credits, disciplinaryAction, expected) => {
      const student = {
        average,
        attendance,
        credits,
        disciplinaryAction
      };

      expect(evaluateScholarship(student)).toBe(expected);
    }
  );
});

// ============================================================================
// PART 2: QUESTION 12 - FIRST-ORDER MUTATION TESTING TARGETED BOUNDARY TESTS
// ============================================================================

describe("Scholarship Evaluation - Main outcomes (Q12)", () => {
  test("awards a full scholarship to a highly qualified student", () => {
    expect(
      evaluateScholarship({
        average: 95,
        attendance: 98,
        credits: 18,
        disciplinaryAction: false,
      })
    ).toBe("Full Scholarship");
  });

  test("awards a partial scholarship to a qualified student", () => {
    expect(
      evaluateScholarship({
        average: 85,
        attendance: 90,
        credits: 14,
        disciplinaryAction: false,
      })
    ).toBe("Partial Scholarship");
  });

  test("rejects a student with disciplinary action", () => {
    expect(
      evaluateScholarship({
        average: 98,
        attendance: 99,
        credits: 20,
        disciplinaryAction: true,
      })
    ).toBe("Rejected");
  });

  test("marks an unqualified student as not eligible", () => {
    expect(
      evaluateScholarship({
        average: 65,
        attendance: 75,
        credits: 10,
        disciplinaryAction: false,
      })
    ).toBe("Not Eligible");
  });
});

describe("Scholarship Evaluation - Full scholarship boundaries (Q12)", () => {
  test("awards full scholarship at all exact minimum thresholds", () => {
    expect(
      evaluateScholarship({
        average: 90,
        attendance: 95,
        credits: 15,
        disciplinaryAction: false,
      })
    ).toBe("Full Scholarship");
  });

  test.each([
    {
      average: 89,
      attendance: 98,
      credits: 18,
      expected: "Partial Scholarship",
    },
    {
      average: 95,
      attendance: 94,
      credits: 18,
      expected: "Partial Scholarship",
    },
    {
      average: 95,
      attendance: 98,
      credits: 14,
      expected: "Partial Scholarship",
    },
  ])(
    "does not award full scholarship below a required threshold",
    ({ average, attendance, credits, expected }) => {
      expect(
        evaluateScholarship({
          average,
          attendance,
          credits,
          disciplinaryAction: false,
        })
      ).toBe(expected);
    }
  );
});

describe("Scholarship Evaluation - Partial scholarship boundaries (Q12)", () => {
  test("awards partial scholarship at all exact minimum thresholds", () => {
    expect(
      evaluateScholarship({
        average: 80,
        attendance: 85,
        credits: 12,
        disciplinaryAction: false,
      })
    ).toBe("Partial Scholarship");
  });

  test.each([
    {
      average: 79,
      attendance: 90,
      credits: 14,
    },
    {
      average: 85,
      attendance: 84,
      credits: 14,
    },
    {
      average: 85,
      attendance: 90,
      credits: 11,
    },
  ])(
    "does not award partial scholarship below a required threshold",
    ({ average, attendance, credits }) => {
      expect(
        evaluateScholarship({
          average,
          attendance,
          credits,
          disciplinaryAction: false,
        })
      ).toBe("Not Eligible");
    }
  );
});

describe("Scholarship Evaluation - Student input validation & mutants (Q12)", () => {
  test.each([null, undefined, 10, "student", []])(
    "rejects invalid student input: %p",
    (student) => {
      expect(() => evaluateScholarship(student)).toThrow(
        "Student must be an object"
      );
    }
  );

  test.each(["90", NaN, Infinity, -Infinity])(
    "rejects invalid average: %p",
    (average) => {
      expect(() =>
        evaluateScholarship({
          average,
          attendance: 95,
          credits: 15,
          disciplinaryAction: false,
        })
      ).toThrow("Average must be a finite number");
    }
  );

  test.each([-1, 101])(
    "rejects average outside the permitted range: %p",
    (average) => {
      expect(() =>
        evaluateScholarship({
          average,
          attendance: 95,
          credits: 15,
          disciplinaryAction: false,
        })
      ).toThrow("Average must be between 0 and 100");
    }
  );

  test.each([0, 100])(
    "accepts valid average boundary: %p",
    (average) => {
      expect(
        evaluateScholarship({
          average,
          attendance: 95,
          credits: 15,
          disciplinaryAction: false,
        })
      ).not.toBe("Rejected");
    }
  );

  test.each(["95", NaN, Infinity, -Infinity])(
    "rejects invalid attendance: %p",
    (attendance) => {
      expect(() =>
        evaluateScholarship({
          average: 95,
          attendance,
          credits: 15,
          disciplinaryAction: false,
        })
      ).toThrow("Attendance must be a finite number");
    }
  );

  test.each([-1, 101])(
    "rejects attendance outside the permitted range: %p",
    (attendance) => {
      expect(() =>
        evaluateScholarship({
          average: 95,
          attendance,
          credits: 15,
          disciplinaryAction: false,
        })
      ).toThrow("Attendance must be between 0 and 100");
    }
  );

  test.each([0, 100])(
    "accepts valid attendance boundary: %p",
    (attendance) => {
      expect(
        evaluateScholarship({
          average: 95,
          attendance,
          credits: 15,
          disciplinaryAction: false,
        })
      ).not.toBe("Rejected");
    }
  );

  test.each(["15", NaN, Infinity, -Infinity])(
    "rejects invalid credits: %p",
    (credits) => {
      expect(() =>
        evaluateScholarship({
          average: 95,
          attendance: 95,
          credits,
          disciplinaryAction: false,
        })
      ).toThrow("Credits must be a number");
    }
  );

  test.each([-1, 1.5])(
    "rejects negative or fractional credits: %p",
    (credits) => {
      expect(() =>
        evaluateScholarship({
          average: 95,
          attendance: 95,
          credits,
          disciplinaryAction: false,
        })
      ).toThrow("Credits must be a non-negative integer");
    }
  );

  test("accepts zero credits as a valid non-negative integer", () => {
    expect(
      evaluateScholarship({
        average: 95,
        attendance: 95,
        credits: 0,
        disciplinaryAction: false,
      })
    ).toBe("Not Eligible");
  });

  test("rejects a non-boolean disciplinary action value", () => {
    expect(() =>
      evaluateScholarship({
        average: 95,
        attendance: 95,
        credits: 15,
        disciplinaryAction: "false",
      })
    ).toThrow("Disciplinary action must be a boolean");
  });
});
