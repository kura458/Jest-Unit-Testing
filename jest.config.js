export default {
  testEnvironment: "node",
  transform: {},
  coverageProvider: "v8",

  testPathIgnorePatterns: [
    "/node_modules/",
    "/Q2-Submission/",
    "<rootDir>/stryker-tmp/",
    "<rootDir>/reports/"
  ],

  modulePathIgnorePatterns: [
    "<rootDir>/stryker-tmp/"
  ],

  collectCoverageFrom: ["src/**/*.js"],
  coverageReporters: ["text", "html", "lcov"],

  coverageThreshold: {
    global: {
      statements: 90,
      branches: 85,
      functions: 90,
      lines: 90
    }
  }
};
