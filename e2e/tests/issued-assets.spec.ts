import { test, expect, Page } from '@playwright/test';

test.describe('Issued Data assets', async () => {
  let sharedPage: Page;
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    sharedPage = await context.newPage();
    await sharedPage.goto('/dashboard/user/assets/issued');
  });
  test.afterAll(async ({}) => {
    await sharedPage.close();
  });
  test('Check if Tab issued is active', async () => {
    await expect(sharedPage.locator('a[aria-selected="true"]')).toContainText(
      'Issued'
    );
  });
});
