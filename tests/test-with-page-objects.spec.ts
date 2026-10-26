/**
* This test suite demonstrates the use of Page Object Model (POM) in Playwright for navigating through different pages of the Bondar Academy Playground Application.
* It includes tests for navigating to the Form Layouts page, Datepicker page, Toaster page, Tooltip page, and Smart Table page.
* Additionally, it showcases parameterized methods in the Form Layouts and Datepicker pages.
 */
import { test } from '@playwright/test'
import { PageManager } from '../page-objects/page-manager'

/**
* Set up the test environment before each test case.
 */
test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/')            //Default URL for the Bondar Academy Playground Application > Form Layouts page

})

/**
* Navigate to the Form Layouts page and verify the navigation.
 */
test('Navigate to Form Layouts page', async ({ page }) => {
    const pom = new PageManager(page)
    await pom.navigateTo.formLayoutsPage()
    await pom.navigateTo.datePickerPage()
    await pom.navigateTo.toasterPage()
    await pom.navigateTo.tooltipPage()
    await pom.navigateTo.smartTablePage()
})

/**
* Test the parameterized methods of the Form Layouts and Datepicker page objects.
 */
test('Parameterized Page Object Methods', async ({ page }) => {
    const pom = new PageManager(page)
    await pom.navigateTo.formLayoutsPage()
    await pom.formLayoutsPage.submitUsingTheGridForm('ckent@test.com', 'Welcome', 'Option 2')
    await pom.formLayoutsPage.submitInlineForm('Chris Kent', 'ckent@test.com', false)
    await pom.navigateTo.datePickerPage()
    await pom.datePickerPage.selectCommonDatepickerDateFromToday(5)
    await pom.datePickerPage.selectDatepickerWithRangeFromToday(7, 20)
})