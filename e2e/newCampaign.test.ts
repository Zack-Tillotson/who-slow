import { test, expect } from '@playwright/test';

test.describe('campaigns', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/app/campaign/')
  })

  test('can navigate to new campaign view', async ({ page }) => {
    await page.getByRole('link', { name: 'New' }).click()
    await expect(page).toHaveURL('/app/campaign/new/')
  })
})

test.describe('new campaign', () => {

  const NAME = 'Test campaign'
  test.beforeEach(async ({ page }) => {
    await page.goto('/app/campaign/new/')
  })

  test('can fill out form', async ({ page }) => {
    await page.getByLabel('Name').fill(NAME)
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await expect(page).toHaveURL(`/app/campaign/1/`)
    await expect(page.getByText(NAME)).toBeVisible()
  })
})

