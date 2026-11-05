export default {
  testEnvironment: "node",
  transform: {},
  coverageProvider: "v8",

  testPathIgnorePatterns: [
    "/node_modules/",
    "/Q2-Submission/"
  ],

  collectCoverageFrom: ["src/**/*.js"],
  coverageReporters: ["text", "html", "lcov"]
};