import { test, expect } from "@playwright/test";

test('Manage Todo List', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    const input = page.locator('.new-todo');

    // 1. Thêm 3 task
    await input.fill('Task A'); await input.press('Enter');
    await input.fill('Task B'); await input.press('Enter');
    await input.fill('Task C'); await input.press('Enter');

    // 2. Tick task thứ 2 (Index = 1)
    const items = page.locator('.todo-list li');
    await items.nth(1).locator('.toggle').check();

    // 3. Verify task đầu tiên
    const firstTask = items.first();
    await expect(firstTask).toContainText('Task A');

    // 4. Xóa Task C
    const taskC = items.filter({ hasText: 'Task C' });
    await taskC.hover(); // Hover để hiện nút xóa
    await taskC.locator('.destroy').click();

    // Assert: Task C biến mất
    await expect(taskC).not.toBeVisible();
});
