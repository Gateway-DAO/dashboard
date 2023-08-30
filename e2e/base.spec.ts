import { test, expect } from '@playwright/test';

test('if playwirght is working', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Gateway');
});
