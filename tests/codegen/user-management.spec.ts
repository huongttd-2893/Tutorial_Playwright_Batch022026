import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AdminPage } from '../pages/AdminPage';

test('Login và thêm user mới', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const adminPage = new AdminPage(page);

  // Login
  await loginPage.goto();
  await loginPage.login('Admin', 'admin123');

  // Thêm user
  const uniqueUsername = "DiemHuong" + Date.now(); // Tạo tên không trùng
  await adminPage.goToAdminMenu();
  await adminPage.addUser({
    role: 'Admin',
    employeeName: 'John Doe',
    status: 'Enabled',
    username: uniqueUsername,
    password: 'Password123!'
  });

  // Verify
  await adminPage.verifyUserExists(uniqueUsername);
});
