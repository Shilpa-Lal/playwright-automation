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

/*
test('Page Playwrite Test', async ({page}) => 
    {
        await page.goto("https://www.google.com");
        //get title - assertion
        console.log(await page.title()); // writes the title in console
        //if we dont put await here, it will not wait for the title to be printed and it will move to next line and it will print the promise object instead of the title
        await expect(page).toHaveTitle("Google"); //validates the title
        
        

    }) */