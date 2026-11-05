export default {
  testRunner: "jest",
  testRunnerNodeArgs: ["--experimental-vm-modules"],
  reporters: ["clear-text", "html"],
  coverageAnalysis: "perTest",

  // Q14: Mutate only the payment module.
  mutate: ["src/payment.js"],

  jest: {
    projectType: "custom",
    configFile: "jest.config.js"
  }
};