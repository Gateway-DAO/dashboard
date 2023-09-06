import { type Page } from '@playwright/test';
import * as playwright from '@synthetixio/synpress/commands/playwright';

import { test, expect } from '../config/fixtures';

// let sharedPage: Page;

// test.describe.configure({ mode: 'serial' });

// test.beforeAll(async ({ page }) => {
//   sharedPage = page;
//   await sharedPage.goto('http://localhost:4400');
// });

// test.afterAll(async ({}) => {
//   await sharedPage.close();
// });

// test('go to login page', async () => {
//   await sharedPage.goto('/login');
//   await expect(sharedPage.locator('h1')).toContainText('Enter the Gateway');
// });

// test('connect wallet modal', async () => {
//   await sharedPage.click('#connect-wallet');
//   await expect(sharedPage.locator('h2#title-modal')).toContainText(
//     'Add Wallet'
//   );
// });

// test('connect wallet using default metamask account', async () => {
//   await sharedPage.click('#connect-evm');
//   await sharedPage.click('button[data-testid="rk-wallet-option-metaMask"]');
//   const notificationPage = await playwright.switchToMetamaskNotification();
//   await notificationPage.getByRole('button', { name: 'Next' }).click();
//   await notificationPage.getByRole('button', { name: 'Connect' }).click();
//   await sharedPage.waitForTimeout(8000);
//   await notificationPage.getByRole('button', { name: 'Sign' }).click();
// });

// test('Welcome page', async () => {
//   await sharedPage.waitForTimeout(5000);
//   await expect(sharedPage.locator('#title-assets')).toContainText(
//     'My data assets'
//   );
// });
