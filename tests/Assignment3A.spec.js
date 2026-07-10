const {test,expect} = require('@playwright/test');


test('Child Window Pop-Up Handling', async ({browser}) => {

   
    const context = await browser.newContext(); // fresh instance
    const page = await context.newPage(); // new tabinstance
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

    //Child Window / Popup Handling (30 mins) :Click → opens a new window > Switch context > Validate something > Return to the main page
    const documentLink = page.locator("[href*='documents-request']");
    //await expect(documentLink).toHaveAttribute("class","blinkingText"); // validate the link is blinking by checking the class attribute value 
    const [newPage] = await Promise.all
    ([
    context.waitForEvent('page'), // wait for the new page to open
    documentLink.click(),
    ]);  // new page is opened in new tab
    const text = await newPage.locator(".red").textContent(); // wait for the element with class red to be visible in the new page
    console.log(text); // print the element in console

     await newPage.close(); // Close the new tab
    await page.bringToFront(); // Continue on the main page

    //Validate text on main page after returning from new tab
    const mainPageText = await page.locator('[for="username"]').textContent(); // wait for the element with for="username" to be visible in the main page
    console.log(mainPageText); // print the element in console



});