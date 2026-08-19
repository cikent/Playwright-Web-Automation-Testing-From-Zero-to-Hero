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

test ('Lists and Dropdowns', async ({ page }) => {
    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    page.getByRole('list')                  //When the List has a UL tag
    page.getByRole('listitem')              //When the List has a LI tag

    //const optionList = page.getByRole('list').locator('nb-option')    //Option 1: Get the List element then the nb-option within it
    const optionList = page.locator('nb-option-list nb-option')         //Option 2: Get the Parent and Child element
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])     //Assert that the List has the expected text values
    await optionList.filter({ hasText: "Cosmic" }).click()        //Filter the List to get the option with the text value 'Cosmic' and click it
    const header = page.locator('nb-layout-header')        //Get the Header element
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')   //Assert the Header element has the expected background color

    const colors: Record<string, string> = { //Create an Object and define the Types for the key and value using Record<string, string>
        "Light":     'rgb(255, 255, 255)',
        "Dark":      'rgb(34, 43, 69)',
        "Cosmic":    'rgb(50, 50, 89)',
        "Corporate": 'rgb(255, 255, 255)',
    }

    await dropDownMenu.click()        //Click the dropdown menu to reopen it for the next iteration
    for(const color in colors){       //Iterate through the Object to get each key value                            
        await optionList.filter({ hasText: color}).click()        //Iterate through the Object to filter the List and click each theme option
        await expect(header).toHaveCSS('background-color', colors[color])
        if(color != "Corporate")    //Collapse the dropdown menu after each iteration except for the last one since the dropdown will automatically collapse after clicking the last option
            await dropDownMenu.click()        //Click the dropdown menu to reopen it for the next iteration
    }
})

test('Tooltips', async ({ page }) => {
    await page.getByText('Modal & Overlays').click()                                        //Navigate to the Modal & Overlays page via the Sidebar
    await page.getByText('Tooltip').click()                                                  //Select Tooltip from the Modal & Overlays submenu 
   
    const toolTipCard = page.locator('nb-card', { hasText: "Tooltip Placements" })           //Select the Card with the text value "Tooltip Placements"
    await toolTipCard.getByRole('button', {name: "Top"}).hover()        //Hover over the button with the name value "Top"

    page.getByRole('tooltip')        //If you have a role tooltip created in your application, you can use the getByRole method to locate it. This method allows you to find elements based on their ARIA roles, which can be useful for testing accessibility features.
    const tooltip = await page.locator('nb-tooltip').textContent()        //Get the text content of the tooltip element
    expect(tooltip).toEqual('This is a tooltip')        //Assert that the tooltip text content is as expected   
})

test('Dialog Box', async ({ page }) => {
    await page.getByText('Tables & Data').click()                                        //Navigate to the Tables & Data page via the Sidebar
    await page.getByText('Smart Table').click()                                                  //Select Smart Table from the Tables & Data submenu
    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')        //Assert that the dialog box message is as expected
        dialog.accept()        //Accept the dialog box
    })

    await page.getByRole('table').locator('tr', { hasText: "mdo@gmail.com" }).locator('.nb-trash').click()        //Locate the table row with the text value "
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')      //Assert that the first row of the table does not have the text value "mdo@gmail.com"
})

test('Web Tables', async ({ page }) => {
    await page.getByText('Tables & Data').click()                                        //Navigate to the Tables & Data page via the Sidebar
    await page.getByText('Smart Table').click()                                          //Select Smart Table from the Tables & Data submenu

    //1 Get the row by any Text in the row
    const targetRow = page.getByRole('row', {name: "twitter@outlook.com"})
    await targetRow.locator('.nb-edit').click()        //Click the Edit button in the row with the text value
    await page.locator('input-editor').getByPlaceholder('Age').clear()        //Clear the Age input field in the row with the text value
    await page.locator('input-editor').getByPlaceholder('Age').fill('35')        //Fill the Age input field in the row with the text value "twitter@outlook.com"
    await page.locator('.nb-checkmark').click()        //Click the Checkmark button in the row with the text value

    //2 Get the row based on the value in the specific column value
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()        //Click the page number 2 in the pagination navigation
    const targetRowById = page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')})        //Get the row with the ID value "11"    
    await targetRowById.locator('.nb-edit').click()        //Click the Edit button in the row with the ID value "11"
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()        //Clear the Email input field in the row with the ID value "11"
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com')        //Fill the Email input field in the row with the ID value "11"
    await page.locator('.nb-checkmark').click()        //Click the Checkmark button in the row with the text value
    await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.com')        //Assert that the Email column in the row with the ID value "11" has the expected text value
    
    //3 Loop through table rows to find a specific value in a specific column and perform an action

    const ages = ["20", "30", "40", "200"]        //Define an array of Age values to search for in the table

    for ( let age of ages) {        //Iterate through the array of Age values
        await page.getByPlaceholder('Age').fill(age)        //Fill the Age input field in the table header with the current Age value

        if(age == "200"){
            await expect(page.locator('tbody')).toContainText('No data found')          //Assert that the table body contains the text value "No data found" when searching for an Age value that does not exist in the table
        } else {
            await expect (page.locator('tbody tr').first().locator('td').last()).toHaveText(age)        //Assert that the Age column in the first row of the table has the expected text value
            const allTableRows = await page.locator('tbody tr').all()    //Get all the table rows in the table body
            for (let row of allTableRows) {        //Iterate through all the table rows
                await expect(row.locator('td').last()).toHaveText(age)        //Assert that the Age column in each row has the expected text value
            }
        }
    }
})

test ('Datepicker', async ({ page }) => {               //Navigate to the Datepicker page via the Sidebar
    await page.getByText('Forms').click()               //Click the Forms menu item in the Sidebar
    await page.getByText('Datepicker').click()          //Click the Datepicker submenu item in the Sidebar

    const calendarInputField  = page.getByPlaceholder('Form Picker')        //Get the Calendar input field by its placeholder value
    await calendarInputField.click()        //Click the Calendar input field to open the calendar widget

    const date = new Date();
    date.setDate(date.getDate() + 5)        //Get the date 5 days from today
    const expectedDay = date.getDate().toString()        //Get the day value of the date 5 days from today as a string
    const expectedMonth = date.toLocaleString('En-US', { month: 'short' })        //Get the month value of the date 5 days from today as a string
    const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' })        //Get the month value of the date 5 days from today as a string
    const expectedYear = date.getFullYear()                             //Get the year value of the date 5 days from today as a string
    const expectedDate = `${expectedMonth} ${expectedDay}, ${expectedYear}`        //Format the expected date as a string

    let currentMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()     //Get the current month and year displayed in the calendar widget
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`                     //Format the expected month and year as a string
    while(!currentMonthAndYear?.includes(expectedMonthAndYear)) {                           //While the current month and year displayed in the calendar widget does not include the expected month and year, click the next month button
        await page.locator('.next-month').click()           //Click the next month button in the calendar widget
        currentMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()     //Get the current month and year displayed in the calendar widget after clicking the next month button
    }


    await page.locator('.day-cell:not(.bounding-month)').getByText(expectedDay, {exact: true}).click()          //Get the day cell with the exact text value "2" that is not in the bounding month and click it
    await expect(calendarInputField).toHaveValue(expectedDate)     //Assert that the Calendar input field has the expected value after selecting the date

})