# Development

## Remove lines on PRODUCTION

If you want to remove a number line on production, you can add a comment `#REMOVELINE {number}` to remove a specific number of lines

```ts
// #REMOVELINE
const test = '';
```

```gql
#REMOVELINE 3
query {
  test
}
```
