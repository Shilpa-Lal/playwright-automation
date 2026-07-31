// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { on } from 'node:cluster';
import { trace } from 'node:console';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });
/**
 * @see https://playwright.dev/docs/test-configuration
 */

// config is a variable which holds all the information like timeout, browser
const config = ({ 
  testDir: './tests',
  //timepout for each test case
  timeout: 50 * 1000,
  //timeout excluesively for all expect assertion 
  expect: {
    timeout: 50 * 1000,
  },
  reporter: 'html', //reporter to generate html report after test execution
  use: {
    browserName: 'chromium', //browser we want to run
    //browserName: 'firefox',
    //browserName: 'webkit', //safari
    headless: false, //to see the browser action
    screenshot : 'on',
    trace : 'Trace : ‘retained-on-failure’'

    
  },
  
});
module.exports = config; // export this variable so that it will be available across your project

