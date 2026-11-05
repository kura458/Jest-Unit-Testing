
import { registerStudent } from "../../src/registration.js";

describe("Student Registration Tests", () => {

  // 1. Valid registration
  test("should register a valid student", () => {
    const student = {
      id: 1,
      name: "Abebe Kebede",
      age: 22,
      email: "abebe@example.com"
    };

    expect(registerStudent(student)).toEqual({
      id: 1,
      name: "Abebe Kebede",
      age: 22,
      email: "abebe@example.com",
      status: "Registered"
    });
  });

  // 2. Age below minimum
  test("should reject a student aged 17", () => {
    const student = {
      id: 2,
      name: "Abebe",
      age: 17,
      email: "abebe@example.com"
    };

    expect(() => registerStudent(student))
      .toThrow("Student must be at least 18");
  });

  // 3. Minimum valid age
  test("should accept age 18", () => {
    const student = {
      id: 3,
      name: "Abebe",
      age: 18,
      email: "abebe@example.com"
    };

    expect(registerStudent(student).age).toBe(18);
  });

  // 4. Maximum valid age
  test("should accept age 120", () => {
    const student = {
      id: 4,
      name: "Abebe",
      age: 120,
      email: "abebe@example.com"
    };

    expect(registerStudent(student).age).toBe(120);
  });

  // 5. Age above maximum
  test("should reject age 121", () => {
    const student = {
      id: 5,
      name: "Abebe",
      age: 121,
      email: "abebe@example.com"
    };

    expect(() => registerStudent(student))
      .toThrow("Age must be an integer between 18 and 120");
  });

  // 6. Blank name
  test("should reject a blank name", () => {
    const student = {
      id: 6,
      name: "   ",
      age: 22,
      email: "abebe@example.com"
    };

    expect(() => registerStudent(student))
      .toThrow("Student name is required");
  });

  // 7. Malformed email
  test("should reject an invalid email", () => {
    const student = {
      id: 7,
      name: "Abebe",
      age: 22,
      email: "invalid-email"
    };

    expect(() => registerStudent(student))
      .toThrow("Invalid email");
  });

  // 8. Missing ID
  test("should reject a missing ID", () => {
    const student = {
      name: "Abebe",
      age: 22,
      email: "abebe@example.com"
    };

    expect(() => registerStudent(student))
      .toThrow("ID must be a positive safe integer");
  });

  // 9. Invalid ID
  test("should reject ID zero", () => {
    const student = {
      id: 0,
      name: "Abebe",
      age: 22,
      email: "abebe@example.com"
    };

    expect(() => registerStudent(student))
      .toThrow("ID must be a positive safe integer");
  });

  // 10. Unsafe ID
  test("should reject an unsafe integer ID", () => {
    const student = {
      id: Number.MAX_SAFE_INTEGER + 1,
      name: "Abebe",
      age: 22,
      email: "abebe@example.com"
    };

    expect(() => registerStudent(student))
      .toThrow("ID must be a positive safe integer");
  });

  // 11. Missing name
  test("should reject a missing name", () => {
    const student = {
      id: 11,
      age: 22,
      email: "abebe@example.com"
    };

    expect(() => registerStudent(student))
      .toThrow("Student name is required");
  });

  // 12. Incorrect name type
  test("should reject a numeric name", () => {
    const student = {
      id: 12,
      name: 123,
      age: 22,
      email: "abebe@example.com"
    };

    expect(() => registerStudent(student))
      .toThrow("Student name must be a string");
  });

  // 13. Non-integer age
  test("should reject a decimal age", () => {
    const student = {
      id: 13,
      name: "Abebe",
      age: 18.5,
      email: "abebe@example.com"
    };

    expect(() => registerStudent(student))
      .toThrow("Age must be an integer between 18 and 120");
  });

  // 14. Incorrect email type
  test("should reject a numeric email", () => {
    const student = {
      id: 14,
      name: "Abebe",
      age: 22,
      email: 12345
    };

    expect(() => registerStudent(student))
      .toThrow("Email must be a string");
  });

  // 15. Input immutability
  test("should not modify the original student object", () => {
    const student = {
      id: 15,
      name: "  Abebe Kebede  ",
      age: 22,
      email: "ABEBE@EXAMPLE.COM"
    };

    const originalStudent = structuredClone(student);

    registerStudent(student);

    expect(student).toEqual(originalStudent);
  });

});

// Demonstrating toEqual() and toStrictEqual()
describe("Jest Equality Matchers", () => {

  test("toEqual compares nested object values", () => {
    const actual = {
      student: {
        name: "Abebe",
        age: 22
      }
    };

    const expected = {
      student: {
        name: "Abebe",
        age: 22
      }
    };

    expect(actual).toEqual(expected);
  });

  test("toStrictEqual detects missing undefined properties", () => {
    const actual = {
      student: {
        name: "Abebe"
      }
    };

    const expected = {
      student: {
        name: "Abebe",
        email: undefined
      }
    };

    expect(actual).toEqual(expected);

    expect(() => {
      expect(actual).toStrictEqual(expected);
    }).toThrow();
  });

});
