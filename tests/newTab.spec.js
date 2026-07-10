const {test,expect} = require('@playwright/test');


test('Link opens in new tab', async ({browser}) => 
{
    const context = await browser.newContext(); // fresh instance
    const page = await context.newPage(); // new tabinstance

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

    const documentLink = page.locator("[href*='documents-request']");
    //await expect(documentLink).toHaveAttribute("class","blinkingText"); // validate the link is blinking by checking the class attribute value
    
    const [newPage] = await Promise.all
    ([

    context.waitForEvent('page'), // wait for the new page to open
    documentLink.click(),
    ]);  // new page is opened in new tab

    const text = await newPage.locator(".red").textContent(); // wait for the element with class red to be visible in the new page
    console.log(text); // print the element in console
    


});




