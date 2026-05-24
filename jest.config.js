/** @type {import('jest').Config} */
const BABEL = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
};

module.exports = {
  testEnvironment: 'node',
  transform: { '^.+\\.jsx?$': ['babel-jest', BABEL] },
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
  transformIgnorePatterns: ['node_modules/'],
  verbose: true,

  projects: [
    {
      displayName: 'unit+integration',
      testEnvironment: 'node',
      transform: { '^.+\\.jsx?$': ['babel-jest', BABEL] },
      moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
      transformIgnorePatterns: ['node_modules/'],
      setupFiles: ['<rootDir>/src/__tests__/env-setup.js'],
      testMatch: [
        '<rootDir>/src/__tests__/unit/**/*.test.js',
        '<rootDir>/src/__tests__/integration/**/*.test.js',
      ],
      testTimeout: 30000,
    },
    {
      displayName: 'e2e',
      testEnvironment: 'node',
      transform: { '^.+\\.jsx?$': ['babel-jest', BABEL] },
      moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
      transformIgnorePatterns: ['node_modules/'],
      globalSetup: '<rootDir>/src/__tests__/e2e/global-setup.js',
      globalTeardown: '<rootDir>/src/__tests__/e2e/global-teardown.js',
      testMatch: ['<rootDir>/src/__tests__/e2e/**/*.test.js'],
      testTimeout: 60000,
    },
  ],
};
