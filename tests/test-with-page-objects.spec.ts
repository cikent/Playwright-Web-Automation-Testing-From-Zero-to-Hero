//Import { test, expect } from '@playwright/test' and other required modules
import {test} from '@playwright/test'
import { NavigationPage } from './page-objects/navigate-page'
import { FormLayoutsPage } from './page-objects/form-layouts-page'
import { DatePickerPage } from './page-objects/datepicker-page'

//Define Preconditions for the test suite using test.beforeEach hook
test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/')            //Default URL for the Bondar Academy Playground Application > Form Layouts page

})

test('Navigate to Form Layouts page', async ({ page }) => {
    //Create an new instance of the NavigationPage class and pass the page object to it
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datePickerPage()
    await navigateTo.toasterPage()
    await navigateTo.tooltipPage()
    await navigateTo.smartTablePage()
})

test('Parameterized Page Object Methods', async ({ page }) => {
    //Create an new instance of the NavigationPage class and pass the page object to it
    const navigateTo = new NavigationPage(page)
    const formLayoutsPage = new FormLayoutsPage(page)
    const datePickerPage = new DatePickerPage(page)
    await navigateTo.formLayoutsPage()
    await formLayoutsPage.submitUsingTheGridForm('ckent@test.com', 'Welcome', 'Option 2')
    await formLayoutsPage.submitInlineForm('Chris Kent', 'ckent@test.com', false)
    await navigateTo.datePickerPage()
    await datePickerPage.selectCommonDatepickerDateFromToday(5)
    await datePickerPage.selectDatepickerWithRangeFromToday(7, 20)
})