module.exports = {
  root: true,
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    // Базовые правила TypeScript
    "@typescript-eslint/no-explicit-any": "warn",

    // Правила для React/Next.js
    "react/react-in-jsx-scope": "off",

    // Автофикс для форматирования
    "quotes": ["error", "double"],
    "semi": ["error", "always"]
  },
  settings: {
    next: {
      rootDir: "./src"
    }
  }
};
