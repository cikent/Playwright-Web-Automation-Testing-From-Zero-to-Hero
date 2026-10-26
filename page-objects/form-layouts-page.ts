import { Page } from '@playwright/test'
import { step } from '../helpers/test-step-decorator'

export class FormLayoutsPage {
    //Declare a Private readonly property named page of type Page
    private readonly page: Page

    //Define a constructor utilizing this.page syntax that takes a Page object as a parameter and assigns it to the page property
    constructor(page: Page) {
        //Assign the passed Page object to the page property of the class
        this.page = page
    }

    /**
     * This method submits the grid form with user email, and the "Remember me" checkbox can be selected based on the boolean parameter rememberMeCheckbox.
     * @param email - Valid test user email address to be entered in the "Email" input field of the Grid form
     * @param password - Valid test user password to be entered in the "Password" input field of the Grid form
     * @param optionText - Text of the option to be selected in the grid form
     */
    @step
    async submitUsingTheGridForm(email: string, password: string, optionText: string) {
        const usingTheGridForm = this.page.locator('nb-card', { hasText: "Using the Grid" })
        await usingTheGridForm.getByRole('textbox', { name: "Email" }).fill(email)        //Get the Email input field by its role and name value within the "Using the Grid" form
        await usingTheGridForm.getByRole('textbox', { name: "Password" }).fill(password)   //Get the Password input field by its role and name value within the "Using the Grid" form
        await usingTheGridForm.getByLabel(optionText).check({ force: true })       //Force check even if element is not visible/interactive
        await usingTheGridForm.getByRole('button', { name: "Sign in" }).click()   //Get the Password input field by its role and name value within the "Using the Grid" form
    }

    /**
     * This method submits inline form with user full name, email, and the "Remember me" checkbox can be selected based on the boolean parameter rememberMeCheckbox.
     * @param fullName  - Valid test user full name (First and last name) to be entered in the "Full Name" input field of the Inline form
     * @param email - Valid test user email address to be entered in the "Email" input field of the Inline form
     * @param rememberMeCheckbox - Pass 'true' to select the "Remember me" checkbox, or 'false' to leave it unchecked
     */
    @step
    async submitInlineForm(fullName: string, email: string, rememberMeCheckbox: boolean) {
        const inlineForm = this.page.locator('nb-card', { hasText: "Inline form" })
        await inlineForm.getByRole('textbox', { name: "Jane Doe" }).fill(fullName)
        await inlineForm.getByRole('textbox', { name: "Email" }).fill(email)
        //Check the "Remember me" checkbox if the rememberMeCheckbox parameter is true
        if (rememberMeCheckbox) {
            await inlineForm.getByRole('checkbox').check({ force: true })
        }
        await inlineForm.getByRole('button', { name: "Submit" }).click()   //Get the Submit button by its role and name value within the "Inline form" form
    }
}