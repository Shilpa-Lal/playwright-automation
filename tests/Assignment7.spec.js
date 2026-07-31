const {test,expect} = require('@playwright/test');


test.only('Assignment 7', async ({page}) => 
{
    
    const productName = "ZARA COAT 3"; // product name to be added to cart
    const products = page.locator(".card-body"); // locator for product titles
    const email = ("lal.shilpa4@gmail.com"); // email id to be used in login and checkout page

    await page.goto("https://rahulshettyacademy.com/client/");
    
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill("Admin@123");
    await page.locator('#login').click();
    //await page.waitForLoadState('networkidle'); // wait for the page to load completely - might be flacky

    //wait for the first card title to be visible - more reliable than waitForLoadState
    await page.locator('.card-body b').first().waitFor(); // wait for the first card title to be visible - more reliable than waitForLoadState  


//console.log(await cardTitles.first().textContent()); // grab the first card title and print in console
const titles = await page.locator(".card-body b").allTextContents();
console.log(titles);

// to get count of products
const count = await products.count();
console.log("Total products: ", count);

for (let i=0; i<count; ++i)
{
    // for nth(0), locator "b" is only for the first div, it will not search for all the "b" in the page, it will search only for the "b" in the given div
    //for next nth (1), it will search for the "b" in the next div, 
    if ((await products.nth(i).locator("b").textContent()) === productName)
    {
        await products.nth(i).locator("text= Add To Cart").click(); // click on the add to cart button of 'zara coat 3' product
        break; // break the loop once the product is found and added to cart
    }
}

//verify that the product is added to cart or not
await page.locator('[routerlink*="/dashboard/cart"]').click(); // click on the cart button to go to cart page
await page.locator("div li").first().waitFor(); //on cart page, we have to wait until the <li> tag loads, to ensure all products are appeared.


const bool = await page.locator("h3:has-text('zara coat 3')").isVisible(); // wait for the product to be visible in the cart page
expect(bool).toBeTruthy(); // assert that the product is visible in the cart page
console.log("Product is added to cart: ", bool);

//const checkout = await page.locator("text=Checkout").click(); // click on the checkout button to go to checkout page
const checkout = await page.locator("li [type='button']").click(); // click on the checkout button to go to checkout page
console.log("Checkout button is clicked: ", checkout);


await page.locator("[placeholder*='Country']").pressSequentially("ind", {delay:100}); // type 'ind' in the country input field with a delay of 100ms to simulate user typing
const dropdown = page.locator(".ta-results"); // locator for the dropdown options that appear after typing in the country input field
await dropdown.waitFor(); // wait for the dropdown options to appear


const dropdownCount = await dropdown.locator("button").count(); // count the number of options in the dropdown
console.log("Total options: ", dropdownCount);

for (let i=0; i<dropdownCount; ++i)
{
    if ((await dropdown.locator("button").nth(i).textContent()) === " India")
    {
        const text = await dropdown.locator("button").nth(i).textContent();
        console.log("Option found: ", text);
        
        if (text == " India")
        {
            await dropdown.locator("button").nth(i).click(); // click on the 'India' option in the dropdown
            break; // break the loop once the option is found and clicked
        }
    }
}


//await page.pause(); // to pause the test and see the result in the browser

//email id written in the checkout page is same as the email id used in login page
//await expect(page.locator(".user__name label")).toHaveValue(email);
//await page.pause();
await page.locator(".action__submit").click(); // click on the submit button to place the order

//const orderConfirmation = await page.locator(".hero-primary").textContent(); // get the order confirmation message
//console.log("Order confirmation message: ", orderConfirmation);
//expect(orderConfirmation).toBe(" Thankyou for the order. "); // assert that the order confirmation message is correct       

await expect (page.locator(".hero-primary")).toHaveText(" Thankyou for the order."); // get the order confirmation message
const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").first().textContent();
console.log("Order ID: ", orderID);

// click on the orders button to go to orders page
await page.locator('button:has-text("ORDERS")').click();

await page.locator("tbody").waitFor(); // wait for the table body to be visible to ensure that the orders are loaded

//const rows = await expect(page.locator("tbody tr"));
const rows = await page.locator("tbody tr");
const rowCount = await rows.count();

for (let i=0; i< rowCount; ++i)
{ 
    const rowOrderID = await (rows.nth(i).locator("th")).textContent(); // wait for the first column of the row to be visible to ensure that the row is loaded
    if (orderID.includes(rowOrderID))
    {
        console.log("Order ID is present in orders page: ", rowOrderID);
        await rows.nth(i).locator("button").first().click(); // click on the view button of the order to see the order details
        break; // break the loop once the order ID is found and clicked
    }
}
//Verify Order Details
const orderIDDetails = await page.locator(".col-text").textContent(); // get the order ID from the order details page
expect (orderID.includes(orderIDDetails)).toBeTruthy(); // assert that the order ID in the order details page is same as the order ID in the orders page
console.log("Order ID in order details page: ", orderIDDetails);

});
