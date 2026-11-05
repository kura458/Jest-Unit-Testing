export function processResult(scores) {
  // Validate that the input is an array
  if (!Array.isArray(scores)) {
    throw new TypeError("Scores must be an array");
  }

  // Handle an empty array
  if (scores.length === 0) {
    return {
      average: 0,
      status: "No Scores",
    };
  }

  // Validate every score
  for (const score of scores) {
    if (typeof score !== "number" || !Number.isFinite(score)) {
      throw new TypeError("Every score must be a finite number");
    }

    if (score < 0 || score > 100) {
      throw new RangeError("Scores must be between 0 and 100");
    }
  }

  // Calculate the average
  const total = scores.reduce((sum, score) => sum + score, 0);
  const average = total / scores.length;

  // Determine the result
  return {
    average,
    status: average >= 50 ? "Pass" : "Fail",
  };
}