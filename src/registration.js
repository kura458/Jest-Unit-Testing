
export function registerStudent(student) {
  // Validate the student object
  if (
    student === null ||
    typeof student !== "object" ||
    Array.isArray(student)
  ) {
    throw new TypeError("Student must be an object");
  }

  // Validate student ID
  if (
    !Number.isSafeInteger(student.id) ||
    student.id <= 0
  ) {
    throw new Error("ID must be a positive safe integer");
  }

  // Validate student name
  if (student.name === undefined || student.name === null) {
    throw new Error("Student name is required");
  }

  if (typeof student.name !== "string") {
    throw new Error("Student name must be a string");
  }

  if (student.name.trim() === "") {
    throw new Error("Student name is required");
  }

  // Validate age
  if (
    !Number.isInteger(student.age) ||
    student.age < 18 ||
    student.age > 120
  ) {
    if (student.age < 18) {
      throw new Error("Student must be at least 18");
    }

    throw new Error("Age must be an integer between 18 and 120");
  }

  // Validate email
  if (typeof student.email !== "string") {
    throw new Error("Email must be a string");
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(student.email)) {
    throw new Error("Invalid email");
  }

  // Return registered student without modifying input
  return {
    id: student.id,
    name: student.name.trim(),
    age: student.age,
    email: student.email.toLowerCase(),
    status: "Registered"
  };
}
