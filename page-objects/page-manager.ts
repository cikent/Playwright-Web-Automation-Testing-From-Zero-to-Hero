//Import the Page class from the Playwright test module and the NavigationPage, FormLayoutsPage, and DatePickerPage classes from their respective page object files
import { Page } from '@playwright/test'
import { NavigationPage } from '../page-objects/navigate-page'
import { FormLayoutsPage } from '../page-objects/form-layouts-page'
import { DatePickerPage } from '../page-objects/datepicker-page'

    /**
     * This class serves as a centralized manager for page objects in the application, providing easy access to instances of NavigationPage, FormLayoutsPage, and DatePickerPage.
     */
export class PageManager {

    readonly navigateTo: NavigationPage
    readonly formLayoutsPage: FormLayoutsPage
    readonly datePickerPage: DatePickerPage

    /**
     * This constructor initializes the PageManager class with instances of NavigationPage, FormLayoutsPage, and DatePickerPage.
     */
    constructor(page: Page) {
        this.navigateTo = new NavigationPage(page)
        this.formLayoutsPage = new FormLayoutsPage(page)
        this.datePickerPage = new DatePickerPage(page)

    }
}