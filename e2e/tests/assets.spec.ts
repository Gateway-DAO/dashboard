import { test, expect, Page } from '@playwright/test';

let sharedPage: Page;

test.describe('Data assets flow', async () => {
  test.beforeEach(async ({ page }) => {
    sharedPage = page;
    await sharedPage.goto('/dashboard/user/assets/received');
  });

  test.afterAll(async ({}) => {
    await sharedPage.close();
  });
  test('View data assets page', async () => {
    await expect(sharedPage.locator('#title-assets')).toContainText(
      'Data assets'
    );
  });
});
