import { test, expect } from '@playwright/test';

test('Test case: Register user on Playwright', async ({ page }) => {
    
    // 1. Truy cập vào trang web
    await page.goto('https://material.playwrightvn.com/01-xpath-register-page.html');

    // --- NHẬP DỮ LIỆU ---
    
    await page.locator('//input[@id="username"]').fill('DiemHuong');

    await page.locator('//input[@id="email"]').fill('tang.thi.diem.huong+1@sun-asterisk.com');

    const genderRadio = page.locator('//input[@value="female"]');
    await genderRadio.check();

    // Chọn Hobbies (Reading) -> Dùng .check()
    const hobbyCheckbox = page.locator('//input[@id="traveling"]');
    await hobbyCheckbox.check();

   // Chọn interests
   await page.locator('#interests').selectOption(['technology']);
    
    // Chọn Country (usa) -> Dùng .selectOption()
    await page.locator('//select[@id="country"]').selectOption('usa');

    // Chọn ngày sinh (Input Type Date) -> Dùng .fill('yyyy-mm-dd')
    await page.locator('//input[@id="dob"]').fill('2000-04-16');

    // Nhập Bio (Textarea)
    await page.locator('//textarea[@id="bio"]').fill('Learn Playwright');

    // --- PHẦN 2: VERIFY TRƯỚC KHI SUBMIT ---
    await expect(genderRadio).toBeChecked();
    await expect(hobbyCheckbox).toBeChecked();

    // --- PHẦN 3: SUBMIT VÀ KIỂM TRA KẾT QUẢ ---
    
    // Click nút Register
    await page.locator('//button[@type="submit"]').click();

    // Verify: Kiểm tra thông tin user mới xuất hiện dưới bảng
    const userTable = page.locator('//table[@id="userTable"]');
    await expect(userTable).toContainText('DiemHuong');
    await expect(userTable).toContainText('tang.thi.diem.huong+1@sun-asterisk.com');

    // Dừng lại 5s để xem kết quả
    await page.waitForTimeout(5000);
});