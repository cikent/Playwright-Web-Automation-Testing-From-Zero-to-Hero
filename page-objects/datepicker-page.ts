import { Page, expect } from '@playwright/test'
import { step } from '../helpers/test-step-decorator'

export class DatePickerPage {
    //Declare a Private readonly property named page of type Page
    private readonly page: Page

    //Define a constructor utilizing this.page syntax that takes a Page object as a parameter and assigns it to the page property
    constructor(page: Page) {
        //Assign the passed Page object to the page property of the class
        this.page = page
    }

    /**
     * This method selects a date from the common datepicker based on the number of days from today.
     * @param daysFromToday - Number of days from today to select
     */
    @step
    async selectCommonDatepickerDateFromToday(daysFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Form Picker')        //Get the Calendar input field by its placeholder value
        await calendarInputField.click()                                            //Click the Calendar input field to open the calendar widget
        const expectedDate = await this.selectDateInTheCalendar(daysFromToday)      //Call the private method selectDateInTheCalendar to select the date from the calendar widget 
        await expect(calendarInputField).toHaveValue(expectedDate)                  //Assert that the Calendar input field has the expected value after selecting the date
    }

    /**
     * This method selects a date range from the datepicker with range based on the number of days from today.
     * @param daysFromTodayStart - Number of days from today to select for the start date
     * @param endDaysFromTodayEnd - Number of days from today to select for the end date
     */
    @step
    async selectDatepickerWithRangeFromToday(daysFromTodayStart: number, endDaysFromTodayEnd: number) {
        const calendarInputField = this.page.getByPlaceholder('Range Picker')                 //Get the Calendar input field by its placeholder value
        await calendarInputField.click()                                                      //Click the Calendar input field to open the calendar widget
        const expectedDateStart = await this.selectDateInTheCalendar(daysFromTodayStart)      //Call the private method selectDateInTheCalendar to select the start date
        const expectedDateEnd = await this.selectDateInTheCalendar(endDaysFromTodayEnd)       //Call the private method selectDateInTheCalendar to select the end date
        const expectedRangeDate = `${expectedDateStart} - ${expectedDateEnd}`                 //Format the expected range date as a string
        await expect(calendarInputField).toHaveValue(expectedRangeDate)                       //Assert that the Calendar input field has the expected value after selecting the date
    }

    //Define a private asynchronous method named selectDateInTheCalendar that takes a number parameter daysFromToday
    private async selectDateInTheCalendar(daysFromToday: number) {
        //Get the date specified number of days from today
        const date = new Date();
        date.setDate(date.getDate() + daysFromToday)                                //Get the date specified number of days from today
        const expectedDay = date.getDate().toString()                               //Get the day value of the date from today as a string
        const expectedMonth = date.toLocaleString('En-US', { month: 'short' })      //Get the month value of the date from today as a string
        const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' })   //Get the month value of the date from today as a string
        const expectedYear = date.getFullYear()                                     //Get the year value of the date from today as a string
        const expectedDate = `${expectedMonth} ${expectedDay}, ${expectedYear}`     //Format the expected date as a string

        //Get the current month and year displayed in the calendar widget
        let currentMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()     //Get the current month and year displayed in the calendar widget
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`                          //Format the expected month and year as a string
        while (!currentMonthAndYear?.includes(expectedMonthAndYear)) {                               //While the current month and year displayed in the calendar widget does not include the expected month and year, click the next month button
            await this.page.locator('.next-month').click()           //Click the next month button in the calendar widget
            currentMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()     //Get the current month and year displayed in the calendar widget after clicking the next month button
        }

        //Get the day cell with the exact text value that is not in the bounding month and click it
        await this.page.locator('.day-cell:not(.bounding-month)').getByText(expectedDay, { exact: true }).click()   //Get the day cell with the exact text value "2" that is not in the bounding month and click it
        return expectedDate                                                                                         //Return the expected date as a string
    }
}