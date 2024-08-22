import { test, expect } from '@playwright/test';

test.describe('games', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/game/')
  })

  test('can navigate to new game view', async ({ page }) => {
    await page.getByRole('link', { name: 'New' }).click()
    await expect(page).toHaveURL('/game/new/')
  })
})

test.describe('new game', () => {

  const BGG_ID = 1234
  const NAME = 'Test game'
  test.beforeEach(async ({ page }) => {
    await page.goto('/game/new/')
  })

  test('can fill out form', async ({ page }) => {
    await page.getByLabel('BGG ID').fill(`${BGG_ID}`)
    await page.getByLabel('Name').fill(NAME)
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await expect(page).toHaveURL(`/game/${BGG_ID}/`)
    await expect(page.getByText(NAME)).toBeVisible()
  })
})

