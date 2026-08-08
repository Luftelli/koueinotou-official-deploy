import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

const javascriptFiles = ["**/*.{js,mjs,cjs}"];
const typescriptFiles = ["**/*.{ts,tsx}"];
const reactFiles = ["**/*.{jsx,tsx}"];
const sourceFiles = [...javascriptFiles, ...typescriptFiles];

export default defineConfig([
  globalIgnores([
    ".cache/**",
    ".claude/**",
    "node_modules/**",
    "public/**",
    "temp/**",
    "wt/**",
  ]),
  {
    files: sourceFiles,
    extends: [eslint.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: typescriptFiles,
    extends: [tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/restrict-template-expressions": "off",
    },
  },
  {
    files: reactFiles,
    extends: [
      react.configs.flat.recommended,
      reactHooks.configs.flat.recommended,
      jsxA11y.flatConfigs.recommended,
    ],
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/require-default-props": "off",
    },
  },
  {
    files: sourceFiles,
    extends: [prettier],
  },
]);
