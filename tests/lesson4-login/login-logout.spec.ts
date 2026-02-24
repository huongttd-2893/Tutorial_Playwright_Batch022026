import { test, expect } from "@playwright/test";
test("User can login and logout successfully", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  // Check login successully
  await expect(page).toHaveURL(/inventory.html/);
  //Open sidebar
  await await page.click("#react-burger-menu-btn");
  // Đợi logout button appear
  await page.waitForSelector("#logout_sidebar_link");
  //Click logout
  await page.click("#logout_sidebar_link");
  // Verify quay lại login page
  await expect(page).toHaveURL("https://www.saucedemo.com/");
  await expect(page.locator("#login-button")).toBeVisible();
});
