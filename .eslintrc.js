module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  overrides: [
    {
      files: ["types/src/**/*.ts"],
      parserOptions: {
        project: "./types/tsconfig.json",
        tsconfigRootDir: __dirname,
      },
      settings: {
        "import/resolver": {
          typescript: {
            project: "./types/tsconfig.json",
          },
        },
      },
    },
  ],
  plugins: ["@typescript-eslint/eslint-plugin", "prettier", "sort-class-members", "unused-imports", "import"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:import/typescript",
    "plugin:import/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [
    ".eslintrc.js",
    "dist/",
    "node_modules/",
    "coverage/",
    "prisma/",
    "tests/",
    "non-bll-scripts/",
    "*.js",
    "jest.config.js",
    "setup-husky.js",
    "types/dist/**/*",
  ],
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./tsconfig.json",
      },
    },
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",

    // ✅ Сортировка методов в классах
    "sort-class-members/sort-class-members": [
      "error",
      {
        order: [
          "[static-properties]",
          "[properties]",
          "constructor",
          "[static-methods]",
          "[methods]",
          "[private-methods]",
        ],
        accessorPairPositioning: "getThenSet",
      },
    ],

    // ✅ Убираем ограничения на функции
    "prefer-arrow-callback": "off",
    "func-style": "off",
    "@typescript-eslint/prefer-function-type": "off",

    // ✅ СТРОЖЕ: Неиспользуемые импорты - ERROR
    "unused-imports/no-unused-imports": "error", // ← Изменено на error

    // ✅ СТРОЖЕ: Неиспользуемые переменные - ERROR
    "unused-imports/no-unused-vars": [
      "error", // ← Изменено на error
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],

    // ✅ НОВОЕ: Неиспользуемые методы и функции - WARNING
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: false,
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
        // ✅ Показывать неиспользуемые методы как warning
        caughtErrors: "all",
        caughtErrorsIgnorePattern: "^_",
      },
    ],

    // ✅ НОВОЕ: Обнаружение мертвого кода
    "no-unreachable": "error",
    "no-unused-expressions": "warn",

    // ✅ Остальные правила
    "import/order": "off",
    "import/no-duplicates": "warn",
    "import/no-named-as-default-member": "off",
    "import/export": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/prefer-as-const": "warn",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/prefer-optional-chain": "warn",
    "@typescript-eslint/prefer-nullish-coalescing": "off",

    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
  },
};
