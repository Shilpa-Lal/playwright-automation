const {test,expect} = require('@playwright/test');


test('First Playwrite Test', async ({browser}) => {

//declare the variables here so that we can use them in the test cases
const context = await browser.newContext(); // fresh instance
const page = await context.newPage(); // new tabinstance
const userName = page.locator('#username'); // locator for username text box
const password = page.locator('[type=password]'); // locator for password text box 
const signInBtn = page.locator('#signInBtn'); // locator for sign in button
const cardTitles = page.locator(".card-body a"); // locator for card titles


await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
console.log(await page.title()); // writes the title in console

// write test cases here
//sign in
// given wrong username to validate error message
//await page.locator('#username').fill("rahulshetty"); //locate sign in text box and enter the value
//await page.locator('[type=password]').fill("learning"); // locate password text box and enter the value

await userName.fill("rahulshetty"); //locate sign in text box and enter the value
await password.fill("learning"); // locate password text box and enter the value
await signInBtn.click(); // Click on sign in button
console.log(await page.locator('[style*="block"]').textContent()); //extracted error message and print in console
//await expect (page.locator('[style*="block"]').toContainText("Incorrected"))// test will fail incorrect error message
await expect (page.locator('[style*="block"]')).toHaveText("Incorrect username/password.")// validate the error message

await userName.fill(""); // clear the username text box
await userName.fill("rahulshettyacademy"); // enter correct username
await password.fill("Learning@830$3mK2"); // enter correct password
await signInBtn.click();    

//once login, grab the first card title and print in console
console.log(await cardTitles.first().textContent()); // grab the first card title and print in console
console.log(await cardTitles.nth(1).textContent()); // grab the second card title and print in console

//to fetch all the card titles at once, we can use loop
const allTitles = await cardTitles.allTextContents();
console.log(allTitles); // print all the card titles in console as an array
allTitles.forEach(title => console.log(title)); // print all the card titles in console

});

test('UI Controls', async ({page}) => 
    {
     
await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
const userName = page.locator('#username');
const password = page.locator('[type=password]'); 
const dropdown = page.locator('select.form-control');
const signInBtn = page.locator('#signInBtn');

await userName.fill("rahulshettyacademy");
await password.fill("Learning@830$3mK2"); 

// select radio button
const radioButtons = page.locator('.radiotextsty');
//await radioButtons.nth(1).click(); // click on second radio button
await radioButtons.last().click(); // click on last radio button
await page.locator('#okayBtn').click(); // click on ok button in alert popup
//assertions to validate if the radio button is selected or not
//await expect(page.locator('.radiotextsty').last().toBeChecked(); // validate if the second radio button is selected
console.log(await radioButtons.nth(1).isChecked()); // validate if the second radio button is selected
console.log(await radioButtons.nth(0).isChecked()); // validate if the first radio button is not selected 

// select option from dropdown by value
await dropdown.selectOption('consultant'); 
//await page.pause(); // pause the test execution to see the selected option in dropdown
console.log(await dropdown.inputValue()); // print the selected value in console

      
//select checkbox
await page.locator('#terms').check(); // check the checkbox
console.log(await page.locator('#terms').isChecked()); // validate if the checkbox is checked
await page.locator('#terms').uncheck(); // uncheck the checkbox
console.log(await page.locator('#terms').isChecked()); // validate if the checkbox is unchecked

//to check the link is blincking
const documentLink = page.locator("[href*='documents-request']");
await expect(documentLink).toHaveAttribute("class","blinkingText"); // validate the link is blinking by checking the class attribute value

//on clicking link, page will open in seperate tab


    })