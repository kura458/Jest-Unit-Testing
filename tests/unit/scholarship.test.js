import { evaluateScholarship } from "../../src/scholarship.js";
import { scholarshipCases } from "../fixtures/scholarshipCases.js";

// Object-based data-driven tests (23 cases from the fixture).
describe("Scholarship eligibility decision table", () => {
  test.each(scholarshipCases)(
    "$description",
    ({ student, expected }) => {
      expect(evaluateScholarship(student)).toBe(expected);
    }
  );
});

// Input validation tests.
describe("Scholarship input validation", () => {
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
describe("Scholarship eligibility using an array-based table", () => {
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