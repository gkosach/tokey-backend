module.exports = {
  root: true,
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import"],
  rules: {
    "arrow-body-style": ["error", "always"],
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "react/react-in-jsx-scope": "off",
    quotes: ["error", "double"],
    semi: ["error", "always"],
  },
  settings: {
    next: {
      rootDir: "./src",
    },
    // "import/resolver": {
    //   alias: {
    //     map: [["@", "./src"]],
    //     extensions: [".js", ".ts", ".tsx"],
    //   },
    // },
  },
};
