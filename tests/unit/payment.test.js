import { describe, test, expect } from "@jest/globals";
import { processPayment } from "../../src/payment.js";

// ============================================================================
// PART 1: QUESTION 8 - PARAMETERIZED PAYMENT RULES & DATA COMBINATIONS
// ============================================================================

// 1. Domestic and international combinations using describe.each and test.each
describe.each([
  {
    method: "card",
    expectedDomestic: 1025.00,
    expectedInternational: 1040.00,
  },
  {
    method: "bank",
    expectedDomestic: 1010.00,
    expectedInternational: 1025.00,
  },
])("Payment method: $method", ({
  method,
  expectedDomestic,
  expectedInternational,
}) => {
  test.each([
    {
      type: "Domestic",
      isInternational: false,
      expected: expectedDomestic,
    },
    {
      type: "International",
      isInternational: true,
      expected: expectedInternational,
    },
  ])("$type payment calculates the correct total", ({
    isInternational,
    expected,
  }) => {
    expect(processPayment(1000, method, isInternational))
      .toBe(expected);
  });
});

// 2. Different payment amounts & combinations (12 parameterized cases)
describe("Payment amount calculations", () => {
  test.each([
    { id: "P01", amount: 1, method: "card", international: false, expected: 1.03 },
    { id: "P02", amount: 100, method: "card", international: false, expected: 102.50 },
    { id: "P03", amount: 100, method: "card", international: true, expected: 104.00 },
    { id: "P04", amount: 100, method: "bank", international: false, expected: 110.00 },
    { id: "P05", amount: 100, method: "bank", international: true, expected: 111.50 },
    { id: "P06", amount: 10.10, method: "card", international: false, expected: 10.35 },
    { id: "P07", amount: 10.10, method: "card", international: true, expected: 10.50 },
    { id: "P08", amount: 10.50, method: "bank", international: false, expected: 20.50 },
    { id: "P09", amount: 10.50, method: "bank", international: true, expected: 20.66 },
    { id: "P10", amount: 1000000, method: "card", international: false, expected: 1025000.00 },
    { id: "P11", amount: 1000000, method: "card", international: true, expected: 1040000.00 },
    { id: "P12", amount: 1000000, method: "bank", international: false, expected: 1000010.00 },
  ])("$id: processes amount $amount using $method", ({
    amount,
    method,
    international,
    expected,
  }) => {
    expect(processPayment(amount, method, international))
      .toBe(expected);
  });
});

// 3. Invalid payment amounts (range and type)
describe("Payment amount validation", () => {
  test.each([
    ["zero amount", 0],
    ["negative amount", -100],
    ["NaN amount", NaN],
    ["positive Infinity", Infinity],
    ["negative Infinity", -Infinity],
  ])("rejects %s with RangeError", (description, amount) => {
    expect(() => processPayment(amount, "card", false))
      .toThrow(RangeError);
  });

  test.each([
    ["string amount", "100"],
    ["null amount", null],
    ["undefined amount", undefined],
  ])("rejects %s with TypeError", (description, amount) => {
    expect(() => processPayment(amount, "card", false))
      .toThrow(TypeError);
  });
});

// 4. Payment method validation
describe("Payment method validation", () => {
  test.each([
    ["unsupported method", "mobile"],
    ["empty method", ""],
    ["uppercase method", "CARD"],
  ])("rejects %s with RangeError", (description, method) => {
    expect(() => processPayment(100, method, false))
      .toThrow(RangeError);
  });

  test.each([
    ["missing method", undefined],
    ["null method", null],
    ["numeric method", 123],
  ])("rejects %s with TypeError", (description, method) => {
    expect(() => processPayment(100, method, false))
      .toThrow(TypeError);
  });
});

// 5. International flag validation
describe("International transaction validation", () => {
  test.each([
    ["string flag", "true"],
    ["numeric flag", 1],
    ["null flag", null],
    ["missing flag", undefined],
  ])("rejects %s with TypeError", (description, flag) => {
    expect(() => processPayment(100, "card", flag))
      .toThrow(TypeError);
  });
});

// 6. Rounding validation
describe("Payment rounding", () => {
  test("rounds final payment to two decimal places", () => {
    expect(processPayment(10.10, "card", false))
      .toBe(10.35);
  });

  test("returns an integer total when no decimal fee exists", () => {
    expect(processPayment(100, "bank", false))
      .toBe(110);
  });
});

// ============================================================================
// PART 2: QUESTION 14 - MUTATION SCORE IMPROVEMENT TESTS
// ============================================================================

describe("Payment processing - initial tests", () => {
  test("processes a domestic card payment", () => {
    expect(processPayment(1000, "card", false)).toBeCloseTo(1025);
  });

  test("processes a domestic bank payment", () => {
    expect(processPayment(1000, "bank", false)).toBe(1010);
  });

  test("rejects a zero payment amount", () => {
    expect(() => {
      processPayment(0, "card", false);
    }).toThrow("Invalid amount");
  });

  test("rejects an unsupported payment method", () => {
    expect(() => {
      processPayment(1000, "mobile", false);
    }).toThrow("Unsupported payment method");
  });
});

describe("Payment processing - targeted mutation tests", () => {
  test("calculates the international card fee correctly", () => {
    expect(processPayment(1000, "card", true)).toBe(1040);
  });

  test("calculates the international bank fee correctly", () => {
    expect(processPayment(1000, "bank", true)).toBe(1025);
  });

  test("calculates the international card fee for a smaller amount", () => {
    expect(processPayment(200, "card", true)).toBe(208);
  });

  test("calculates the international bank fee for a smaller amount", () => {
    expect(processPayment(200, "bank", true)).toBe(213);
  });

  test("does not add an international fee to a domestic card payment", () => {
    expect(processPayment(500, "card", false)).toBe(512.5);
  });

  test("does not add an international fee to a domestic bank payment", () => {
    expect(processPayment(500, "bank", false)).toBe(510);
  });

  test("rejects a negative payment amount", () => {
    expect(() => {
      processPayment(-100, "card", false);
    }).toThrow("Invalid amount");
  });

  test("rejects zero amount for international bank payment", () => {
    expect(() => {
      processPayment(0, "bank", true);
    }).toThrow("Invalid amount");
  });

  test("rejects an unsupported payment method for international payment", () => {
    expect(() => {
      processPayment(1000, "crypto", true);
    }).toThrow("Unsupported payment method");
  });

  test("calculates an international card payment with a decimal amount", () => {
    expect(processPayment(125.50, "card", true)).toBeCloseTo(130.52);
  });
});
