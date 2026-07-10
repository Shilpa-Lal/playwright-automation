const {test,expect} = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
});

//Task: Trigger alert > Accept/dismiss > Validate behavior
test('Alert Handling', async ({page}) => {
  // Step 1: Set up dialog listener BEFORE triggering the alert
  // Playwright auto-dismisses dialogs unless you attach a handler first
  let alertText = '';
  page.once('dialog', async (dialog) => {
    alertText = dialog.message();
    console.log('Alert text:', alertText);

    // Step 2: Accept the alert
    await dialog.accept();
  });

  // Step 1 (trigger): Click the Alert button
  await page.click('#alertbtn');

  // Step 3: Validate behavior
  expect(alertText).toBe('Hello , share this practice page and share your knowledge')
});


//Task: Switch to iframe >Perform action > Validate result
test('Frame Handling', async ({page}) => {
   const framesPage = page.frameLocator("#courses-iframe"); //it will shift focus to child frame

    //click on 'All access plan'
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck =  await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);
});

//Task:Validate: Element visible > Element hidden > Element enabled/disabled
test('Visibility Assertion', async ({page}) => {
   //Hide/Show Example input box
    await expect (page.locator("#displayed-text")).toBeVisible(); //validate if text input box is visible
    await page.locator("#hide-textbox").click();
    await expect (page.locator("#displayed-text")).toBeHidden(); //validate if text input box is not visible

});
