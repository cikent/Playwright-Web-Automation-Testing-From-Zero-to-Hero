/**
* This file defines a decorator function named `step` that can be used to annotate methods in Playwright test classes. The `step` decorator logs the execution of the decorated method as a step in Playwright's test report, providing better visibility into the test execution flow. It takes the target method and its context as parameters and returns a replacement method that wraps the original method with step logging functionality.
*/
import { test } from '@playwright/test'

/**
 * A decorator function that logs the execution of the decorated method as a step in Playwright's test report.
 * @param target - The method to be decorated.
 * @param context - The context of the decorated method.
 * @returns A function that wraps the original method with step logging.
 */
export function step(target: Function, context: ClassMethodDecoratorContext) {
    return function replacementMethod(this: any, ...args: any) {
        const name = this.constructor.name + '.' + (context.name as string);
        return test.step(name, async () => {
            return await target.call(this, ...args);
        });
    };
}