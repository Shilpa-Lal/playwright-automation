const {test,expect} = require('@playwright/test');

test('Screenshot & Visual Comparison', async ({page}) => 
{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
   

    //Hide/Show Example input box
    await expect (page.locator("#displayed-text")).toBeVisible(); //validate if text input box is visible
    await page.locator("#displayed-text").screenshot({path: 'partialScreenshot.png'}); //screenshot of the element

    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'}); //screenshot of the element
    await expect (page.locator("#displayed-text")).toBeHidden(); //validate if text input box is not visible

});

//screenshot comparison // screenshot - store -> screenshot -> 
//on first run, the test case will fail, as we do not have landing.png in the baseline folder. It will create a new landing.png in the baseline folder. 
//On subsequent runs, it will compare the screenshot with the baseline image and pass/fail based on the comparison.
test.only('Visual Comparison', async ({page}) => 
{
    await page.goto("https://www.google.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png'); //compare the screenshot with the baseline image
});