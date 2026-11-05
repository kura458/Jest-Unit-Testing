
import { GradeBook } from "./grading.js";

describe("GradeBook Class Tests", () => {

  // 1. Empty gradebook
  test("should initialize with an empty score list", () => {
    const gradeBook = new GradeBook(101);

    expect(gradeBook.studentId).toBe(101);
    expect(gradeBook.scores).toEqual([]);
    expect(gradeBook.getAverage()).toBe(0);
    expect(gradeBook.getHighestScore()).toBeNull();
  });

  // 2. Add a single score
  test("should add a single score", () => {
    const gradeBook = new GradeBook(102);

    gradeBook.addScore(80);

    expect(gradeBook.scores).toEqual([80]);
    expect(gradeBook.getAverage()).toBe(80);
  });

  // 3. Calculate multiple scores
  test("should calculate the average of multiple scores", () => {
    const gradeBook = new GradeBook(103);

    gradeBook.addScore(70);
    gradeBook.addScore(80);
    gradeBook.addScore(90);

    expect(gradeBook.getAverage()).toBe(80);
  });

  // 4. Find the highest score
  test("should return the highest score", () => {
    const gradeBook = new GradeBook(104);

    gradeBook.addScore(65);
    gradeBook.addScore(95);
    gradeBook.addScore(75);

    expect(gradeBook.getHighestScore()).toBe(95);
  });

  // 5. Duplicate scores
  test("should support duplicate scores", () => {
    const gradeBook = new GradeBook(105);

    gradeBook.addScore(80);
    gradeBook.addScore(80);
    gradeBook.addScore(90);

    expect(gradeBook.scores).toEqual([80, 80, 90]);
    expect(gradeBook.getAverage()).toBeCloseTo(83.33, 2);
  });

  // 6. Minimum boundary score
  test("should accept score 0", () => {
    const gradeBook = new GradeBook(106);

    gradeBook.addScore(0);

    expect(gradeBook.scores).toEqual([0]);
  });

  // 7. Maximum boundary score
  test("should accept score 100", () => {
    const gradeBook = new GradeBook(107);

    gradeBook.addScore(100);

    expect(gradeBook.scores).toEqual([100]);
  });

  // 8. Reject negative score
 test("should reject a negative score", () => {
  const gradeBook = new GradeBook(108);

  expect(() => gradeBook.addScore(-1))
    .toThrow(new RangeError("Score must be between 0 and 100"));
});

  // 9. Reject score above 100
test("should reject a score above 100", () => {
  const gradeBook = new GradeBook(109);

  expect(() => gradeBook.addScore(101))
    .toThrow(new RangeError("Score must be between 0 and 100"));
});

// 10. Reject string score
test("should reject a string score", () => {
  const gradeBook = new GradeBook(110);

  expect(() => gradeBook.addScore("80"))
    .toThrow(new TypeError("Score must be a finite number"));
});

  // 11. Reject NaN
  test("should reject NaN", () => {
    const gradeBook = new GradeBook(111);

    expect(() => gradeBook.addScore(NaN))
      .toThrow(TypeError);
  });

  // 12. Reject Infinity
  test("should reject Infinity", () => {
    const gradeBook = new GradeBook(112);

    expect(() => gradeBook.addScore(Infinity))
      .toThrow(TypeError);
  });
// 13. Reject negative Infinity
test("should reject negative Infinity", () => {
  const gradeBook = new GradeBook(124);

  expect(() => gradeBook.addScore(-Infinity))
    .toThrow(new TypeError("Score must be a finite number"));
});
  // 14. Remove the lowest score
  test("should remove and return the lowest score", () => {
    const gradeBook = new GradeBook(113);

    gradeBook.addScore(70);
    gradeBook.addScore(40);
    gradeBook.addScore(90);

    expect(gradeBook.removeLowestScore()).toBe(40);
    expect(gradeBook.scores).toEqual([70, 90]);
  });

  // 15. Remove only one occurrence when lowest scores are tied
  test("should remove only one occurrence of a tied lowest score", () => {
    const gradeBook = new GradeBook(114);

    gradeBook.addScore(40);
    gradeBook.addScore(40);
    gradeBook.addScore(80);

    expect(gradeBook.removeLowestScore()).toBe(40);
    expect(gradeBook.scores).toEqual([40, 80]);
  });

  // 16. Remove the only score
  test("should remove the only score", () => {
    const gradeBook = new GradeBook(115);

    gradeBook.addScore(75);

    expect(gradeBook.removeLowestScore()).toBe(75);
    expect(gradeBook.scores).toEqual([]);
  });

  // 17. Remove from an empty gradebook
  test("should return null when removing from an empty gradebook", () => {
    const gradeBook = new GradeBook(116);

    expect(gradeBook.removeLowestScore()).toBeNull();
  });

  // 18. Passing boundary: below 50
  test("should fail an average of 49.99", () => {
    expect(GradeBook.isPassing(49.99)).toBe(false);
  });

  // 19. Passing boundary: exactly 50
  test("should pass an average of 50", () => {
    expect(GradeBook.isPassing(50)).toBe(true);
  });

  // 20. Passing boundary: above 50
  test("should pass an average of 50.01", () => {
    expect(GradeBook.isPassing(50.01)).toBe(true);
  });

  // 21. Independent GradeBook instances
  test("should keep scores separate between students", () => {
    const firstStudent = new GradeBook(120);
    const secondStudent = new GradeBook(121);

    firstStudent.addScore(90);
    secondStudent.addScore(60);

    expect(firstStudent.scores).toEqual([90]);
    expect(secondStudent.scores).toEqual([60]);

    expect(firstStudent.getAverage()).toBe(90);
    expect(secondStudent.getAverage()).toBe(60);
  });

  // 22. Changes to one instance must not affect another
  test("should not share score state between instances", () => {
    const firstStudent = new GradeBook(122);
    const secondStudent = new GradeBook(123);

    firstStudent.addScore(70);
    firstStudent.addScore(80);

    expect(secondStudent.scores).toEqual([]);
    expect(secondStudent.getHighestScore()).toBeNull();
  });
});
