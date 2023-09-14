import { test, expect, Page } from '@playwright/test';

let sharedPage: Page;

test.describe('Received Data assets', async () => {
  test.beforeEach(async ({ page }) => {
    sharedPage = page;
    await sharedPage.goto('/dashboard/user/assets/received');
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
