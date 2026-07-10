const {test,expect} = require('@playwright/test');


test('Core Hands-on', async ({browser}) => {

   
    const context = await browser.newContext(); // fresh instance
    const page = await context.newPage(); // new tabinstance

    const userName = page.locator('#username'); // locator for username text box
    const password = page.locator('[type=password]'); // locator for password text box 
    const signInBtn = page.locator('#signInBtn'); // locator for sign in button
    const dropdown = page.locator('select.form-control');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

     /*
    //Scenario 1: Complex Form - Fill multiple fields: Select dropdown > Choose radio > Submit > Validate success
    await userName.fill("rahulshettyacademy"); // enter correct username
    await password.fill("Learning@830$3mK2"); // enter correct password
   
    const radioButtons = page.locator('.radiotextsty');  // select radio button

    await dropdown.selectOption('Consultant'); // select the dropdown
    await page.pause(); // pause the test execution to see the selected option in dropdown
    console.log(await dropdown.inputValue()); // print the selected value in console
    
    await signInBtn.click();  
    */
    
    
    //Scenario 2: Validation Scenario - Leave the required field empty > Submit form > Validate error message
    await userName.fill(""); //locate sign in text box and enter the value
    await password.fill(""); // locate password text box and enter the value
    await signInBtn.click(); // Click on sign in button
    console.log(await page.locator('[style*="block"]').textContent()); //extracted error message and print in console
    await expect (page.locator('[style*="block"]')).toHaveText("Empty username/password.")// validate the error message


});