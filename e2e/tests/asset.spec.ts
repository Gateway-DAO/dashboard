import { test, expect, Page } from '@playwright/test';

test.describe('Data asset', async () => {
  let sharedPage: Page;
  let name: string;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    sharedPage = await context.newPage();
    await sharedPage.goto('/dashboard/user/assets/received');
    name = await sharedPage.locator('.pda-card-name').first().textContent();
    await sharedPage.click('.pda-card', { timeout: 4000 });
  });

  test('Check PDA name', async () => {
    await expect(sharedPage.locator('#pda-title')).toContainText(name);
  });
  test('Check PDA tooltip', async () => {
    await sharedPage.locator('div[id*="pda-issuer-"]').click();
    await expect(sharedPage.locator('#tooltip-user-name')).toBeVisible();
  });
});
