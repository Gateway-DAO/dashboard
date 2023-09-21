import { test, expect, Page } from '@playwright/test';

let sharedPage: Page;
let name: string;

test.describe('Data proof', async () => {
  test.beforeEach(async ({ page }) => {
    sharedPage = page;
    await sharedPage.goto('/dashboard/user/proofs/received');
    name = await sharedPage
      .locator('.MuiDataGrid-row')
      .first()
      .locator('.MuiDataGrid-cell')
      .first()
      .locator('p')
      .textContent();
    await sharedPage.click('.MuiDataGrid-row');
  });

  test.afterAll(async ({}) => {
    await sharedPage.close();
  });
  test('Check proof name', async () => {
    await expect(sharedPage.locator('#proof-title')).toContainText(name);
  });
  test('Check tooltip user', async () => {
    await sharedPage.locator('#tooltip-link-proof').click();
    await expect(sharedPage.locator('#tooltip-user-name')).toBeVisible();
  });
});
