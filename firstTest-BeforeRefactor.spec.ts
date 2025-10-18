import {test} from '@playwright/test'

test.beforeAll(async () => {
    console.log('This is the beginning of the tests')
})

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
})

test('Navigate to the Form Layouts Page', async ({page}) => {
    await page.getByText('Form Layouts').click()
})

test('Navigate to Datepicker Page', async ({ page }) => {
    await page.getByText('Datepicker').click()
})

test.afterAll(async () => {
    console.log('This is the end of the tests')
})

// test.describe('test suite 1', () => {
//     test('the second test', () => {
//     })
//     test('the third test', () => {
//     })
//     test('the forth test', () => {
//     })
// })

// test.describe.only('test suite 2', () => {
//     test('the fifth test', () => {
//     })
//     test('the sixth test', () => {
//     })
//     test('the seventh test', () => {
//     })
// })