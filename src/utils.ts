import { ESLintUtils } from "@typescript-eslint/utils";

// TODO: figure ou twhat to put here
export interface LintingRuleDocs {}

export const createRule = ESLintUtils.RuleCreator<LintingRuleDocs>(
  (name) =>
    `https://github.com/stilt0n/eslint-plugin-dependor/tree/master/docs/${name}.md`,
);
