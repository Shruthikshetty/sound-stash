import antfu from "@antfu/eslint-config";
import prettierRecommended from "eslint-plugin-prettier/recommended";

export default antfu(
  {
    type: "app",
    typescript: true,
    formatters: true,
    stylistic: false,
    ignores: ["**/migrations/*", "README.md"],
  },
  prettierRecommended,
  {
    rules: {
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "no-console": ["warn"],
      "antfu/no-top-level-await": ["off"],
      "node/prefer-global/process": ["off"],
      "node/no-process-env": ["error"],
      "perfectionist/sort-imports": [
        "error",
        {
          tsconfigRootDir: ".",
        },
      ],
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
          ignore: ["README.md"],
        },
      ],
    },
  },
);
