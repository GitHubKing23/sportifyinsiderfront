import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import importPlugin from "eslint-plugin-import"; // ✅ Correctly import ESLint plugins

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      import: importPlugin, // ✅ Properly use "import" plugin
    },
    rules: {
      "import/no-unresolved": "error", // 🔥 Detect incorrect import paths
      "import/order": [
        "warn",
        {
          "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
        },
      ],
      "import/newline-after-import": ["warn", { count: 1 }], // 📏 Improve readability
      "import/no-duplicates": "error", // 🚀 Prevent duplicate imports
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        alias: {
          map: [
            ["@navbar", "./src/modules/navbar"],
            ["@tickets", "./src/modules/tickets"],
          ],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  },
];

export default eslintConfig;
