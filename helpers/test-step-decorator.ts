//This file defines a custom decorator function named "step" that can be used to wrap methods in a class. The purpose of this decorator is to log the execution of the decorated method as a step in Playwright's test report. It uses the "test.step" function from Playwright's testing library to achieve this.
import { test } from '@playwright/test'

//Define a function named step that takes two parameters: target of type Function and context of type ClassMethodDecoratorContext
export function step(target: Function, context: ClassMethodDecoratorContext) {
    return function replacementMethod(this: any, ...args: any) {
        const name = this.constructor.name + '.' + (context.name as string);
        return test.step(name, async () => {
            return await target.call(this, ...args);
        });
    };
}