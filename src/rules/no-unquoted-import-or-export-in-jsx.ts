import { createRule } from '../utils';

export const rule = createRule({
  create(context) {
    return {
      JSXText(node) {
        if (/import|export/.test(node.value)) {
          context.report({
            messageId: 'noUnquotedImportOrExportInJsx',
            node,
          });
        }
      },
    };
  },
  meta: {
    docs: {
      description: 'Avoid unquoted import or export keywords in JSX',
      recommended: true,
      requiresTypeChecking: false,
    },
    messages: {
      noUnquotedImportOrExportInJsx:
        'Do not use import or export keywords without quotes in JSX',
    },
    type: 'problem',
    schema: [],
  },
  name: 'no-unquoted-import-or-export-in-jsx',
  defaultOptions: [],
});
