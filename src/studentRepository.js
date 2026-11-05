
export class StudentRepository {
  constructor() {
    this.students = [];
  }

  add(student) {
    const duplicate = this.students.some(
      existingStudent => existingStudent.id === student.id
    );

    if (duplicate) {
      throw new Error("Student ID already exists");
    }

    this.students.push(student);
    return student;
  }

  findById(id) {
    return this.students.find(student => student.id === id);
  }

  remove(id) {
    this.students = this.students.filter(
      student => student.id !== id
    );
  }

  count() {
    return this.students.length;
  }
}
