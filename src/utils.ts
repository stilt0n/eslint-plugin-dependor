import { ESLintUtils } from "@typescript-eslint/utils";

// TODO: figure out what to put here
export interface LintingRuleDocs {
  descriptions: string;
  recommended?: boolean;
  requireTypeChecking?: boolean;
}

export const createRule = ESLintUtils.RuleCreator<LintingRuleDocs>(
  (name) =>
    `https://github.com/stilt0n/eslint-plugin-dependor/tree/master/docs/${name}.md`,
);
