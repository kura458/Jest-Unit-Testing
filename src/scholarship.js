
function validateStudent(student) {
  if (
    student === null ||
    typeof student !== "object" ||
    Array.isArray(student)
  ) {
    throw new TypeError("Student must be an object");
  }

  const { average, attendance, credits, disciplinaryAction } = student;

  if (
    typeof average !== "number" ||
    !Number.isFinite(average)
  ) {
    throw new TypeError("Average must be a finite number");
  }

  if (average < 0 || average > 100) {
    throw new RangeError("Average must be between 0 and 100");
  }

  if (
    typeof attendance !== "number" ||
    !Number.isFinite(attendance)
  ) {
    throw new TypeError("Attendance must be a finite number");
  }

  if (attendance < 0 || attendance > 100) {
    throw new RangeError("Attendance must be between 0 and 100");
  }

  if (typeof credits !== "number" || !Number.isFinite(credits)) {
    throw new TypeError("Credits must be a number");
  }

  if (!Number.isInteger(credits) || credits < 0) {
    throw new RangeError("Credits must be a non-negative integer");
  }

  if (typeof disciplinaryAction !== "boolean") {
    throw new TypeError("Disciplinary action must be a boolean");
  }
}

export function evaluateScholarship(student) {
  validateStudent(student);

  const { average, attendance, credits, disciplinaryAction } = student;

  if (disciplinaryAction) {
    return "Rejected";
  }

  if (average >= 90 && attendance >= 95 && credits >= 15) {
    return "Full Scholarship";
  }

  if (average >= 80 && attendance >= 85 && credits >= 12) {
    return "Partial Scholarship";
  }

  return "Not Eligible";
}
