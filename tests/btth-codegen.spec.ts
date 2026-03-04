import { test, expect } from "@playwright/test";

test("Todo App - Add, complete and delete task", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");

  const newTodo = page.locator(".new-todo");
  const tasks = ["Học playwright", "Học java", "Học Typescript"];

  for (const task of tasks) {
    await newTodo.fill(task);
    await newTodo.press("Enter");
  }

  //Check sum of task
  await expect(page.locator(".todo-list li")).toHaveCount(3);
  //Complete 1 task
  await page.locator(".todo-list li").nth(0).locator(".toggle").click();
  //Check 1 task complete
  await expect(page.locator(".todo-list li.completed")).toHaveCount(1);

  //Check filter Active
  await page.getByRole("link", { name: "Active" }).click();
  await expect(page.locator(".todo-list li")).toHaveCount(2);

  //Check filter Complete
  await page.getByRole("link", { name: "Completed" }).click();
  await expect(page.locator(".todo-list li")).toHaveCount(1);

  //Back to All
  await page.getByRole("link", { name: "All" }).click();
  //Still 3
  await expect(page.locator(".todo-list li")).toHaveCount(3);
});
