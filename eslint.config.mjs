import eslint from "@eslint/js";
import eslintPlugin from "eslint-plugin-eslint-plugin";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  eslint.configs.recommended,
  ...tseslint.conifgs.recommendedTypeChecked,
  eslintPlugin.configs["flat/recommended"],
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.config.*"],
          defaultProject: "tsconfig.json",
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
