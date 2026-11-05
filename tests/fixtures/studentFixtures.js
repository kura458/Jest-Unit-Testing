
export function createStudentFixture(overrides = {}) {
  return {
    id: 1,
    name: "Sara",
    age: 20,
    email: "sara@example.com",
    ...overrides
  };
}
