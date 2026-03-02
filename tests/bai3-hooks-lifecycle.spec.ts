import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('BÀI 3 - Hook lifecycle demo', () => {

  // BEFORE ALL
  test.beforeAll(async () => {
    console.log('Bắt đầu chạy nhóm test');
  });

  // BEFORE EACH
  test.beforeEach(async ({ page }) => {
    console.log('Chạy beforeEach');

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  // AFTER EACH
  test.afterEach(async ({ page }, testInfo) => {
    console.log('Chạy afterEach');

    if (testInfo.status !== testInfo.expectedStatus) {
      console.log('Test fail → chụp screenshot');

      await page.screenshot({
        path: `screenshots/${testInfo.title}.png`,
        fullPage: true,
      });
    }
  });

  // AFTER ALL
  test.afterAll(async () => {
    console.log('Kết thúc nhóm test');
  });

  // TEST CASES

  test('TC1: Kiểm tra URL inventory', async ({ page }) => {
    await expect(page).toHaveURL(/inventory/);
  });

  test('TC2: Fail test screenshot', async ({ page }) => {
    await expect(page).toHaveURL(/cart/); // Fail
  });

});
