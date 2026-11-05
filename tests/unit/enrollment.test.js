
import { jest } from "@jest/globals";
import { EnrollmentManager } from "../../src/enrollment.js";

describe("EnrollmentManager", () => {
  let notifier;
  let manager;

  beforeEach(() => {
    notifier = {
      send: jest.fn()
    };

    manager = new EnrollmentManager(notifier);
  });

  describe("enroll()", () => {
    test("should create and return an enrollment record", () => {
      const result = manager.enroll(101, "SE101");

      expect(result).toEqual({
        studentId: 101,
        courseId: "SE101"
      });

      expect(manager.getEnrollments(101)).toEqual([
        {
          studentId: 101,
          courseId: "SE101"
        }
      ]);
    });

    test("should notify the student with the correct message", () => {
      manager.enroll(101, "SE101");

      expect(notifier.send).toHaveBeenCalledTimes(1);
      expect(notifier.send).toHaveBeenCalledWith(
        101,
        "Enrolled in course SE101"
      );
    });

    test("should reject duplicate enrollment", () => {
      manager.enroll(101, "SE101");

      expect(() => manager.enroll(101, "SE101"))
        .toThrow("Student is already enrolled in this course");

      expect(manager.getEnrollments(101)).toHaveLength(1);
      expect(notifier.send).toHaveBeenCalledTimes(1);
    });

    test("should allow different students to enroll in the same course", () => {
      manager.enroll(101, "SE101");
      manager.enroll(102, "SE101");

      expect(manager.getEnrollments(101)).toHaveLength(1);
      expect(manager.getEnrollments(102)).toHaveLength(1);
      expect(notifier.send).toHaveBeenCalledTimes(2);
    });

    test("should roll back enrollment when notification fails", () => {
      const notificationError = new Error("Notification failed");

      notifier.send.mockImplementation(() => {
        throw notificationError;
      });

      expect(() => manager.enroll(101, "SE101"))
        .toThrow("Notification failed");

      expect(manager.getEnrollments(101)).toEqual([]);
    });

   test("should rethrow the original notification error", () => {
  const notificationError = new Error("Notification failed");

  notifier.send.mockImplementation(() => {
    throw notificationError;
  });

  expect.assertions(1);

  try {
    manager.enroll(101, "SE101");
  } catch (error) {
    expect(error).toBe(notificationError);
  }
});

    test("should not share enrollment state between instances", () => {
      manager.enroll(101, "SE101");

      const anotherManager = new EnrollmentManager({
        send: jest.fn()
      });

      expect(anotherManager.getEnrollments(101)).toEqual([]);
    });
  });

  describe("getEnrollments()", () => {
    test("should return only enrollments for the requested student", () => {
      manager.enroll(101, "SE101");
      manager.enroll(101, "SE102");
      manager.enroll(102, "SE101");

      expect(manager.getEnrollments(101)).toEqual([
        { studentId: 101, courseId: "SE101" },
        { studentId: 101, courseId: "SE102" }
      ]);
    });

    test("should return defensive copies of enrollment records", () => {
      manager.enroll(101, "SE101");

      const enrollments = manager.getEnrollments(101);
      enrollments[0].courseId = "CHANGED";

      expect(manager.getEnrollments(101)).toEqual([
        { studentId: 101, courseId: "SE101" }
      ]);
    });

    test("should return a new array that cannot modify internal state", () => {
      manager.enroll(101, "SE101");

      const enrollments = manager.getEnrollments(101);
      enrollments.push({
        studentId: 101,
        courseId: "SE102"
      });

      expect(manager.getEnrollments(101)).toHaveLength(1);
    });
  });

  describe("unenroll()", () => {
    test("should remove an existing enrollment and return true", () => {
      manager.enroll(101, "SE101");

      expect(manager.unenroll(101, "SE101")).toBe(true);
      expect(manager.getEnrollments(101)).toEqual([]);
    });

    test("should return false when the enrollment does not exist", () => {
      expect(manager.unenroll(101, "SE101")).toBe(false);
    });

    test("should not remove another student's enrollment", () => {
      manager.enroll(101, "SE101");
      manager.enroll(102, "SE101");

      expect(manager.unenroll(101, "SE101")).toBe(true);

      expect(manager.getEnrollments(102)).toEqual([
        { studentId: 102, courseId: "SE101" }
      ]);
    });
  });
});
