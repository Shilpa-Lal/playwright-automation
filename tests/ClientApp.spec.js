const {test,expect} = require('@playwright/test');


test('Browser Context-Validating Error Login', async ({page}) => 
{
    await page.goto("https://rahulshettyacademy.com/client/");
    
    await page.locator('#userEmail').fill("lal.shilpa4@gmail.com");
    await page.locator('#userPassword').fill("Admin@123");
    await page.locator('#login').click();
    //await page.waitForLoadState('networkidle'); // wait for the page to load completely - might be flacky
    await page.locator('.card-body b').first().waitFor(); // wait for the first card title to be visible - more reliable than waitForLoadState  


//console.log(await cardTitles.first().textContent()); // grab the first card title and print in console

const titles = await page.locator(".card-body b").allTextContents();
console.log(titles);








});
