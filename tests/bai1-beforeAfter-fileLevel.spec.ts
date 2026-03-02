import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

 let inventoryPage: InventoryPage;

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await page.screenshot({
      path: `screenshots/${testInfo.title}.png`,
      fullPage: true,
    });
  }

  await inventoryPage.logout();
});

// ============================

test('Test 1: URL chứa /inventory', async ({ page }) => {
  await expect(page).toHaveURL(/inventory/);
});

test('Test 2: Sản phẩm đầu tiên đúng tên', async () => {
  const firstProduct = await inventoryPage.getFirstProductName();
  await expect(firstProduct).toHaveText('Sauce Labs Backpack');
});
