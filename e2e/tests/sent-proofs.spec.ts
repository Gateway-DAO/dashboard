import { test, expect, Page } from '@playwright/test';

test.describe('Sent Shared Datas', async () => {
  let sharedPage: Page;
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    sharedPage = await context.newPage();
    await sharedPage.goto('/dashboard/user/proofs/sent');
  });
  test.afterAll(async ({}) => {
    await sharedPage.close();
  });
  test('Check if Tab Sent is active', async () => {
    await expect(sharedPage.locator('a[aria-selected="true"]')).toContainText(
      'Sent'
    );
  });
});
