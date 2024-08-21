import { test, expect } from '@playwright/test';

test.describe('players', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/app/player/')
  })

  test('can navigate to new player view', async ({ page }) => {
    await page.getByRole('link', { name: 'New' }).click()
    await expect(page).toHaveURL('/app/player/new/')
  })
})

test.describe('new player', () => {

  const NAME = 'Test player'
  test.beforeEach(async ({ page }) => {
    await page.goto('/app/player/new/')
  })

  test('can fill out form', async ({ page }) => {
    await page.getByLabel('Name').fill(NAME)
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await expect(page.getByText(`Player: ${NAME}`)).toBeVisible()
  })
})

