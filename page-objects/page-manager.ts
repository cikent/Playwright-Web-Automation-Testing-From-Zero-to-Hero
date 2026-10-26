/**
* This file defines the PageManager class, which serves as a central point for managing and accessing different page objects in the Playwright test framework. It encapsulates the navigation and interaction logic for various pages of the Bondar Academy Playground Application, including Form Layouts and Datepicker pages. The PageManager class provides a convenient way to navigate between pages and perform actions on them using parameterized methods.
* 
* The PageManager class is designed to be used in Playwright test cases, allowing testers to easily navigate through the application and perform actions on different pages. It promotes code reusability and maintainability by encapsulating page-specific logic within dedicated page objects.
*/
import { Page } from '@playwright/test'
import { NavigationPage } from '../page-objects/navigate-page'
import { FormLayoutsPage } from '../page-objects/form-layouts-page'
import { DatePickerPage } from '../page-objects/datepicker-page'

/**
 * The PageManager class serves as a central point for managing and accessing different page objects in the Playwright test framework. It encapsulates the navigation and interaction logic for various pages of the Bondar Academy Playground Application, including Form Layouts and Datepicker pages. The PageManager class provides a convenient way to navigate between pages and perform actions on them using parameterized methods.
 * 
 * The PageManager class is designed to be used in Playwright test cases, allowing testers to easily navigate through the application and perform actions on different pages. It promotes code reusability and maintainability by encapsulating page-specific logic within dedicated page objects.
 */
export class PageManager {
    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly FormLayoutsPage: FormLayoutsPage
    private readonly DatePickerPage: DatePickerPage

    /**
     * Creates an instance of the PageManager class.
     * @param {Page} page - The Playwright Page object representing the current browser page.
     */
    constructor(page: Page) {
        this.page = page;
        this.navigationPage = new NavigationPage(this.page)
        this.FormLayoutsPage = new FormLayoutsPage(this.page)
        this.DatePickerPage = new DatePickerPage(this.page)

    }

    /**
     * Gets the navigation page.
     * @returns {NavigationPage} The navigation page.
     */
    get navigateTo() {
        return this.navigationPage;
    }

    /**
     * Gets the form layouts page.
     * @returns {FormLayoutsPage} The form layouts page.
     */
    get formLayoutsPage() {
        return this.FormLayoutsPage;
    }

    /**
     * Gets the date picker page.
     * @returns {DatePickerPage} The date picker page.
     */
    get datePickerPage() {
        return this.DatePickerPage;
    }
}