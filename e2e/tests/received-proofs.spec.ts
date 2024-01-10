import { test, expect, Page } from '@playwright/test';

test.describe('Received Data proofs', async () => {
  let sharedPage: Page;
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    sharedPage = await context.newPage();
    await sharedPage.goto('/dashboard/user/proofs/received');
  });
  test.afterAll(async ({}) => {
    await sharedPage.close();
  });
  test('Check if Tab Received is active', async () => {
    await expect(sharedPage.locator('a[aria-selected="true"]')).toContainText(
      'Received'
    );
  });
});
