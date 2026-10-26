import { Page } from '@playwright/test'
import { step } from '../helpers/test-step-decorator'

//Define and export a CamelCase class named NavigationPage that represents the navigation page object
export class NavigationPage {

    //Declare a Private readonly property named page of type Page
    private readonly page: Page

    //Define a constructor utilizing this.page syntax that takes a Page object as a parameter and assigns it to the page property
    constructor(page: Page) {
        //Assign the passed Page object to the page property of the class
        this.page = page
    }

    /**
     * This method navigates to the Form Layouts page by expanding the Forms menu and clicking on the Form Layouts submenu item.
     * It uses the private method selectGroupMenuItem to ensure the Forms menu is expanded before clicking on the submenu item.
     * The method is decorated with the @step decorator to log the step in the test report.
     * 
     * @returns {Promise<void>} - A promise that resolves when the navigation is complete.
     */
    @step
    async formLayoutsPage() {
        //Call the private method selectGroupMenuItem to ensure the Forms menu is expanded
        await this.selectGroupMenuItem('Forms')
        //Use the page's getByText property to interact with the page Text value
        await this.page.getByText('Form Layouts').click()
    }

    /**
     * This method navigates to the Datepicker page by expanding the Forms menu and clicking on the Datepicker submenu item.
     * It uses the private method selectGroupMenuItem to ensure the Forms menu is expanded before clicking on the submenu item.
     * The method is decorated with the @step decorator to log the step in the test report.
     * 
     * @returns {Promise<void>} - A promise that resolves when the navigation is complete.
     */
    @step
    async datePickerPage() {
        //Call the private method selectGroupMenuItem to ensure the Forms menu is expanded
        await this.selectGroupMenuItem('Forms')
        //Use the page's getByText property to interact with the page Text value
        await this.page.getByText('Datepicker').click()          //Click the Datepicker submenu item in the Sidebar
    }

    /**
     * This method navigates to the Toaster page by expanding the Modal & Overlays menu and clicking on the Toastr submenu item.
     * It uses the private method selectGroupMenuItem to ensure the Modal & Overlays menu is expanded before clicking on the submenu item.
     * The method is decorated with the @step decorator to log the step in the test report.
     */
    @step
    async toasterPage() {
        //Call the private method selectGroupMenuItem to ensure the Modal & Overlays menu is expanded
        await this.selectGroupMenuItem('Modal & Overlays')
        //Use the page's getByText property to interact with the page Text value
        await this.page.getByText('Toastr').click()                                                  //Select Toastr from the Modal & Overlays submenu
    }

    /**
     * This method navigates to the Tooltip page by expanding the Modal & Overlays menu and clicking on the Tooltip submenu item.
     * It uses the private method selectGroupMenuItem to ensure the Modal & Overlays menu is expanded before clicking on the submenu item.
     * The method is decorated with the @step decorator to log the step in the test report.
     */
    @step
    async tooltipPage() {
        //Call the private method selectGroupMenuItem to ensure the Modal & Overlays menu is expanded
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()                                                  //Select Tooltip from the Modal & Overlays submenu 
    }

    /**
     * This method navigates to the Smart Table page by expanding the Tables & Data menu and clicking on the Smart Table submenu item.
     * It uses the private method selectGroupMenuItem to ensure the Tables & Data menu is expanded before clicking on the submenu item.
     * The method is decorated with the @step decorator to log the step in the test report.
     */
    @step
    async smartTablePage() {
        //Call the private method selectGroupMenuItem to ensure the Tables & Data menu is expanded
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()                                          //Select Smart Table from the Tables & Data submenu
    }

    //Define a private asynchronous method named selectGroupMenuItem that takes a string parameter groupMenuTitle
    private async selectGroupMenuItem(groupMenuTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupMenuTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        //If the group menu item is not expanded, click it to expand the menu
        if (expandedState == 'false') {
            await groupMenuItem.click()
        }
    }
}