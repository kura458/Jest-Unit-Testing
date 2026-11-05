export default {
  testRunner: "jest",
  testRunnerNodeArgs: ["--experimental-vm-modules"],
  reporters: ["clear-text", "html", "json"],
  coverageAnalysis: "perTest",
  tempDirName: "stryker-tmp",

  // Q12 & Q14: Mutation testing targets
  mutate: ["src/scholarship.js", "src/payment.js"],

  jest: {
    projectType: "custom",
    configFile: "jest.config.js"
  }
};
