
export class EnrollmentManager {
  constructor(notifier) {
    this.enrollments = [];
    this.notifier = notifier;
  }

  enroll(studentId, courseId) {
    // Prevent duplicate enrollment for the same student and course.
    const alreadyEnrolled = this.enrollments.some(
      enrollment =>
        enrollment.studentId === studentId &&
        enrollment.courseId === courseId
    );

    if (alreadyEnrolled) {
      throw new Error("Student is already enrolled in this course");
    }

    const record = { studentId, courseId };

    // Add the enrollment before sending the notification.
    this.enrollments.push(record);

    try {
      this.notifier.send(
        studentId,
        `Enrolled in course ${courseId}`
      );
    } catch (error) {
      // Roll back the enrollment if notification fails.
      this.enrollments.pop();
      throw error;
    }

    // Return a copy to protect the internal record.
    return { ...record };
  }

  getEnrollments(studentId) {
    return this.enrollments
      .filter(enrollment => enrollment.studentId === studentId)
      .map(enrollment => ({ ...enrollment }));
  }

  unenroll(studentId, courseId) {
    const enrollmentIndex = this.enrollments.findIndex(
      enrollment =>
        enrollment.studentId === studentId &&
        enrollment.courseId === courseId
    );

    if (enrollmentIndex === -1) {
      return false;
    }

    this.enrollments.splice(enrollmentIndex, 1);

    return true;
  }
}
