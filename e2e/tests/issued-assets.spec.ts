import { test, expect, Page } from '@playwright/test';

let sharedPage: Page;

test.describe('Issued Data assets', async () => {
  test.beforeEach(async ({ page }) => {
    sharedPage = page;
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
