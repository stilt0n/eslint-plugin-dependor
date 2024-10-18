# No Unquoted Import or Export in JSX

## Rule details

Dependor can not differentiate between import/export keywords inside of JSX and real uses of those keywords.

## Valid

```jsx
<p>{"this is a string with the words import and export"}</p>
<p>this is a jsx text node with escaped {"import"} and {"export"} keywords</p>
```

## Invalid

```jsx
<p>this is a jsx text node with the words import and export</p>
```
