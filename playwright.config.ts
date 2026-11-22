/**
* Import the necessary modules and configure environment variables for Playwright testing.
* This configuration file sets up the test environment, including timeouts, reporters, and browser projects.
* It also loads environment variables from a .env file based on the specified TEST_ENV variable.
 */
import { defineConfig, devices } from '@playwright/test';

import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, process.env.TEST_ENV ? `.env.${process.env.TEST_ENV}` : '.env') });

/**
* Global configuration for Playwright tests, including timeouts, reporters, and browser projects.
* The configuration also specifies the base URL for the application under test and enables trace collection on first retry.
 */
export default defineConfig({
  // Main configuration options for Playwright tests, including timeouts, reporters, and browser projects.
  timeout: 10000,                   // Test timeout for each test; default is 30 seconds / 30000 ms
  globalTimeout: 60000,            // Global timeout for the whole test suite; no default

  expect: {
    timeout: 5000,                  // Maximum time expect() should wait for the condition to be met; default is 5000 ms
  },
  fullyParallel: true,      // Run tests in files in parallel
  retries: 1,           // Retry on CI only; default is 0
  reporter: 'html',
  //reporter: [['line'], ['allure-playwright']],      // Use the 'line' reporter for console output and the 'allure-playwright' reporter for generating Allure reports

  // Use the following options for the test environment, including base URL, trace collection, and video recording.
  use: {
    baseURL: process.env.URL,           // Base URL for the application under test; default is 'http://localhost:3000'
    trace: 'on-first-retry',            // Collect trace when retrying the failed test; default is 'off'
    video: 'off'                         // Via CI Record video for each test; default is 'off'
  },

  /**
  * Projects define the different browser configurations to run the tests against, including Chromium, Firefox, and WebKit.
  * Each project specifies the browser name and the device configuration to use for testing.  
   */
  projects: [
    // {
    //   name: 'mobile-test',
    //   use:{
    //     ...devices['iPhone 17 Pro'],   // Use the iPhone 17 Pro device configuration for mobile tests
    //   }
    // },
    {
      name: 'page-object-tests',
      testMatch: '*page-object.spec.ts' // Match test files for page object tests
    },
    {
      name: 'chromium',
      timeout: 20000,                   // Test timeout for Chromium browser tests; default is 30000 ms
      retries: 3,           // Retry on CI only for Chromium browser tests; default is 0
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
