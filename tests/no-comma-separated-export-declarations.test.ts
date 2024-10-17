import path from "node:path";
import tseslint from "typescript-eslint";
import { RuleTester } from "@typescript-eslint/rule-tester";
import * as vitest from "vitest";
import { rule } from "../src/rules/no-comma-separated-export-declarations";

RuleTester.afterAll = vitest.afterAll;
RuleTester.it = vitest.it;
RuleTester.itOnly = vitest.it.only;
RuleTester.describe = vitest.describe;

const ruleTester = new RuleTester({
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      projectService: {
        allowDefaultProject: ["*.ts*"],
        defaultProject: "tsconfig.json",
      },
      tsconfigRootDir: path.join(__dirname, ".."),
    },
  },
});

ruleTester.run("no-comma-separated-export-declarations", rule, {
  valid: [
    `export const a = "a";`,
    [
      `export const b = () => {`,
      `  const c = "c", d = "d";`,
      `  return { b: "b", c, d };`,
      `};`,
    ].join("\n"),
    `const one = 1, two = 2;`,
    `export { one, two };`,
  ],
  invalid: [
    {
      code: `export const a = 'a', b = 'b';`,
      errors: [
        {
          column: 1,
          endColumn: 31,
          line: 1,
          endLine: 1,
          messageId: "noCommaSeparatedExportDeclarations",
        },
      ],
    },
  ],
});
