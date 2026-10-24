//Import {Page} from '@playwright/test' and other required modules
import {Page} from '@playwright/test'

//Define and export a CamelCase class named NavigationPage that represents the navigation page object
export class NavigationPage {

    //Declare a Private readonly property named page of type Page
    private readonly page: Page

    //Define a constructor utilizing this.page syntax that takes a Page object as a parameter and assigns it to the page property
    constructor(page: Page) {
        //Assign the passed Page object to the page property of the class
        this.page = page
    }

    //Define an asynchronous method named formLayoutsPage that navigates to the Form Layouts page
    async formLayoutsPage() {
        //Call the private method selectGroupMenuItem to ensure the Forms menu is expanded
        await this.selectGroupMenuItem('Forms') 
        //Use the page's getByText property to interact with the page Text value
        await this.page.getByText('Form Layouts').click()
    }

    //Define an asynchronous method named datePickerPage that navigates to the Datepicker page
    async datePickerPage() {
        //Call the private method selectGroupMenuItem to ensure the Forms menu is expanded
        await this.selectGroupMenuItem('Forms')
        await this.page.waitForTimeout(1000)                     //Wait for 1 second to allow the page to load
        await this.page.getByText('Datepicker').click()          //Click the Datepicker submenu item in the Sidebar

    }

    //Define an asynchronous method named toasterPage that navigates to the Toaster page
    async toasterPage() {
        //Call the private method selectGroupMenuItem to ensure the Modal & Overlays menu is expanded
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()                                                  //Select Toastr from the Modal & Overlays submenu

    }

    //Define an asynchronous method named tooltipPage that navigates to the Tooltip page
    async tooltipPage() {
        //Call the private method selectGroupMenuItem to ensure the Modal & Overlays menu is expanded
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()                                                  //Select Tooltip from the Modal & Overlays submenu 


    }

    //Define an asynchronous method named smartTablePage that navigates to the Smart Table page
    async smartTablePage() {
        //Call the private method selectGroupMenuItem to ensure the Tables & Data menu is expanded
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()                                          //Select Smart Table from the Tables & Data submenu

    }

    //Define a private asynchronous method named selectGroupMenuItem that takes a string parameter groupMenuTitle
    private async selectGroupMenuItem(groupMenuTitle: string){
        const groupMenuItem = this.page.getByTitle(groupMenuTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        //If the group menu item is not expanded, click it to expand the menu
        if (expandedState == 'false') {
            await groupMenuItem.click()
        }
    }
}