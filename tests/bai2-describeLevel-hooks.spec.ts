import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";

// =========================
// GROUP A
// =========================
test.describe("GROUP A - Verify the product list", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await page.goto("https://www.saucedemo.com/inventory.html");
  });

  test("TCs-1: Check that there are 6 products", async ({ page }) => {
    const products = page.locator(".inventory_item");
    await expect(products).toHaveCount(6);
  });

  test('TCs-2: Verify the URL contains "inventory".', async ({ page }) => {
    await expect(page).toHaveURL(/inventory/);
  });
});

// =========================
// GROUP B
// =========================
test.describe("GROUP B - Verify the number of items in the cart.", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await page.click("text=Add to cart"); // add sản phẩm đầu tiên
  });

  test("TCs-3: The cart contains 1 product.", async ({ page }) => {
    const cartBadge = page.locator(".shopping_cart_badge");
    await expect(cartBadge).toHaveText("1");
  });

  test("TCs-4: Add 2 products", async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addProductByIndex(1);

    await expect(inventory.getCartBadge()).toHaveText("2");
  });

  test("TCs-5: The cart contains 1 products", async ({ page }) => {
    await page.click(".shopping_cart_link");
    const items = page.locator(".cart_item");
    await expect(items).toHaveCount(1);
  });
});
