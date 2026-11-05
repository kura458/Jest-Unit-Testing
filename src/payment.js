/**
 * Processes a tuition payment.
 *
 * Fee rules:
 * - Card: 2.5% of the payment amount.
 * - Bank: fixed fee of 10.
 * - International: additional 1.5% of the payment amount.
 *
 * Rounding policy:
 * The final total is rounded to two decimal places
 * using Math.round() and Number.EPSILON.
 *
 * @param {number} amount - Original payment amount.
 * @param {string} method - "card" or "bank".
 * @param {boolean} isInternational - International transaction flag.
 * @returns {number} Final payment including fees.
 */
export function processPayment(amount, method, isInternational) {
  // Validate amount type
  if (typeof amount !== "number") {
    throw new TypeError("Amount must be a number");
  }

  // Validate amount range
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new RangeError("Invalid amount: must be a positive finite number");
  }

  // Validate payment method type
  if (typeof method !== "string") {
    throw new TypeError("Payment method must be a string");
  }

  // Validate supported payment methods
  if (!["card", "bank"].includes(method)) {
    throw new RangeError("Unsupported payment method");
  }

  // Validate international flag
  if (typeof isInternational !== "boolean") {
    throw new TypeError("isInternational must be a boolean");
  }

  // Calculate payment fee
  let fee = 0;

  if (method === "card") {
    fee = amount * 0.025;
  } else if (method === "bank") {
    fee = 10;
  }

  // Additional international fee
  if (isInternational) {
    fee += amount * 0.015;
  }

  const total = amount + fee;

  // Round final amount to two decimal places
  return Math.round((total + Number.EPSILON) * 100) / 100;
}
