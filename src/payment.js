export function processPayment(amount, method, isInternational) {
  if (amount <= 0) {
    throw new Error("Invalid amount");
  }

  let fee = 0;

  if (method === "card") {
    fee = amount * 0.025;
  } else if (method === "bank") {
    fee = 10;
  } else {
    throw new Error("Unsupported payment method");
  }

  if (isInternational) {
    fee += amount * 0.015;
  }

  return amount + fee;
}