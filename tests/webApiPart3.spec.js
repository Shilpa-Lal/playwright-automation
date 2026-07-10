// in some banking application, we have to pass many parameters, only token is not sufficient
// Login through UI, it will copy all the contents from 'Application' tab, store it in a .json file 
// when broswer will invoke for test cases - inject full .json file there to open it with all the storage details stored in that file
//so that no need to login again, all cookies are present in .json file and we directly start with the test case
// add to cart, order confirmation, order history, order details, order cancellation
const {test,expect} = require('@playwright/test');
let webContext;

test.beforeAll(async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();   
    await page.goto("https://rahulshettyacademy.com/client/");
    
    await page.locator('#userEmail').fill("lal.shilpa4@gmail.com");
    await page.locator('#userPassword').fill("Admin@123");
    await page.locator('#login').click();
    
    await page.waitForLoadState('networkidle'); // wait for the page to load completely - might be flaky

    await context.storageState({path:"state.json"}); //store all the cookies and local storage in a .json file

    webContext = await browser.newContext({storageState:"state.json"}); // create a new context with the stored cookies and local storage

})


test('Client App Login', async () => 
{
    const email = "";
    const productName = "ZARA COAT 3"; // product name to be added to cart

    const page = await webContext.newPage(); // create a new page in the context with stored cookies and local storage
    await page.goto("https://rahulshettyacademy.com/client/");

    const products = page.locator(".card-body"); // locator for product titles
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
await expect(page.locator(".payment__shipping input[type='text']").first()).toHaveText(email);
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

const rows = await expect(page.locator("tbody tr"));

for (let i=0; i< await rows; ++i)
{ 
    const rowOrderID = await (rows.nth(i).locator("th")).textContent(); // wait for the first column of the row to be visible to ensure that the row is loaded
    if (rowOrderID.includes(rowOrderID))
    {
        console.log("Order ID is present in orders page: ", rowOrderID);
        await rows.nth(i).locator("button").first().click(); // click on the view button of the order to see the order details
        break; // break the loop once the order ID is found and clicked
    }
}

//const orderIDDetails = await (page.locator(".col-text")).textContent(); // get the order ID from the order details page
const orderIDDetails = await (page.locator(".ng-star-inserted")).textContent();
expect (orderID.includes(orderIDDetails)).toBeTruthy(); // assert that the order ID in the order details page is same as the order ID in the orders page
console.log("Order ID in order details page: ", orderIDDetails);


});
