import {test} from '@playwright/test'
//Important Note | Two Important Principles:
//1. DRY: Don't Repeat Yourself - Avoid repeating code in multiple places, instead use functions or variables to store reusable code.
//2. KISS: Keep It Simple, Stupid - Avoid overcomplicating code, instead use simple and straightforward solutions that are easy to understand and maintain.

//Important Note | Two useful practices:
//1. Descriptive naming: Use descriptive names for variables, functions, and test cases to make the code more readable and understandable.
//2. Avoid tiny methods: Avoid creating tiny methods that do very little, instead create methods that perform meaningful actions and have a clear purpose.

test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/')            //Default URL for the Bondar Academy Playground Application > Form Layouts page

])

test('Navigate to Form Layouts page', async ({ page }) => {

})
