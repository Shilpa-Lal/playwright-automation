const {test,expect} = require('@playwright/test');


test('Client App Login', async ({page}) => 
{
    
    const productName = "ZARA COAT 3"; // product name to be added to cart
    const products = page.locator(".card-body"); // locator for product titles
    const email = ("lal.shilpa4@gmail.com"); // email id to be used in login and checkout page

    await page.goto("https://rahulshettyacademy.com/client/");
    
    await page.getByPlaceholder('email@example.com').fill(email);
    await page.getByPlaceholder('enter your password').fill("Admin@123");
    await page.getByRole('button', { name: 'Login' }).click();
    
    await page.waitForEvent('networkidle'); // wait for the page to load completely - might be flaky

    //wait for the first card title to be visible - more reliable than waitForLoadState
    await page.locator('.card-body b').first().waitFor(); // wait for the first card title to be visible - more reliable than waitForLoadState
    
    await page.locator(".card-body").filter({hasText: "zara coat 3"}).getByRole("button", {name: "Add To Cart"}).click(); // click on the add to cart button of the product 'ZARA COAT 3' using filter and text content 

    await page.getByRole("listitem").getByRole("button", {name: "Cart"}).click(); // click on the cart button to go to cart page
    await page.locator("div li").first().waitFor(); //on cart page, we have to wait until the <li> tag loads, to ensure all products are appeared.

    await expect (page.getByText("ZARA COAT 3")).toBeVisible();   

    await page.getByRole("button",{name:"Checkout"}).click(); // click on the checkout button to go to checkout page

    await page.getByPlaceholder("Select Country").pressSequentially("ind", {delay:100}); // type 'ind' in the country input field with a delay of 100ms to simulate user typing

    await page.getByRole("button",{name:"India"}).nth(1).click(); // click on the India option
    await page.getByText("PLACE ORDER").click();

    await expect (page.getByText("Thankyou for the order.")).toBeVisible();   

    await page.getByRole("button",{name:"ORDER"}).click(); // click on the order button 
    

});
