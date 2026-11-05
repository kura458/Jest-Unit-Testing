export function evaluateAdmission(applicant) {
  const {
    age,
    score,
    hasCertificate,
    applicationFeePaid,
    isInternational,
  } = applicant;

  // Reject applicants who do not meet the minimum requirements.
  if (age < 18) {
    return { status: "Rejected", reason: "Underage" };
  }

  if (score < 60) {
    return { status: "Rejected", reason: "Low Score" };
  }

  // Check required documents and payment.
  if (!hasCertificate) {
    return { status: "Pending", reason: "Missing Certificate" };
  }

  if (!applicationFeePaid) {
    return { status: "Pending", reason: "Payment Required" };
  }

  // Check additional international requirements.
  if (isInternational && score < 75) {
    return { status: "Pending", reason: "International Review" };
  }

  // Determine scholarship eligibility.
  if (score >= 90) {
    return { status: "Accepted", scholarship: true };
  }

  return { status: "Accepted", scholarship: false };
}