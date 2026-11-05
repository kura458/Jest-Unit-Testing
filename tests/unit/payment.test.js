import { processPayment } from "../../src/payment.js";

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
    // 2.5% card fee + 1.5% international fee.
    expect(processPayment(1000, "card", true)).toBe(1040);
  });

  test("calculates the international bank fee correctly", () => {
    // Fixed bank fee of 10 + 1.5% international fee.
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
    // 2.5% + 1.5% of 125.50 = 5.02.
    expect(processPayment(125.50, "card", true)).toBeCloseTo(130.52);
  });
});