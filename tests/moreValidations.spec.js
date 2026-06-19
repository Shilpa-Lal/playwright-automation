const {test,expect} = require('@playwright/test');

test('PopUp Validations', async ({page}) => 
{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("https://www.google.com/");
    //await page.goBack(); //it will redirect again to automation practise page
    //await page.goForward(); 

    //Hide/Show Example input box
    await expect (page.locator("#displayed-text")).toBeVisible(); //validate if text input box is visible
    await page.locator("#hide-textbox").click();
    await expect (page.locator("#displayed-text")).toBeHidden(); //validate if text input box is not visible

    page.on("dialog", dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    //page.on(‘dialog’, dialog => dialog.dismiss());

    //Hover
    await page.locator("#mousehover").hover();

    //iFrame
    const framesPage = page.frameLocator("#courses-iframe"); //it will shift focus to child frame

    //click on 'All access plan'
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck =  await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);
    

});