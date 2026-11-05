
import { describe, test, expect } from "@jest/globals";
import { evaluateAdmission } from "../../src/admission.js";

describe("Admission evaluation - decision and boundary tests", () => {
  test.each([
    {
      id: "A01",
      description: "rejects applicants younger than 18",
      applicant: {
        age: 17,
        score: 95,
        hasCertificate: true,
        applicationFeePaid: true,
        isInternational: false,
      },
      expected: { status: "Rejected", reason: "Underage" },
    },
    {
      id: "A02",
      description: "accepts the minimum eligible age of 18",
      applicant: {
        age: 18,
        score: 80,
        hasCertificate: true,
        applicationFeePaid: true,
        isInternational: false,
      },
      expected: { status: "Accepted", scholarship: false },
    },
    {
      id: "A03",
      description: "rejects applicants scoring below 60",
      applicant: {
        age: 20,
        score: 59,
        hasCertificate: true,
        applicationFeePaid: true,
        isInternational: false,
      },
      expected: { status: "Rejected", reason: "Low Score" },
    },
    {
      id: "A04",
      description: "accepts the minimum eligible score of 60",
      applicant: {
        age: 20,
        score: 60,
        hasCertificate: true,
        applicationFeePaid: true,
        isInternational: false,
      },
      expected: { status: "Accepted", scholarship: false },
    },
    {
      id: "A05",
      description: "places applicants without certificates on pending status",
      applicant: {
        age: 20,
        score: 80,
        hasCertificate: false,
        applicationFeePaid: true,
        isInternational: false,
      },
      expected: { status: "Pending", reason: "Missing Certificate" },
    },
    {
      id: "A06",
      description: "places applicants with unpaid fees on pending status",
      applicant: {
        age: 20,
        score: 80,
        hasCertificate: true,
        applicationFeePaid: false,
        isInternational: false,
      },
      expected: { status: "Pending", reason: "Payment Required" },
    },
    {
      id: "A07",
      description: "places international applicants scoring below 75 on review",
      applicant: {
        age: 20,
        score: 74,
        hasCertificate: true,
        applicationFeePaid: true,
        isInternational: true,
      },
      expected: { status: "Pending", reason: "International Review" },
    },
    {
      id: "A08",
      description: "accepts international applicants scoring exactly 75",
      applicant: {
        age: 20,
        score: 75,
        hasCertificate: true,
        applicationFeePaid: true,
        isInternational: true,
      },
      expected: { status: "Accepted", scholarship: false },
    },
    {
      id: "A09",
      description: "accepts international applicants scoring 89 without scholarship",
      applicant: {
        age: 20,
        score: 89,
        hasCertificate: true,
        applicationFeePaid: true,
        isInternational: true,
      },
      expected: { status: "Accepted", scholarship: false },
    },
    {
      id: "A10",
      description: "awards a scholarship for a score of exactly 90",
      applicant: {
        age: 20,
        score: 90,
        hasCertificate: true,
        applicationFeePaid: true,
        isInternational: false,
      },
      expected: { status: "Accepted", scholarship: true },
    },
    {
      id: "A11",
      description: "awards a scholarship for scores above 90",
      applicant: {
        age: 20,
        score: 100,
        hasCertificate: true,
        applicationFeePaid: true,
        isInternational: false,
      },
      expected: { status: "Accepted", scholarship: true },
    },
    {
      id: "A12",
      description: "accepts domestic applicants scoring 89 without scholarship",
      applicant: {
        age: 20,
        score: 89,
        hasCertificate: true,
        applicationFeePaid: true,
        isInternational: false,
      },
      expected: { status: "Accepted", scholarship: false },
    },
  ])("$id: $description", ({ applicant, expected }) => {
    expect(evaluateAdmission(applicant)).toEqual(expected);
  });
});
