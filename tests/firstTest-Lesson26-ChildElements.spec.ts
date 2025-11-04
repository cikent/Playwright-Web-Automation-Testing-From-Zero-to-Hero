import {test} from '@playwright/test'


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
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()                         //Example 1, Use concise Locator method
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()   //Example 2, Use verbose/distinct Locator methods

    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()        //Example 3, Use Locator with getBy methods

    await page.locator('nb-card').nth(3).getByRole('button').click()                            //Example 4, Use Locator with nth() method; Index starts from 0
})