import { test, expect, Page } from '@playwright/test';

test.describe('sessions', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('can navigate to new session view', async ({ page }) => {
    await page.getByRole('link', { name: 'New session' }).click()
    await expect(page).toHaveURL('/session/new/?campaignId=0')
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
    await page.goto('/')
    await page.evaluate(() => window.localStorage['who-slow-app-data'] = JSON.stringify({
      "state":{
        "campaigns":[{"id":0,"name":"Just play"},{"id":1,"name":"TCampaign"}],
        "games":[{"bggId":1337,"name":"TGame"}],
        "players":[{"id":10,"name":"Alice"},{"id":20,"name":"Bobby"},{"id":30,"name":"Charleigh"}],
        "sessions":[],
      },
      "version":0
    }))
    await page.goto('/session/new/')
    await page.reload()
    await page.evaluate(() => console.log(localStorage['who-slow-app-data']))
  })

  async function selectMuiOption(page: Page, inputName: string, optionName: string) {
    await page.getByTestId(inputName).click()
    await page.getByRole('option', {name: optionName, exact: true}).click()
    return
  }

  test('can fill out form', async ({ page }) => {
    await page.getByRole('button', {name: '+ Add'}).click()
    await page.getByRole('button', {name: '+ Add'}).click()

    await selectMuiOption(page, 'select-campaign', 'TCampaign')
    await selectMuiOption(page, 'select-game', 'TGame')
    await selectMuiOption(page, 'select-player1', 'Alice')
    await selectMuiOption(page, 'select-player2', 'Bobby')
    await selectMuiOption(page, 'select-player3', 'Charleigh')
    
    await page.getByTestId('input-color1').fill(COLORS[0])
    await page.getByTestId('input-color2').fill(COLORS[1])
    await page.getByTestId('input-color3').fill(COLORS[2])

    await page.getByRole('button', { name: 'Submit' }).click();
  })
})
