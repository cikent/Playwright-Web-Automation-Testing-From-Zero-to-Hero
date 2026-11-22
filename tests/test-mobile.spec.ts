import { test, expect } from '@playwright/test'



test('Input Fields', { tag: ['@smoke', '@fields'] }, async ({ page }, testInfo) => {
    await page.goto('/')
    if(testInfo.project.name == 'mobile-test') {
        await page.locator('.sidebar-toggle').click()        //Click on the sidebar toggle button to open the sidebar menu
    }
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    if (testInfo.project.name == 'mobile-test') {
        await page.locator('.sidebar-toggle').click()        //Click on the sidebar toggle button to open the sidebar menu
    }
    const usingTheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: 'Email' })        //Get the Email input field by its role and name value within the "Using the Grid" form
    await usingTheGridEmailInput.fill('test@test.com')      //Fill the email input field
})