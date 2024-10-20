import path from 'node:path';
import tseslint from 'typescript-eslint';
import { RuleTester } from '@typescript-eslint/rule-tester';
import * as vitest from 'vitest';
import { rule } from '../src/rules/no-unquoted-import-or-export-in-jsx';

RuleTester.afterAll = vitest.afterAll;
RuleTester.it = vitest.it;
RuleTester.itOnly = vitest.it.only;
RuleTester.describe = vitest.describe;

const ruleTest = new RuleTester({
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2020,
      projectService: {
        allowDefaultProject: ['*.ts*'],
        defaultProject: 'tsconfig.json',
      },
      tsconfigRootDif: path.join(__dirname, '..'),
    },
  },
});

ruleTest.run('no-unquoted-import-or-export-in-jsx', rule, {
  valid: [
    `<p>This is some text without problems</p>`,
    `<Display text="export" />`,
    `<div>{"you can use export and import in quotes"}</div>`,
    `const foo = 'import';`,
    `<span>Using importing or exporting is okay</span>`,
  ],
  invalid: [
    {
      code: `<p>You can not use unquoted import or export in jsx</p>`,
      errors: [
        {
          column: 4,
          endColumn: 52,
          line: 1,
          endLine: 1,
          messageId: 'noUnquotedImportOrExportInJsx',
        },
      ],
    },
    {
      code: `<p>import</p>`,
      errors: [
        {
          column: 4,
          endColumn: 4 + 'import'.length,
          line: 1,
          endLine: 1,
          messageId: 'noUnquotedImportOrExportInJsx',
        },
      ],
    },
  ],
});
