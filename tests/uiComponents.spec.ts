import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')    
})

test.describe('Form Layouts page', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('Input Fields', async ({ page }) => {
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', { name: 'Email' })

        await usingTheGridEmailInput.fill('test@test.com')      //Fill the email input field
        await usingTheGridEmailInput.clear()        //Clear the email input field
        await usingTheGridEmailInput.pressSequentially('test2@test.com', {delay: 500})      //Pass 2nd Argument to delay inputs in ms

        //Generic Assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test2@test.com')

        //Locator Assertion
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')
    })

    test('Radio Buttons', async ({ page }) => {
        const usingTheGridForm = page.locator('nb-card', { hasText: "Using the Grid" })

        // await usingTheGridForm.getByLabel('Option 1').check({force: true})       //Force check even if element is not visible/interactive
        await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).check({force: true})
        const radioStatus = await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).isChecked()
        expect(radioStatus).toBeTruthy()        //1st way of assertion, obtaining the Status value and asserting
        await expect(usingTheGridForm.getByRole('radio', { name: 'Option 1' })).toBeChecked()       //2nd way of assertion, directly asserting on the Locator

        await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).check({ force: true })
        expect(await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).isChecked()).toBeFalsy()     //1st way of assertion, obtaining the Status value and asserting after checking Option 2
        expect(await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).isChecked()).toBeTruthy()        //2nd way of assertion, directly asserting on the Locator after checking Option 2
    })


})