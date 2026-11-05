
export function getApplicationCategory(score) {
  if (score >= 90) {
    return "Excellent";
  }

  if (score >= 50) {
    return "Pass";
  }

  return "Fail";
}
