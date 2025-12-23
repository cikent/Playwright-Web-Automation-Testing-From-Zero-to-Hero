import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page}, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000)                           // extend timeout for each test in this file by 2 seconds
})

test('Auto Waiting', async ({ page }) => {
    const successButton = page.locator('.bg-success')

    //await successButton.click()

    //const text = await successButton.textContent()
    //await successButton.waitFor({ state: "attached" })
    //const text = await successButton.allTextContents()

    //expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test('Alternative Waits', async ({ page }) => {
    const successButton = page.locator('.bg-success')

    //___ wait for element
    //await page.waitForSelector('.bg-success')

    //___ wait for particular response
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //___ wait for network calls to be completed ('NOT RECOMMENDED')
    await page.waitForLoadState('networkidle')
    
    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})

test('Timeouts', async ({ page }) => {
    //test.setTimeout(10000)                                                    // overriding default test timeout of 40 seconds
    test.slow()                                                                 // marks test as slow to attempt playwright.config.ts's timeout config value 3 times before failing the test
    const successButton = page.locator('.bg-success')
    await successButton.click()
})