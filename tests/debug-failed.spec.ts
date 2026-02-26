import { test, expect } from "@playwright/test";
test('Debug Invalid Login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    // Cố tình nhập sai
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'WRONG_PASS');
    await page.click('#login-button');

    // In log để debug logic
    const errorMsg = await page.locator('[data-test="error"]').textContent();
    console.log(`📌 Error Message: ${errorMsg}`);

    // Assert sai để kích hoạt Screenshot/Video (Giả sử mong đợi login thành công)
    await expect(page).toHaveURL(/inventory.html/);
});
