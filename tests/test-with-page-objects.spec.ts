/**
* This test suite demonstrates the use of Page Object Model (POM) in Playwright for navigating through different pages of the Bondar Academy Playground Application.
* It includes tests for navigating to the Form Layouts page, Datepicker page, Toaster page, Tooltip page, and Smart Table page.
* Additionally, it showcases parameterized methods in the Form Layouts and Datepicker pages.
 */
import { test } from '../fixture'
import { faker } from '@faker-js/faker'

/**
* Navigate to the Form Layouts page and verify the navigation.
 */
test('Navigate to Form Layouts page', async ({ pom }) => {
    await pom.navigateTo.formLayoutsPage()
    await pom.navigateTo.datePickerPage()
    await pom.navigateTo.toasterPage()
    await pom.navigateTo.tooltipPage()
    await pom.navigateTo.smartTablePage()
})

/**
* Test the parameterized methods of the Form Layouts and Datepicker page objects.
 */
test('Parameterized Page Object Methods', async ({ pom }) => {
    const randomFullName = faker.person.fullName()
    const randomEmail = faker.internet.email({ provider: 'test.com' })

    await pom.navigateTo.formLayoutsPage()
    await pom.formLayoutsPage.submitUsingTheGridForm(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!, 'Option 2')
    // await pom.waitForTimeout(500) // Wait for 500 milliseconds to ensure the form submission is processed
    // await pom.screenshot({ path: 'screenshots/form-layouts.png' })  // Option 1: Capture a screenshot of the Form Layouts page after form submission
    // const formLayoutPageBuffer = await pom.screenshot({ path: 'screenshots/form-layouts.png' })  // Option 2: Log the screenshot buffer to the console for debugging purposes
    //console.log(formLayoutPageBuffer.toString('base64'))        // Log the screenshot buffer to the console in base64 format for debugging purposes

    await pom.formLayoutsPage.submitInlineForm(randomFullName, randomEmail, false)
    //await pom.locator('nb-card', { hasText: "Inline form" }).screenshot({ path: 'screenshots/inlineForm.png' })      // Capture a screenshot of the Inline form after submission
    await pom.navigateTo.datePickerPage()
    await pom.datePickerPage.selectCommonDatepickerDateFromToday(5)
    await pom.datePickerPage.selectDatepickerWithRangeFromToday(7, 20)
    await pom.navigateTo.smartTablePage()
})