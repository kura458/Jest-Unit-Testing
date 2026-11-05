import { jest } from "@jest/globals";
import { StudentRepository } from "../../src/studentRepository.js";
import { createStudentFixture } from "../fixtures/studentFixtures.js";

let repository;

// Give every test a fresh repository.
beforeEach(() => {
  repository = new StudentRepository();
});

// Restore spies and mocks after each test.
afterEach(() => {
  jest.restoreAllMocks();
});

describe("StudentRepository", () => {
  describe("add()", () => {
    test("adds and returns a student", () => {
      const student = createStudentFixture();

      const result = repository.add(student);

      expect(result).toBe(student);
      expect(repository.count()).toBe(1);
    });

    test("rejects duplicate student IDs", () => {
      const firstStudent = createStudentFixture({ id: 1 });
      const duplicateStudent = createStudentFixture({
        id: 1,
        name: "Marta"
      });

      repository.add(firstStudent);

      expect(() => {
        repository.add(duplicateStudent);
      }).toThrow("Student ID already exists");

      expect(repository.count()).toBe(1);
    });

    test("allows students with different IDs", () => {
      repository.add(createStudentFixture({ id: 1 }));
      repository.add(createStudentFixture({ id: 2 }));

      expect(repository.count()).toBe(2);
    });
  });

  describe("findById()", () => {
    test("finds a student using the student ID", () => {
      const student = createStudentFixture({ id: 10 });
      repository.add(student);

      expect(repository.findById(10)).toBe(student);
    });

    test("returns undefined when the student does not exist", () => {
      expect(repository.findById(999)).toBeUndefined();
    });
  });

  describe("remove()", () => {
    test("removes a student using the student ID", () => {
      repository.add(createStudentFixture({ id: 1 }));
      repository.add(createStudentFixture({ id: 2 }));

      repository.remove(1);

      expect(repository.findById(1)).toBeUndefined();
      expect(repository.count()).toBe(1);
    });

    test("does not remove students with different IDs", () => {
      const student = createStudentFixture({ id: 2 });
      repository.add(student);

      repository.remove(999);

      expect(repository.findById(2)).toBe(student);
      expect(repository.count()).toBe(1);
    });
  });

  describe("count()", () => {
    test("starts with zero students", () => {
      expect(repository.count()).toBe(0);
    });

    test("returns the number of stored students", () => {
      repository.add(createStudentFixture({ id: 1 }));
      repository.add(createStudentFixture({ id: 2 }));
      repository.add(createStudentFixture({ id: 3 }));

      expect(repository.count()).toBe(3);
    });
  });

  describe("test isolation and spy cleanup", () => {
    test("can spy on the count method", () => {
      const countSpy = jest.spyOn(repository, "count");

      repository.count();

      expect(countSpy).toHaveBeenCalledTimes(1);
    });

    test("starts with a normal count method", () => {
      expect(jest.isMockFunction(repository.count)).toBe(false);
      expect(repository.count()).toBe(0);
    });
  });
});