import { test, expect } from '@playwright/test';

test.describe('new player', () => {

  const NAME = 'Test player'
  test.beforeEach(async ({ page }) => {
    await page.goto('/player/new/')
  })

  test('can fill out form', async ({ page }) => {
    await page.getByLabel('Name').fill(NAME)
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await expect(page.getByText(`Player: ${NAME}`)).toBeVisible()
  })
})

