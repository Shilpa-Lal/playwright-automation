const {test,expect} = require('@playwright/test');


test('Playwrite Special Locators - Form Fill', async ({page}) => 
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    await page.getByLabel("Check me out if you Love IceCreams!").check(); // check the checkbox using label text
    
    await page.getByLabel("Employed").check(); // check the radio button using label text

    await page.getByLabel("gender").selectOption("Female"); // select the dropdown option using label text and value

    await page.getByPlaceholder("Password").fill("abc123"); // fill the input field using placeholder text

    await page.getByRole("button", {name: "Submit"}).click(); // click the button using role and name

    await page.getByText("Success! The Form has been submitted successfully!").isVisible();  // wait for the success message to appear using text content
    
    await page.getByRole("link", {name: "Shop"}).click(); // click the link using role and name

    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button").click(); // click on the add button of the product 'Nokia Edge' using filter and text content   










});
