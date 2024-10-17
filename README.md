# eslint-plugin-dependor

This is an eslint plugin for [dependor](https://github.com/stilt0n/dependor). 

## What does this lint for?

Dependor can not handle exports like this:

```js
export const a = 'a', b = 'b';
```

If you have these types of exports in your project and want to use dependor with it you can refactor them to one of the following:

```js
// OPTION 1
export const a = 'a';
export const b = 'b';

// OPTION 2
const a = 'a', b = 'b';
export { a, b };
```

## Why?

[Dependor](https://github.com/stilt0n/dependor) is a dependency parser for TypeScript/JavaScript. It parses a repository into an graph data structure that shows the import/export relationships between files.

Rather than write a full parser for JavaScript/TypeScript, I opted to only parse a subset of the languages. For the most part, this is all that is necessary, but there is one corner case where it becomes impossible to parse imports/exports without implementing expression parsing (which is either most or all of the language). This eslint-plugin lints for that case to ensure a repository is compatible with dependor.

Dependor keeps track of exports so that it can perform rudimentary tree-shaking. In JavaScript you can use one `const/let/var` keyword to declare multiple variables separated by commas like this:

```js
const a = 'a', b = [1, 2, 3], c = () => {
  const d = 'd', e = 'e';
  return { d, e }
};
```

You can use the `export` keyword with the above

```js
export const a = 'a', b = // ...
```

Dependor avoids needing to do expression parsing by taking advantage of the fact that it does not need to know *what your export does*, it only needs to know *what your export is named*. For export assignments like this, dependor assumes it can ignore everything after the `=` character. In this particular case, dependor will miss exported identifiers using this strategy.

I don't think there is an easy way around this limitation. So I've opted to create a linter rule for it instead of addressing it directly.