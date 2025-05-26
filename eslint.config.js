const tsParser = require("@typescript-eslint/parser");
const importPlugin = require("eslint-plugin-import");
const prettierPlugin = require("eslint-plugin-prettier");
const unusedImportsPlugin = require("eslint-plugin-unused-imports");
const typescriptEslintPlugin = require("@typescript-eslint/eslint-plugin");

module.exports = [
  {
    ignores: ["src/main.ts", "dist/**/*", "coverage/**/*", "test/**/*", ".githooks"],
  },
  {
    files: ["**/*.ts", "**/*.js"],
    plugins: {
      import: importPlugin,
    },
    rules: importPlugin.configs.recommended.rules,
  },
  {
    files: ["**/*.js"],
  },
  {
    files: ["**/*.{ts,js,html}"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: prettierPlugin.configs.recommended.rules,
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
        ecmaVersion: "latest",
        tsconfigRootDir: "./",
      },
      globals: {
        window: "readonly",
        document: "readonly",
        process: "readonly",
        module: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
      "unused-imports": unusedImportsPlugin,
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": ["error", { allowTypedFunctionExpressions: true }],
      "no-useless-constructor": "off",
      "arrow-body-style": ["error", "always"],
      "@typescript-eslint/no-useless-constructor": ["error"],
      "import/no-unresolved": "off",
      "@typescript-eslint/no-throw-literal": "off",
      "import/prefer-default-export": "off",
      "class-methods-use-this": "off",
      // "no-console": ["error", { allow: ["error"] }],
      "max-len": "off",
      "@typescript-eslint/lines-between-class-members": "off",
      "lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "all",
          argsIgnorePattern: "^_",
        },
      ],
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
      "import/default": "off",
      "import/no-named-as-default": "off",
      "import/no-named-as-default-member": "off",
      "import/namespace": "off",
    },
  },
];
