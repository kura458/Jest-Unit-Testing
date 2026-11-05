
// Round monetary values to two decimal places.
// Policy: use standard JavaScript rounding with Number.EPSILON.
function roundMoney(amount) {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

// Validate the course list and each course record.
function validateCourses(courses) {
  if (!Array.isArray(courses)) {
    throw new TypeError("Courses must be an array");
  }

  for (const course of courses) {
    if (
      course === null ||
      typeof course !== "object" ||
      Array.isArray(course)
    ) {
      throw new TypeError("Each course must be an object");
    }

    if (typeof course.creditHours !== "number") {
      throw new TypeError("Credit hours must be a number");
    }

    if (!Number.isInteger(course.creditHours) || course.creditHours < 0) {
      throw new RangeError("Credit hours must be a nonnegative integer");
    }

    if (typeof course.pricePerCredit !== "number") {
      throw new TypeError("Price per credit must be a number");
    }

    if (
      !Number.isFinite(course.pricePerCredit) ||
      course.pricePerCredit < 0
    ) {
      throw new RangeError(
        "Price per credit must be a nonnegative finite number"
      );
    }
  }
}

// Validate the scholarship rate.
function validateScholarshipRate(rate) {
  if (typeof rate !== "number") {
    throw new TypeError("Scholarship rate must be a number");
  }

  if (!Number.isFinite(rate) || rate < 0 || rate > 1) {
    throw new RangeError(
      "Scholarship rate must be between 0 and 1"
    );
  }
}

export function calculateTuition(courses, scholarshipRate = 0) {
  validateCourses(courses);
  validateScholarshipRate(scholarshipRate);

  const rawSubtotal = courses.reduce(
    (sum, course) =>
      sum + course.creditHours * course.pricePerCredit,
    0
  );

  const subtotal = roundMoney(rawSubtotal);
  const discount = roundMoney(subtotal * scholarshipRate);
  const payable = roundMoney(subtotal - discount);

  return {
    subtotal,
    discount,
    payable
  };
}

export function findMostExpensiveCourse(courses) {
  validateCourses(courses);

  if (courses.length === 0) {
    return null;
  }

  let mostExpensive = courses[0];
  let highestCost =
    mostExpensive.creditHours * mostExpensive.pricePerCredit;

  for (let i = 1; i < courses.length; i++) {
    const currentCost =
      courses[i].creditHours * courses[i].pricePerCredit;

    // Strictly greater preserves the first course when costs tie.
    if (currentCost > highestCost) {
      highestCost = currentCost;
      mostExpensive = courses[i];
    }
  }

  return mostExpensive;
}
