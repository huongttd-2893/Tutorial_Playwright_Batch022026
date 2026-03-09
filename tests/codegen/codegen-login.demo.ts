import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Truy cập trang login
  await page.goto('https://opensource-demo.orangehrmlive.com');

  // Thực hiện đăng nhập
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  // Đợi trang dashboard hoặc một dấu hiệu của đăng nhập thành công
  await page.getByRole('heading', { name: 'Dashboard' }).waitFor();

  // Lưu trạng thái vào file auth.json
  await context.storageState({ path: 'auth.json' });

  await browser.close();
})();
