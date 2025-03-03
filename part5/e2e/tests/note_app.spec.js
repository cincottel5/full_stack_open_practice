const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')

// npm test -- --project chromium
describe('Note app', () => {
  beforeEach(async ({page, request}) => {
    // await request.post('http://localhost:3001/api/testing/reset')
    // await request.post('http://localhost:3001/api/users', {
    // await request.post('http://localhost:5173/api/testing/reset')
    // await request.post('http://localhost:5173/api/users', {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    //await page.goto('http://localhost:5173')
    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {
    //await page.goto('http://localhost:5173')
    const locator = await page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinky 2024')).toBeVisible()
  })

  test('user can login with correct credentials', async({ page }) => {
    //await page.goto('http://localhost:5173')
    //await page.getByRole('button', { name: 'login'}).click()
    // await page.getByRole('textbox').first().fill('test')
    // await page.getByRole('textbox').last().fill('test')
    //await page.getByTestId('username').fill('mluukkai')
    //await page.getByTestId('password').fill('salainen')
    //await page.getByRole('button', { name: 'login'}).click()
    await loginWith(page, 'mluukkai', 'salainen')

    await expect(page.getByText('Matti Luukkainen logged-in')).toBeVisible()
  })

  //npm test -- -g "login fails with wrong password"
  //test.only('login fails with wrong password', async ({ page }) => {
  test('login fails with wrong password', async ({ page }) => {
    // await page.getByRole('button', { name: 'login'}).click()
    // await page.getByTestId('username').fill('mluukkai')
    // await page.getByTestId('password').fill('wrong')
    // await page.getByRole('button', { name: 'login'}).click()
    await loginWith(page, 'mluukkai', 'wrong')

    //await expect(page.getByText('wrong credentials')).toBeVisible()

    const errorDiv = await page.locator('.notification')
    await expect(errorDiv).toContainText('Wrong credentials')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({page}) => {
      // await page.getByRole('button', { name: 'login'}).click()
      // await page.getByTestId('username').fill('mluukkai')
      // await page.getByTestId('password').fill('salainen')
      // await page.getByRole('button', { name: 'login'}).click()
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new note can be created', async ({ page }) => {
      await createNote(page, 'a note created by playwright')
      // await page.getByRole('button', { name: 'new note'}).click()
      // await page.getByRole('textbox').fill('a note created by playwright')
      // await page.getByRole('button', { name: 'save'}).click()
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })

    describe('and a note exists', () => {
      beforeEach(async ({ page }) => {
        //await createNote(page, 'a note created by playwright')
        // await page.getByRole('button', { name: 'new note'}).click()
        // await page.getByRole('textbox').fill('another note by playwright')
        // await page.getByRole('button', {name: 'save'}).click()

        await createNote(page, 'first note')
        await createNote(page, 'second note')
        await createNote(page, 'third note')
      })

      // npm test -- -g'importance can be changed' --debug
      test('importance can be changed', async ({ page }) => {
        //await page.getByRole('button', { name: 'make not important'}).click()
        //await expect(page.getByText('make important')).toBeVisible()
        //await page.pause()
        const otherNoteText = await page.getByText('second note')
        const otherNoteElement = await otherNoteText.locator('..')
        await otherNoteElement.getByRole('button', { name: 'make not important' }).click()
        await expect(otherNoteElement.getByText('make important')).toBeVisible()
      })
    })

    // describe('and several notes exists', () => {
    //   beforeEach(async ({ page }) => {
    //     await createNote(page, 'first note')
    //     await createNote(page, 'second note')
    //   })

    //   test('one of those can be made nonimportant', async ({ page }) => {
    //     //await page.getByText('first note').getByRole('button', { name: 'make not important' }).click()
    //     //await expect(page.getByText('first note').getByText('make important')).toBeVisible()
        
    //     // const otherNoteElement = await page.getByText('first note')
    //     // await otherNoteElement
    //     //   .getByRole('button', { name: 'make not important' }).click()
    //     // await expect(otherNoteElement.getByText('make important')).toBeVisible()

    //     // const otherNoteText = await page.getByText('first note')
    //     // const otherNoteElement = await otherNoteText.locator('..')
    //     // await otherNoteElement.getByRole('button', { name: 'make not important'}).click()
    //     // await expect(otherNoteElement.getByText('make important')).toBeVisible()

    //     const secondNoteElement = await page.getByText('second note').locator('..')
    //     await secondNoteElement.getByRole('button', {name: 'make not important'}).click()
    //     await expect(secondNoteElement.getByText('make important')).toBeVisible()

    //   })
    // })
  })
  
})
