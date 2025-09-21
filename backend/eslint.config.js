// .eslintrc.js
import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      // Incluye variables globales del entorno Node
      globals: { ...globals.node, ...globals.es2021 }
    },
    rules: {
      // reglas básicas que puedes ajustar
      "no-unused-vars": "warn",
      "no-console": "off",
      semi: ["error", "always"],
      //quotes: ["error", "double"]
    }
  }
]);
