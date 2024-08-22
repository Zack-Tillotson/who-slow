import { test, expect } from '@playwright/test';

test.describe('new campaign', () => {

  const NAME = 'Test campaign'
  test.beforeEach(async ({ page }) => {
    await page.goto('/campaign/new/')
  })

  test('can fill out form', async ({ page }) => {
    await page.getByLabel('Name').fill(NAME)
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await expect(page).toHaveURL(`/campaign/1/`)
    await expect(page.getByText(NAME)).toBeVisible()
  })
})

