import { test, expect, Page } from '@playwright/test';

let sharedPage: Page;

test.describe('Sent Data proofs', async () => {
  test.beforeEach(async ({ page }) => {
    sharedPage = page;
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
