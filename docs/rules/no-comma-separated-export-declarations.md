# No Comma Separated Export Declarations

## Rule details

Dependor can not handle exports that use the form:

```js
export const a = 'a', b = 'b', c = 'c';
```

To make your exports dependor-compatible use one of the following forms:

```js
export const a = 'a';
export const b = 'b';
export const c = 'c';
```

Or

```js
const a = 'a', b = 'b', c = 'c';
export { a, b, c };
```