# Testing

## E2E Testing (Playwright)

According to [Next.js' Testing Documentation](https://nextjs.org/docs/pages/building-your-application/optimizing/testing#running-your-playwright-tests), you should have a running server before running your tests.

It can be either running a dev server (`pnpm dev`) or a built local server (`pnpm build && pnpm start`), pointing to `PORT` env (defaults to `4400`).

### Running tests

```bash
pnpm test:e2e
```

### Writing tests

E2E tests are located in `/e2e` folder.

## Unit Testing (Jest + React Testing Library)

### Running tests

```bash
pnpm test
```

### Writing tests

Unit tests are located in `**/__tests__` folder. Since we're using Next 13, we can put tests in the same folder as the pages and component, [because folders starting with underscore (`_`) are ignored by Next.js App Router](https://nextjs.org/docs/app/building-your-application/routing/colocation#private-folders).
