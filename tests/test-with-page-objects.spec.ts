/**
* This test suite demonstrates the use of Page Object Model (POM) in Playwright for navigating through different pages of the Bondar Academy Playground Application.
* It includes tests for navigating to the Form Layouts page, Datepicker page, Toaster page, Tooltip page, and Smart Table page.
* Additionally, it showcases parameterized methods in the Form Layouts and Datepicker pages.
 */
import { test } from '@playwright/test'
import { PageManager } from '../page-objects/page-manager'
import { faker } from '@faker-js/faker'

/**
* Set up the test environment before each test case.
 */
test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

/**
* Navigate to the Form Layouts page and verify the navigation.
 */
test('Navigate to Form Layouts page', async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo.formLayoutsPage();
    await pm.navigateTo.datePickerPage();
    await pm.navigateTo.toasterPage();
    await pm.navigateTo.tooltipPage();
    await pm.navigateTo.smartTablePage();
})

/**
* Test the parameterized methods of the Form Layouts and Datepicker page objects.
 */
test('Parameterized Page Object Methods', async ({ page }) => {
    const pom = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = faker.internet.email({ provider: 'test.com' })

    await pom.navigateTo.formLayoutsPage()
    await pom.formLayoutsPage.submitUsingTheGridForm(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!, 'Option 2')
    await page.waitForTimeout(500) // Wait for 500 milliseconds to ensure the form submission is processed
    await page.screenshot({ path: 'screenshots/form-layouts.png' })  // Option 1: Capture a screenshot of the Form Layouts page after form submission
    const formLayoutPageBuffer = await page.screenshot({ path: 'screenshots/form-layouts.png' })  // Option 2: Log the screenshot buffer to the console for debugging purposes
    //console.log(formLayoutPageBuffer.toString('base64'))        // Log the screenshot buffer to the console in base64 format for debugging purposes
    
    await pom.formLayoutsPage.submitInlineForm(randomFullName, randomEmail, false)
    await page.locator('nb-card', { hasText: "Inline form" }).screenshot({ path: 'screenshots/inlineForm.png' })      // Capture a screenshot of the Inline form after submission
    await pom.navigateTo.datePickerPage()
    await pom.datePickerPage.selectCommonDatepickerDateFromToday(5)
    await pom.datePickerPage.selectDatepickerWithRangeFromToday(7, 20)
    await pom.navigateTo.smartTablePage()
})