import { test, expect, Page } from '@playwright/test';

test.describe('sessions', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/app/')
  })

  test('can navigate to new session view', async ({ page }) => {
    await page.getByRole('link', { name: 'New session' }).click()
    await expect(page).toHaveURL('/app/session/new/?campaignId=0')
  })
})

test.describe('new session', () => {

  const LOCAL_STORAGE = {
    "state":{
      "campaigns":[{"id":0,"name":"Just play"},{"id":1,"name":"TCampaign"}],
      "games":[{"bggId":1337,"name":"test test"}],
      "players":[{"id":10,"name":"Alice"},{"id":20,"name":"Bob"},{"id":30,"name":"Charlie"}],
      "sessions":[],
    },
    "version":0
  }
  const COLORS = ['#F00', '#0F0', '#00F']
  test.beforeEach(async ({ page }) => {
    await page.goto('/app/')
    await page.evaluate(() => window.localStorage['who-slow-app-data'] = JSON.stringify({
      "state":{
        "campaigns":[{"id":0,"name":"Just play"},{"id":1,"name":"TCampaign"}],
        "games":[{"bggId":1337,"name":"TGame"}],
        "players":[{"id":10,"name":"Aaron"},{"id":20,"name":"Bobby"},{"id":30,"name":"Charleigh"}],
        "sessions":[],
      },
      "version":0
    }))
    await page.goto('/app/session/new/')
    await page.reload()
    await page.evaluate(() => console.log(localStorage['who-slow-app-data']))
  })

  async function selectMuiOption(page: Page, inputName: string, optionName: string) {
    await page.getByRole('textbox', { name: inputName, exact: true }).click()
    await page.getByRole('option', { name: optionName, exact: true }).click()
    return
  }

  test('can fill out form', async ({ page }) => {
    await page.getByRole('button', {name: 'Add player'}).click()
    await page.getByRole('button', {name: 'Add player'}).click()

    await selectMuiOption(page, 'Campaign', 'TCampaign')
    await selectMuiOption(page, 'Game', 'TGame')
    await selectMuiOption(page, 'Player 1', 'Aaron')
    await selectMuiOption(page, 'Player 2', 'Bobby')
    await selectMuiOption(page, 'Player 3', 'Charleigh')
    
    await page.getByLabel('Player 1 color').fill(COLORS[0])
    await page.getByLabel('Player 2 color').fill(COLORS[1])
    await page.getByLabel('Player 3 color').fill(COLORS[2])

    await page.getByRole('button', { name: 'Submit' }).click();
    
    await expect(page).toHaveURL(`/app/session/0/`)
    await expect(page.getByText(`Playing TGame`)).toBeVisible()
    await expect(page.getByText('Aaron, Bobby, Charleigh')).toBeVisible()
  })
})

