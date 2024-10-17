import { ESLintUtils } from "@typescript-eslint/utils";

// TODO: figure out what to put here
export interface LintingRuleDocs {
  description: string;
  recommended?: boolean;
  requiresTypeChecking?: boolean;
}

export const createRule = ESLintUtils.RuleCreator<LintingRuleDocs>(
  (name) =>
    `https://github.com/stilt0n/eslint-plugin-dependor/tree/master/docs/${name}.md`,
);
