module.exports = {
  moduleFileExtensions: ["ts", "js"],
  rootDir: ".",
  verbose: true,
  preset: "ts-jest",
  clearMocks: true,

  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.test.json",
        diagnostics: true,
      },
    ],
  },

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@tests/(.*)$": "<rootDir>/tests/$1",
    "^src/(.*)$": "<rootDir>/src/$1",
  },

  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.spec.ts",
    "!src/**/*.test.ts",
    "!src/**/index.ts",
    "!src/index.ts",
    "!src/**/*.d.ts",
    "!src/**/types/**",
    "!src/**/interfaces/**",
  ],

  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "json-summary", "html"],

  coverageThreshold: {
    global: {
      branches: 5,
      functions: 5,
      lines: 5,
      statements: 5,
    },
  },

  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup/jest-setup.ts"],
  testEnvironment: "node",
  testTimeout: 30000,
  maxWorkers: 2,
  testMatch: ["<rootDir>/tests/**/*.test.ts", "<rootDir>/tests/**/*.spec.ts"],
  resetMocks: true,
  restoreMocks: true,
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/tests/integration/"],
};
