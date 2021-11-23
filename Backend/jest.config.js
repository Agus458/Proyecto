/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  clearMocks: true,
  maxWorkers: 1,
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules",
    "<rootDir>/dist",
    "<rootDir>/test/helpers"
  ]
};
