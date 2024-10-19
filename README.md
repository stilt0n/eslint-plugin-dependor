# eslint-plugin-dependor

This is an eslint plugin for [dependor](https://github.com/stilt0n/dependor).

## Why?

[Dependor](https://github.com/stilt0n/dependor) is a dependency parser for TypeScript/JavaScript. It parses a repository into an graph data structure that shows the import/export relationships between files.

Rather than write a full parser for JavaScript/TypeScript, I opted to only parse a subset of the languages. For the most part, this is all that is necessary, but there is one corner case where it becomes impossible to parse imports/exports without implementing expression parsing (which is either most or all of the language). This eslint-plugin lints for that case to ensure a repository is compatible with dependor.

## Linting Rules

### No comma separated export declarations

Dependor can not handle exports that look like this:

```js
export const a = 'a',
  b = 'b';
```

This statement can be refactored to be dependor-compatible in one of two ways:

```js
// option 1
export const a = 'a';
export const b = 'b';

// options 2
const a = 'a',
  b = 'b';
export { a, b };
```

#### Why can't dependor handle this case?

Typically dependor can take advantage of the fact that it does not need to know _what your export does_, it only needs to know _what your export is named_. This allows me to greatly simplify export parsing by using the "=" character as a stop character.

Comma separated export declarations do not work with this trick, and I am unable to use commas as a stop character because the right-hand side of a variable declaration can be any arbitrary JavaScript expression. Parsing Expressions involves parsing all (or maybe the vast majority) of JavaScript.

Since this is easy to refactor and I don't usually see people do this I consider it a technical limitation of dependor and have this linting rule to help ensure projects that would like to use dependor are compatible.

### No unquoted import or export in JSX

Dependor confuses import and export when used inside of JSX as keywords:

```jsx
<p>
  dependor will think that this use of import is a JavaScript keyword rather
  than JSX text
</p>
```

This can be refactored to be dependor-compatible by escaping "import" and "export" with quotes:

```jsx
<p>dependor will ignore {'import'} in this context</p>
```

#### Why can't dependor handle this case?

Dependor only understands a small subset of JavaScript/TypeScript and does not understand JSX at all. This isn't usually a problem because dependor can just ignore tokens that aren't relevant to the import/export structure of a project.

Ignored "import" and "export" inside of quotes or comments is simple and dependor is able to do this without trouble. With JSX things are much trickier for three reasons.

1. JSX is recursive
2. JSX tags are not the only place where `<` and `>` are used
3. JSX tags can be named mostly anything

Parsing and ignoring JSX is something I think I could reasonably accomplish in the future. But for the time being I am providing a linting rule and a workaround.
