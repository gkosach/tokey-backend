module.exports = {
  moduleFileExtensions: ["ts", "js"],
  rootDir: ".",
  verbose: true,
  testEnvironment: "node",
  preset: "ts-jest",
  testTimeout: 30000,
  clearMocks: true,

  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: {
          module: "commonjs",
          target: "es2020",
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          experimentalDecorators: true,
          emitDecoratorMetadata: true,
        },
      },
    ],
  },

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@tests/(.*)$": "<rootDir>/tests/$1",
    "^src/(.*)$": "<rootDir>/src/$1",
  },

  collectCoverageFrom: ["src/**/*.ts", "!src/**/*.spec.ts", "!src/**/*.test.ts", "!src/**/index.ts", "!src/index.ts"],

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
  setupFiles: ["<rootDir>/tests/setup/jest-setup.ts"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts$",
};
