import { test, expect } from "@playwright/test";

//1. Verify Register UI
test("TC01 - Verify UI", async ({ page }) => {
  await page.goto("https://buggy.justtestit.org/register");
  await expect(page.getByRole("heading", { name: "Register with Buggy Cars Rating" }),).toBeVisible();
  await expect(page.locator("#username")).toBeVisible();
  await expect(page.locator("#firstName")).toBeVisible();
  await expect(page.locator("#lastName")).toBeVisible();
  await expect(page.locator("#password")).toBeVisible();
  await expect(page.locator("#confirmPassword")).toBeVisible();
});

//2. Register and login successfully
test("TC02 - Register and login successfully", async ({ page }) => {

  const username = "DiemHuong" + Date.now();
  const firstName = "Huong";
  const lastName = "Tang";
  const password = "Aa@123456";

  // Register
  await page.goto("https://buggy.justtestit.org/register");

  await page.fill("#username", username);
  await page.fill("#firstName", firstName);
  await page.fill("#lastName", lastName);
  await page.fill("#password", password);
  await page.fill("#confirmPassword", password);

  await page.locator("//button[text()='Register']").click();

  await expect(page.locator("div.alert-success")).toContainText("Registration is successful");

  // Login
  await page.goto("https://buggy.justtestit.org/");

  await page.fill('input[name="login"]', username);
  await page.fill('input[name="password"]', password);
  await page.locator("//button[text()='Login']").click();

  // Verify login success
  const verifyLogin = page.locator("header span");
  await verifyLogin.waitFor({state: 'visible'});
  await expect(verifyLogin).toContainText(firstName);

});
