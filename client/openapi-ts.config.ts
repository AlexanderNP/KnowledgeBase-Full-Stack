import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "http://localhost:3000/api/swagger/json",
  output: {
    path: "./src/shared/api/generated",
    format: "prettier",
    lint: "eslint",
    tsConfigPath: "./tsconfig.json",
  },
  plugins: ["@hey-api/typescript", "@tanstack/react-query"],
});
