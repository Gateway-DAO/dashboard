import { test, expect } from '@playwright/test';

test('Go to My data assets page', async ({ page }) => {
  await page.goto('/');
  await page.goto('/dashboard/user/assets/received');
  await expect(page.locator('#title-assets')).toContainText('My data assets');
});
