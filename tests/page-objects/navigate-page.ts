//Import {Page} from '@playwright/test' and other required modules
import {Page} from '@playwright/test'

//Define and export a CamelCase class named NavigationPage that represents the navigation page object
export class NavigationPage {

    //Declare a readonly property named page of type Page
    readonly page: Page

    //Define a constructor utilizing this.page syntax that takes a Page object as a parameter and assigns it to the page property
    constructor(page: Page) {
        //Assign the passed Page object to the page property of the class
        this.page = page
    }

    //Define an asynchronous method named formLayoutsPage that navigates to the Form Layouts page
    async formLayoutsPage() {
        //Use the page's getByText property to interact with the page Text value
        await this.page.getByText('Forms').click()
        //Use the page's getByText property to interact with the page Text value
        await this.page.getByText('Form Layouts').click()
    }
}