// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html


module.exports = /** @type {Partial<import("@jest/types").Config.DefaultOptions>} */ ({
  clearMocks: true,
  preset: "./jest-preset",
  testTimeout: 10000,
  testEnvironment: "node",
});
