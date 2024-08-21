import { test, expect } from '@playwright/test';

test.describe('landing', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  })

  test('has title', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Who Slow/);
  });

  test('has link to the app route', async ({ page }) => {
    const link = page.locator('a[href="/app/"]')
    await expect(link).toBeVisible()
  });

})