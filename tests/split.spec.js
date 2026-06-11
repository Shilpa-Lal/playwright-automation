const {test,expect} = require('@playwright/test');


test('Split the text', async ({browser}) => 
{
    const context = await browser.newContext(); // fresh instance
    const page = await context.newPage(); // new tabinstance

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

    const documentLink = page.locator("[href*='documents-request']");
    //await expect(documentLink).toHaveAttribute("class","blinkingText"); // validate the link is blinking by checking the class attribute value
    
    const [newPage] = await Promise.all
    //const [newPage,newpage2] = await Promise.all // use this when link opens 2 new pages 
    ([

    context.waitForEvent('page'), // wait for the new page to open
    documentLink.click(),
    ]);  // new page is opened in new tab

    const text = await newPage.locator(".red").textContent(); // wait for the element with class red to be visible in the new page
    
    //enter e-mail id from new page and enter into parent login page
    //split the text and get the email id
    const arrayText = text.split("@"); // split the text by @ and get the email id
    const domain = arrayText[1].split(" ")[0]; // split the second part of the text by space and get the domain name
    console.log(domain); // print the domain name in console

    await page.locator('#username').fill(domain); // enter the domain name in the username text box of parent page    
    console.log(await page.locator('#username').textContent()); // print the value entered in the username text box in console
    //console.log(await page.locator('#username').inputValue()); // print the value entered in the username text box in console using inputValue() method which is used to get the value of the input field
    //await page.pause(); // pause the test execution to see the entered value in the username text box

    
    //console.log(text); // print the element in console

});




