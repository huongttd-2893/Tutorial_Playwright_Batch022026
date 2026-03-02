import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  // 1. Khai báo thuộc tính (Locators)
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  // 2. Constructor - Khởi tạo giá trị
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    // Dùng data-test để locator ổn định hơn
    this.errorMessage = page.locator('[data-test="error"]');
  }
 // 3. Actions - Các hành động
  async goto() {
    await this.page.goto('https://www.saucedemo.com');
  }

  async login(user: string, pass: string) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }

  // Helper để lấy text lỗi
  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}
