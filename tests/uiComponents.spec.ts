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

        await usingTheGridEmailInput.fill('test@test.com')                                      //Fill the email input field
        await usingTheGridEmailInput.clear()                                                    //Clear the email input field
        await usingTheGridEmailInput.pressSequentially('test2@test.com', {delay: 500})          //Pass 2nd Argument to delay inputs in ms

        //Generic Assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test2@test.com')

        //Locator Assertion
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')
    })


})