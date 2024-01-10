import { test, expect, Page } from '@playwright/test';

test.describe('Data asset', async () => {
  let sharedPage: Page;
  let name: string;
  let username: string;

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
    await sharedPage.locator('div[id*="pda-recipient-"]').click();
    username = await sharedPage.locator('#tooltip-username').textContent();
    await expect(sharedPage.locator('#tooltip-name')).toBeVisible();
  });
  test('Suspend PDA', async () => {
    await sharedPage.locator('#suspend-pda').click();
    await expect(sharedPage.locator('#confirm-dialog-title')).toBeVisible();
    await sharedPage.locator('#confirm-dialog').click({ timeout: 10000 });
    await expect(sharedPage.locator('#pda-status')).toContainText('suspended');
  });
  test('Make valid PDA', async () => {
    await sharedPage.locator('#make-valid-pda').click();
    await expect(sharedPage.locator('#confirm-dialog-title')).toBeVisible();
    await sharedPage.locator('#confirm-dialog').click({ timeout: 10000 });
    await expect(sharedPage.locator('#pda-status')).toContainText('valid');
  });
  test('Share a copy', async () => {
    await sharedPage.locator('#share-a-copy').click();
    await expect(sharedPage.locator('#share-a-copy-title')).toBeVisible();
    await sharedPage.locator('#field-address').fill(username);
    await sharedPage.locator('#share-copy-action').click({ timeout: 10000 });
    await expect(sharedPage.locator('#proof-created-title')).toBeVisible();
  });
});
