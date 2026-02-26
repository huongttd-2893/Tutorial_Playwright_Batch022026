import { test, expect } from "@playwright/test";

test.describe("Login flow tests", () => {
  const baseURL = "https://www.saucedemo.com/";

  test.describe("Valid Login", () => {
    // Login trước mỗi bài test
    test.beforeEach(async ({ page }) => {
      await page.goto(baseURL);
      await page.fill("#user-name", "standard_user");
      await page.fill("#password", "secret_sauce");
      await page.click("#login-button");
    });

    // Chụp ảnh sau mỗi bài test
    test.afterEach(async ({ page }, testInfo) => {
      const screenshotPath = `screenshots/${testInfo.title.replace(/\s+/g, "_")}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
    });

    // Test 1: Kiểm tra Login thành công
    test("Should navigate to inventory page after login", async ({ page }) => {
      await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
      await expect(page.locator(".title")).toHaveText("Products");
    });

    // Test 2: Kiểm tra logout thành công
    test("Should logout and return to login page", async ({ page }) => {
      // Mở menu và click Logout
      await page.click("#react-burger-menu-btn");
      await page.click("#logout_sidebar_link");

      // Kiểm tra quay về trang login
      await expect(page).toHaveURL(baseURL);
      await expect(page.locator("#login-button")).toBeVisible();
    });
  });

  //INVALID LOGIN

  test.describe("Invalid Login", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(baseURL);
    });

    // Chụp ảnh sau mỗi bài test
    test.afterEach(async ({ page }, testInfo) => {
      const screenshotPath = `screenshots/${testInfo.title.replace(/\s+/g, "_")}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
    });

    // Test 3: Show error khi nhập Password sai
    test("Should show error when password is incorrect", async ({ page }) => {
      await page.fill("#user-name", "standard_user");
      await page.fill("#password", "wrong_password");
      await page.click("#login-button");

      const errorMsg = page.locator('[data-test="error"]');
      await expect(errorMsg).toBeVisible();
      await expect(errorMsg).toContainText(
        "Username and password do not match",
      );
    });

    //Test 4: Show error khi username là trống
    test("Should show error when username is empty", async ({ page }) => {
      await page.fill("#password", "secret_sauce");
      await page.click("#login-button");

      const errorMsg = page.locator('[data-test="error"]');
      await expect(errorMsg).toBeVisible();
      await expect(errorMsg).toContainText("Username is required");
    });

    // VD Skip tạm thời
    test.skip("Should show error when password is empty", async ({ page }) => {
      await page.fill("#user-name", "standard_user");
      await page.click("#login-button");

      const errorMsg = page.locator('[data-test="error"]');
      await expect(errorMsg).toBeVisible();
    });
  });
});
