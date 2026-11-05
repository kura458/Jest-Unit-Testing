
export const scholarshipCases = [
  // Full Scholarship
  {
    description: "awards full scholarship to a highly qualified student",
    student: { average: 95, attendance: 97, credits: 18, disciplinaryAction: false },
    expected: "Full Scholarship"
  },
  {
    description: "awards full scholarship at all exact full thresholds",
    student: { average: 90, attendance: 95, credits: 15, disciplinaryAction: false },
    expected: "Full Scholarship"
  },
  {
    description: "awards full scholarship above all full thresholds",
    student: { average: 100, attendance: 100, credits: 20, disciplinaryAction: false },
    expected: "Full Scholarship"
  },
  {
    description: "awards full scholarship when average is exactly 90",
    student: { average: 90, attendance: 98, credits: 18, disciplinaryAction: false },
    expected: "Full Scholarship"
  },
  {
    description: "awards full scholarship when attendance is exactly 95",
    student: { average: 96, attendance: 95, credits: 18, disciplinaryAction: false },
    expected: "Full Scholarship"
  },
  {
    description: "awards full scholarship when credits are exactly 15",
    student: { average: 96, attendance: 98, credits: 15, disciplinaryAction: false },
    expected: "Full Scholarship"
  },

  // Partial Scholarship
  {
    description: "awards partial scholarship at all exact partial thresholds",
    student: { average: 80, attendance: 85, credits: 12, disciplinaryAction: false },
    expected: "Partial Scholarship"
  },
  {
    description: "awards partial scholarship below full average threshold",
    student: { average: 89, attendance: 95, credits: 15, disciplinaryAction: false },
    expected: "Partial Scholarship"
  },
  {
    description: "awards partial scholarship below full attendance threshold",
    student: { average: 95, attendance: 94, credits: 15, disciplinaryAction: false },
    expected: "Partial Scholarship"
  },
  {
    description: "awards partial scholarship below full credit threshold",
    student: { average: 95, attendance: 95, credits: 14, disciplinaryAction: false },
    expected: "Partial Scholarship"
  },
  {
    description: "awards partial scholarship when average is exactly 80",
    student: { average: 80, attendance: 90, credits: 15, disciplinaryAction: false },
    expected: "Partial Scholarship"
  },
  {
    description: "awards partial scholarship when attendance is exactly 85",
    student: { average: 85, attendance: 85, credits: 15, disciplinaryAction: false },
    expected: "Partial Scholarship"
  },
  {
    description: "awards partial scholarship when credits are exactly 12",
    student: { average: 85, attendance: 90, credits: 12, disciplinaryAction: false },
    expected: "Partial Scholarship"
  },

  // Single-condition failures for partial eligibility
  {
    description: "rejects when average is just below 80",
    student: { average: 79, attendance: 85, credits: 12, disciplinaryAction: false },
    expected: "Not Eligible"
  },
  {
    description: "rejects when attendance is just below 85",
    student: { average: 80, attendance: 84, credits: 12, disciplinaryAction: false },
    expected: "Not Eligible"
  },
  {
    description: "rejects when credits are just below 12",
    student: { average: 80, attendance: 85, credits: 11, disciplinaryAction: false },
    expected: "Not Eligible"
  },

  // Disciplinary rejection
  {
    description: "rejects an otherwise full-eligible student with disciplinary action",
    student: { average: 95, attendance: 98, credits: 18, disciplinaryAction: true },
    expected: "Rejected"
  },
  {
    description: "rejects an otherwise partial-eligible student with disciplinary action",
    student: { average: 85, attendance: 90, credits: 12, disciplinaryAction: true },
    expected: "Rejected"
  },
  {
    description: "rejects a student with disciplinary action despite maximum scores",
    student: { average: 100, attendance: 100, credits: 20, disciplinaryAction: true },
    expected: "Rejected"
  },

  // Additional combinations
  {
    description: "does not award a scholarship when all academic values are below partial thresholds",
    student: { average: 70, attendance: 75, credits: 10, disciplinaryAction: false },
    expected: "Not Eligible"
  },
  {
    description: "awards partial scholarship when only the average misses the full threshold",
    student: { average: 89, attendance: 99, credits: 20, disciplinaryAction: false },
    expected: "Partial Scholarship"
  },
  {
    description: "awards partial scholarship when only attendance misses the full threshold",
    student: { average: 99, attendance: 94, credits: 20, disciplinaryAction: false },
    expected: "Partial Scholarship"
  },
  {
    description: "awards partial scholarship when only credits miss the full threshold",
    student: { average: 99, attendance: 99, credits: 14, disciplinaryAction: false },
    expected: "Partial Scholarship"
  }
];
