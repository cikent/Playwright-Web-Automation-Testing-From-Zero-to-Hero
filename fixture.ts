/**
* Fixture for initializing the PageManager instance
 */
import { test as base } from '@playwright/test'
import { PageManager } from './page-objects/page-manager'

type FixtureTypes = {
    pom: PageManager
}

export const test = base.extend<FixtureTypes>({
    /**
    * Before each test (Setup), navigate to the base URL and create a new instance of PageManager.
    * The PageManager instance is then passed to the test context for use in the tests.
    */
    pom: async ({ page }, use) => {
        await page.goto('/')
        const manager = new PageManager(page)
        await use(manager)

    }
    /**
    * After each test (Teardown), perform any necessary cleanup actions.
    * This can include closing the browser, clearing cookies, or resetting any modified state.
    * The teardown logic is executed after the test has completed, regardless of whether it passed or failed.
    */
})