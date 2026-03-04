import { test, expect } from '@playwright/test';

// Load trạng thái login từ file
test.use({ storageState: 'auth.json' });

test('Truy cập dashboard sau khi login trước đó', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    // Kiểm tra có mặt phần tử trên dashboard
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
