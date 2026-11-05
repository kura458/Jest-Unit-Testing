
import {
  calculateTuition,
  findMostExpensiveCourse
} from "../../src/tuition.js";

describe("calculateTuition", () => {
  // 1. No courses
  test("should return zero amounts when there are no courses", () => {
    expect(calculateTuition([])).toEqual({
      subtotal: 0,
      discount: 0,
      payable: 0
    });
  });

  // 2. One course without scholarship
  test("should calculate tuition for one course", () => {
    const courses = [
      { creditHours: 3, pricePerCredit: 100 }
    ];

    expect(calculateTuition(courses)).toEqual({
      subtotal: 300,
      discount: 0,
      payable: 300
    });
  });

  // 3. Multiple courses
  test("should calculate tuition for multiple courses", () => {
    const courses = [
      { creditHours: 3, pricePerCredit: 100 },
      { creditHours: 2, pricePerCredit: 150 },
      { creditHours: 4, pricePerCredit: 50 }
    ];

    expect(calculateTuition(courses)).toEqual({
      subtotal: 800,
      discount: 0,
      payable: 800
    });
  });

  // 4. Scholarship discount
  test("should apply a scholarship discount correctly", () => {
    const courses = [
      { creditHours: 4, pricePerCredit: 100 }
    ];

    expect(calculateTuition(courses, 0.25)).toEqual({
      subtotal: 400,
      discount: 100,
      payable: 300
    });
  });

  // 5. Full scholarship
  test("should allow a 100 percent scholarship", () => {
    const courses = [
      { creditHours: 3, pricePerCredit: 100 }
    ];

    expect(calculateTuition(courses, 1)).toEqual({
      subtotal: 300,
      discount: 300,
      payable: 0
    });
  });

  // 6. Explicit undefined uses default rate
  test("should use zero scholarship when rate is undefined", () => {
    const courses = [
      { creditHours: 2, pricePerCredit: 50 }
    ];

    expect(calculateTuition(courses, undefined)).toEqual({
      subtotal: 100,
      discount: 0,
      payable: 100
    });
  });

  // 7. Reject null scholarship rate
  test("should reject a null scholarship rate", () => {
    expect(() => calculateTuition([], null))
      .toThrow(TypeError);
  });

  // 8. Reject non-array courses
  test("should reject a non-array courses argument", () => {
    expect(() => calculateTuition({}))
      .toThrow(TypeError);
  });

  // 9. Reject null course record
  test("should reject a null course record", () => {
    expect(() => calculateTuition([null]))
      .toThrow(TypeError);
  });

  // 10. Reject an array used as a course record
  test("should reject an array as a course record", () => {
    expect(() => calculateTuition([[]]))
      .toThrow(TypeError);
  });

  // 11. Reject incorrect creditHours type
  test("should reject string credit hours", () => {
    const courses = [
      { creditHours: "3", pricePerCredit: 100 }
    ];

    expect(() => calculateTuition(courses))
      .toThrow(TypeError);
  });

  // 12. Reject negative creditHours
  test("should reject negative credit hours", () => {
    const courses = [
      { creditHours: -1, pricePerCredit: 100 }
    ];

    expect(() => calculateTuition(courses))
      .toThrow(RangeError);
  });

  // 13. Reject decimal creditHours
  test("should reject decimal credit hours", () => {
    const courses = [
      { creditHours: 2.5, pricePerCredit: 100 }
    ];

    expect(() => calculateTuition(courses))
      .toThrow(RangeError);
  });

  // 14. Reject incorrect price type
  test("should reject string price per credit", () => {
    const courses = [
      { creditHours: 3, pricePerCredit: "100" }
    ];

    expect(() => calculateTuition(courses))
      .toThrow(TypeError);
  });

  // 15. Reject negative price
  test("should reject negative price per credit", () => {
    const courses = [
      { creditHours: 3, pricePerCredit: -10 }
    ];

    expect(() => calculateTuition(courses))
      .toThrow(RangeError);
  });

  // 16. Reject infinite price
  test("should reject infinite price per credit", () => {
    const courses = [
      { creditHours: 3, pricePerCredit: Infinity }
    ];

    expect(() => calculateTuition(courses))
      .toThrow(RangeError);
  });

  // 17. Reject NaN price
  test("should reject NaN price per credit", () => {
    const courses = [
      { creditHours: 3, pricePerCredit: NaN }
    ];

    expect(() => calculateTuition(courses))
      .toThrow(RangeError);
  });

  // 18. Reject string scholarship rate
  test("should reject a string scholarship rate", () => {
    expect(() => calculateTuition([], "0.5"))
      .toThrow(TypeError);
  });

  // 19. Reject negative scholarship rate
  test("should reject a negative scholarship rate", () => {
    expect(() => calculateTuition([], -0.1))
      .toThrow(RangeError);
  });

  // 20. Reject scholarship rate above 1
  test("should reject a scholarship rate above 1", () => {
    expect(() => calculateTuition([], 1.1))
      .toThrow(RangeError);
  });

  // 21. Reject infinite scholarship rate
  test("should reject an infinite scholarship rate", () => {
    expect(() => calculateTuition([], Infinity))
      .toThrow(RangeError);
  });

  // 22. Monetary rounding
  test("should round subtotal, discount, and payable to two decimals", () => {
    const courses = [
      { creditHours: 1, pricePerCredit: 10.005 }
    ];

    expect(calculateTuition(courses, 0.5)).toEqual({
      subtotal: 10.01,
      discount: 5.01,
      payable: 5
    });
  });

  // 23. Input immutability
  test("should not modify the original course records", () => {
    const courses = [
      { name: "Programming", creditHours: 3, pricePerCredit: 100 },
      { name: "Database", creditHours: 2, pricePerCredit: 150 }
    ];

    const originalCourses = structuredClone(courses);

    calculateTuition(courses, 0.2);

    expect(courses).toStrictEqual(originalCourses);
  });
});

describe("findMostExpensiveCourse", () => {
  // 24. Empty array
  test("should return null when there are no courses", () => {
    expect(findMostExpensiveCourse([])).toBeNull();
  });

  // 25. Find the most expensive course
  test("should return the course with the highest total cost", () => {
    const courses = [
      { name: "Programming", creditHours: 3, pricePerCredit: 100 },
      { name: "Database", creditHours: 4, pricePerCredit: 150 },
      { name: "Networking", creditHours: 2, pricePerCredit: 200 }
    ];

    expect(findMostExpensiveCourse(courses)).toBe(courses[1]);
  });

  // 26. First course wins when costs tie
  test("should return the first course when two courses tie", () => {
    const firstCourse = {
      name: "Programming",
      creditHours: 3,
      pricePerCredit: 100
    };

    const secondCourse = {
      name: "Database",
      creditHours: 2,
      pricePerCredit: 150
    };

    const courses = [firstCourse, secondCourse];

    expect(findMostExpensiveCourse(courses)).toBe(firstCourse);
  });

  // 27. Reject invalid course input
  test("should reject a non-array argument", () => {
    expect(() => findMostExpensiveCourse(null))
      .toThrow(TypeError);
  });
});
