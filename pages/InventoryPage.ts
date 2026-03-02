import { Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getFirstProductName() {
    return this.page.locator(".inventory_item_name").first();
  }

  async logout() {
    await this.page.click("#react-burger-menu-btn");
    await this.page.click("#logout_sidebar_link");
  }

  async addProductByIndex(index: number) {
    await this.page.getByRole('button', { name: 'Add to cart' }).nth(index).click();
  }

  getCartBadge() {
    return this.page.locator(".shopping_cart_badge");
  }
}
