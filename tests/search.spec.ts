import { test, expect } from '@playwright/test';

test('Test case: Search on W3Schools', async ({ page }) => {
    await page.goto('https://www.w3schools.com/');

    // Tìm ô search theo ID là "tnb-google-search-input"  locator là "#tnb-google-search-input"
    await page.locator('#tnb-google-search-input').fill('JavaScript');

    // Nhấn Enter 
    await page.keyboard.press('Enter');

    // Dừng lại 5 giây nhìn kết quả
    await page.waitForTimeout(5000);
});