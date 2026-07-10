const {test,expect} = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
});

test('Dropdown loads after a delay', async ({page}) => {

    const dropdown = page.locator('select.form-control');

    await expect(dropdown).toBeVisible();     // Wait for dropdown to be visible
    await dropdown.selectOption('Teacher');  // Select Teacher
    await expect(dropdown).toHaveValue('teach'); // Verify selection
});

test('Button enabled only after the checkbox', async ({page}) => {
    
    const userName = page.locator('#username'); // locator for username text box
    const password = page.locator('[type=password]'); // locator for password text box 
    const signInBtn = page.locator('#signInBtn'); // locator for sign in button
    const checkBox = page.locator('#terms');

    await userName.fill("rahulshettyacademy"); // enter correct username
    await password.fill("Learning@830$3mK2"); // enter correct password
   
    const radioButtons = page.locator('.radiotextsty');  // select radio button

    // Check the initial state
    if (await signInBtn.isDisabled()) {
        console.log('Sign In button is disabled initially');
    } else {
        console.log('Sign In button is enabled initially');
    }

    await checkBox.check();  // Accept Terms & Conditions

    await expect(checkBox).toBeChecked();  // Verify checkbox is checked

    await expect(signInBtn).toBeEnabled({ timeout: 5000 });   // If the button is enabled after checking the checkbox

    await signInBtn.click();  // Click Sign In



});