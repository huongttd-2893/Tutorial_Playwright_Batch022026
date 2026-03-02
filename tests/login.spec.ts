import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Module - Verify Authentication Logic', () => {
  let loginPage: LoginPage;

  // SETUP: Chạy trước MỖI test case
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto(); // Luôn mở trang login trước khi test
  });

  // TC01: Happy Case
  test('✅ Login thành công với tài khoản đúng', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');

    // Assertion (Kiểm tra)
    await expect(page).toHaveURL(/.*inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  // TC02: Negative Case
  test('❌ Login thất bại với mật khẩu sai', async ({ page }) => {
    await loginPage.login('standard_user', 'sai_mat_khau');

    // Assertion
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Epic sadface');
  });
});
