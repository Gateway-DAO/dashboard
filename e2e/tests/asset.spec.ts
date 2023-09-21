import { test, expect, Page } from '@playwright/test';

let sharedPage: Page;
let name: string;

test.describe('Data asset', async () => {
  test.beforeEach(async ({ page }) => {
    sharedPage = page;
    await sharedPage.goto('/dashboard/user/assets/received');
    name = await sharedPage.locator('.pda-card-name').first().textContent();
    await sharedPage.click('.pda-card');
  });

  test.afterAll(async ({}) => {
    await sharedPage.close();
  });
  test('Check pda name', async () => {
    await expect(sharedPage.locator('#pda-title')).toContainText(name);
  });
  test('Check tooltip user', async () => {
    await sharedPage.locator('div[id*="pda-issuer-"]').click();
    await expect(sharedPage.locator('#tooltip-user-name')).toBeVisible();
  });
});
