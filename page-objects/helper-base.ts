/**
* This class serves as a base class for page objects in the Playwright test framework. It provides common functionality and properties that can be shared among different page objects, promoting code reusability and maintainability.
*/
import { Page } from '@playwright/test'

export class HelperBase {
    //Declare a protected readonly property named page of type Page, which will be accessible to derived classes
    protected readonly page: Page

    /**
    * This constructor initializes the HelperBase class with a Playwright Page object. It assigns the provided Page object to the page property of the class, allowing derived classes to access and interact with the current browser page.
    * @param {Page} page - The Playwright Page object representing the current browser page.
    */
    constructor(page: Page) {
        //Assign the passed Page object to the page property of the class
        this.page = page
    }

    /**
    * This method retrieves the message from a Toastr notification on the page. It is a protected method, meaning it can be accessed by derived classes but not from outside the class hierarchy. The method returns a string representing the Toastr message.
    * @returns {Promise<string>} - A promise that resolves to the Toastr message string.
    */
    protected async getToastrMessage() {
        //This method is a placeholder for the actual implementation of retrieving the Toastr message from the page. The implementation may vary based on the specific application and its Toastr notification behavior.
        return "I'm a cool toaster!"
    }

}
