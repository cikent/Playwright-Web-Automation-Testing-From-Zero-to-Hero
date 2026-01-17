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

test('Checkboxes', async ({ page }) => {
    await page.getByText('Modal & Overlays').click()                                        //Navigate to the Modal & Overlays page via the Sidebar
    await page.getByText('Toastr').click()                                                  //Select Toastr from the Modal & Overlays submenu 

    await page.getByRole('checkbox', { name: 'Hide on click'}).click({force: true})         //Click the checkbox Element with the name value; enable force: true because element is not visible/interactive
    await page.getByRole('checkbox', { name: 'Hide on click' }).check({ force: true })      //Check the checkbox Element with the name values Status; enable force: true since element is not visible/interactive
    await page.getByRole('checkbox', { name: 'Hide on click' }).uncheck({ force: true })      //Uncheck the checkbox Element with the name values Status; enable force: true since element is not visible/interactive
    await page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' }).check({ force: true })      //Check the checkbox Element with the name values Status; enable force: true since element is not visible/interactive

    const allBoxes = page.getByRole('checkbox')                             //Get all checkbox elements on the page      
    for(const box of await allBoxes.all()){                                 //Use JSON syntax to iterate through each checkbox element
        await box.check({force: true})                                      //Check each checkbox; enable force: true since element is not visible/interactive  
        expect(await box.isChecked()).toBeTruthy()                          //Assert that each checkbox is checked
        await box.uncheck({ force: true })                                  //Uncheck each checkbox; enable force: true since element is not visible/interactive  
        expect(await box.isChecked()).toBeFalsy()                          //Assert that each checkbox is unchecked 
    }  

})