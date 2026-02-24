import { test, expect } from '@playwright/test';
test ('Cart badge should increase when adding products', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

// Check login successully
    // await expect(page.locator('.title')).toHaveText('Products');
    await expect(page).toHaveURL(/inventory/);

//Add first product to cart and check badge
    await page.getByText('Add to cart').first().click();

    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');

// Add second product to cart and check badge
    await page.getByText('Add to cart').nth(1).click();
    await expect(cartBadge).toHaveText('2');
});
