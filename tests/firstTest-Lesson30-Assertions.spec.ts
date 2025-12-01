import {test, expect} from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator Syntax Rules', async ({page}) => {
    //by Tag name
    await page.locator('input').first().click()

    //by ID
    page.locator('#inputEmail1')

    //by Class name
    page.locator('.shape-rectangle')

    //by Attribute bame
    page.locator('[placeholder="Email"]')

    //by Class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //Combine different selectors
    page.locator('input[placeholder="Email"][nbinput]')

    //by XPath (NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1"]')

    //by Partial text match
    page.locator(':text("Using")')

    //by Exact text match
    page.locator(':text-is("Using the Grid")')
})

test('User Facing Locators', async ({page}) => {
    await page.getByRole('textbox', {name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    await page.getByTestId('SignIn').click()

    await page.getByTitle('IoT Dashboard').click()
})

test('Locating Child Elements', async ({page}) => {
    //Example 1, Use concise Locator method
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    //Example 2, Use verbose/distinct Locator methods
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    //Example 3, Use Locator with getBy methods
    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()

    //Example 4, Use Locator with nth() method; Index starts from 0
    await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('Locating Parent Elements', async ({page}) => {
    //Example 1: Locate parent element with Text and child element by Role and Name
    await page.locator('nb-card', { hasText: "Using the Grid"}).getByRole('textbox', { name: "Email" }).click()
    //Example 2: Locate parent element with Id and child element by Role and Name
    await page.locator('nb-card', { has: page.locator('#inputEmail1') }).getByRole('textbox', { name: "Email" }).click()

    //Example 3: Locate parent element with Filter by Text and child element by Role and Name
    await page.locator('nb-card').filter({ hasText: "Basic form" }).getByRole('textbox', { name: "Email" }).click()
    //Example 4: Locate parent element with Filter by child Locator and child element by Role and Name
    await page.locator('nb-card').filter({ has: page.locator('.status-danger')}).getByRole('textbox', { name: "Password" }).click()
    //Example 5: Locate parent element with Filters for Checkbox & Sign in text then child element by Role and Name 
    await page.locator('nb-card').filter({ has: page.locator('nb-checkbox') }).filter({ hasText: "Sign in" }).getByRole('textbox', { name: "Email" }).click()
    //Example 6: Locate parent element with Text Has then XPath up to Parent ('..') then child element by Role and Name
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', { name: "Email" }).click()
})

test('Reusing the Locators', async ({page}) => {
    //Create a Constant to store the parent locator
    const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
    //Create a Constant to store the child locator
    const emailField = basicForm.getByRole('textbox', { name: "Email" })
    
    //Use the child locator constant to perform actions/assertions
    await emailField.fill('test@test.com')
    //Use the parent locator constant to perform actions on other child elements
    await basicForm.getByRole('textbox', { name: "Password" }).fill('Welcome123')
    //Use the parent locator constant to find the checkbox and perform actions
    await basicForm.locator('nb-checkbox').click()
    //Use the parent locator constant to find the button and perform actions
    await basicForm.getByRole('button').click()

    //Assertion to verify email field value
    await expect(emailField).toHaveValue('test@test.com')
})

test('Extracting Values', async ({page}) => {
    //Single Test Value
    const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //All Text Values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain("Option 1")

    //Input Value
    const emailField = basicForm.getByRole('textbox', { name: "Email" })
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    //Attribute Value
    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
})

test('Assertions', async ({page}) => {
    const basicFormButton = page.locator('nb-card').filter({ hasText: "Basic form" }).locator('button')
    
    //General Assertions will NOT wait for any conditions and execute immediately unpon reaching the line
    const value = 5
    expect(value).toEqual(5)

    //Create a variable to Store the button locator text value
    const buttonText = await basicFormButton.textContent()
    expect(buttonText).toEqual("Submit")

    //Locator Assertion will wait for up to 5 seconds by default
    await expect(basicFormButton).toHaveText('Submit')

    //Soft Assertion will NOT stop the test execution upon failure
    await expect.soft(basicFormButton).toHaveText('Submit5')
    await basicFormButton.click()
}) 