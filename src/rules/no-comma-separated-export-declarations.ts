/**
 * Linting rule against comma separated export declarations.
 *
 * e.g:
 *
 * ```js
 * export const a = 'a', b = 'b';
 * ```
 */
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { createRule } from "../utils";

export const rule = createRule({
  create(context) {
    return {
      ExportNamedDeclaration(node) {
        if (
          node.declaration?.type === AST_NODE_TYPES.VariableDeclaration &&
          node.declaration.declarations.length > 1
        ) {
          context.report({
            messageId: "noCommaSeparatedExportDeclarations",
            node,
          });
        }
      },
    };
  },
  meta: {
    docs: {
      description: "Avoid comma separated export declarations",
      recommended: true,
      requiresTypeChecking: false,
    },
    messages: {
      noCommaSeparatedExportDeclarations:
        "Do not use comma separated export declarations. Declare on separate lines or export using braces.",
    },
    type: "problem",
    schema: [],
  },
  name: "no-comma-separated-export-declaration",
  defaultOptions: [],
});
