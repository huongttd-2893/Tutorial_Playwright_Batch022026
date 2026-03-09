import { Page, Locator, expect } from "@playwright/test";

export class AdminPage {
  private page: Page;

  readonly addButton: Locator;
  readonly userRoleDropdown: Locator;
  readonly employeeNameInput: Locator;
  readonly statusDropdown: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Action Button
    this.addButton = page.getByRole("button", { name: "Add" });
    this.saveButton = page.getByRole("button", { name: "Save" });

    //  Dropdown User Role
    this.userRoleDropdown = page.locator(".oxd-input-group", { hasText: "User Role" }).locator(".oxd-select-text");
    this.statusDropdown = page.locator(".oxd-input-group", { hasText: "Status" }).locator(".oxd-select-text");

    // Input
    this.employeeNameInput = page.getByPlaceholder('Type for hints...');

    this.usernameInput = page.locator('.oxd-input-group', { hasText: 'Username' }).locator('input');

    // Password
    this.passwordInput = page.locator('.oxd-input-group', { hasText: 'Password' }).locator('input[type="password"]').first(); // .first() để lấy đúng ô Password chính

    this.confirmPasswordInput = page.locator('.oxd-input-group', { hasText: 'Confirm Password' }).locator('input[type="password"]');
  }

  async goToAdminMenu() {
    await this.page.getByRole('link', { name: 'Admin' }).click();
  }

  async addUser(data: {
    role: string;
    employeeName: string;
    status: string;
    username: string;
    password: string;
  }) {
    await this.addButton.click();

    // Chọn User Role: Click mở dropdown rồi chọn option theo tên
    await this.userRoleDropdown.click();
    await this.page.getByRole('option', { name: data.role }).click();

    // Nhập Employee Name
    await this.employeeNameInput.fill(data.employeeName);
    // Chờ ds xuất hiện
    const hintList = this.page.locator('.oxd-autocomplete-dropdown');
    await expect(hintList).toBeVisible({ timeout: 5000 });
    // Click vào item chứa đúng tên nhân viên
    // Dùng .first() nếu có nhiều kết quả giống nhau
    await hintList.getByText(data.employeeName).first().click();
    // Chọn Status
    await this.statusDropdown.click();
    await this.page.getByRole('option', { name: data.status }).click();

    // Nhập Username và Password
    await this.usernameInput.fill(data.username);
    await this.passwordInput.fill(data.password);
    await this.confirmPasswordInput.fill(data.password);

    // Lưu lại và chờ phản hồi từ server
    await this.saveButton.click();
    // Định vị vùng chứa Toast Message (thường là class .oxd-toast)
    const successToast = this.page.locator('.oxd-toast-content');

    // Chờ thông báo Success xuất hiện
    // Chúng ta để timeout 10s để trừ hao mạng chậm, nhưng Playwright sẽ chạy tiếp ngay khi thấy Toast
    await expect(successToast).toContainText('Successfully Saved', { timeout: 10000 });
  }

  async verifyUserExists(username: string) {
    // Tìm chính xác trong vùng thân của bảng (tbody) để tránh quét nhầm header
    const tableBody = this.page.locator('.oxd-table-body');

    // Tăng timeout lên 10 giây để đợi trang web load xong
    await expect(tableBody).toContainText(username, { timeout: 10000 });
  }
}
