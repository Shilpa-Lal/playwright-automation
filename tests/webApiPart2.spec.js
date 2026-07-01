const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('./utils/APiUtils');
const loginPayLoad = {userEmail: "lal.shilpa4@gmail.com", userPassword: "Admin@123"}; // inspect > network > 'login' api > Payload
const orderPayLoad = {orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
 
 
let response;
test.beforeAll( async()=>
{
   const apiContext = await request.newContext();
   const apiUtils = new APiUtils(apiContext,loginPayLoad);
   response =  await apiUtils.createOrder(orderPayLoad);
 
})
 
 
//create order is success
test('@API Place the order', async ({page})=>
{ 
    await page.addInitScript(value => {
 
        window.localStorage.setItem('token',value);
    }, response.token );
await page.goto("https://rahulshettyacademy.com/client");
 await page.locator("button[routerlink*='myorders']").click();
 await page.locator("tbody").waitFor();
const rows = await page.locator("tbody tr");
 
 
for(let i =0; i<await rows.count(); ++i)
{
   const rowOrderId =await rows.nth(i).locator("th").textContent();
   if (response.orderId.includes(rowOrderId))
   {
       await rows.nth(i).locator("button").first().click();
       break;
   }
}
const orderIdDetails =await page.locator(".col-text").textContent();
//await page.pause();
expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
 
});
 
//Verify if order created is showing in history page
// Precondition - create order -


/*
const {test,expect,request} = require('@playwright/test');
const {APiutils} = require('./Utils/APiUtils'); //import the file
const loginPayLoad = {userEmail: "lal.shilpa4@gmail.com", userPassword: "Admin@123"}; // inspect > network > 'login' api > Payload
const orderPayLoad = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};//inspect> network > 'create order' api > Payload

let response;

test.beforeAll (async () =>
{
    const apiContext = await request.newContext();
    //create object of APiutils class
    const apiUtils = new APiutils(apiContext,loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);

       
//set the token
test('Place the Order', async ({page}) => 
{
    await page.addInitScript(value => 
        {
            window.localStorage.setItem('token', value);
        }, response.token );

await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await page.locator('button:has-text("ORDERS")').click(); // click on the orders button to go to orders page
await page.locator("tbody").waitFor(); // wait for the table body to be visible to ensure that the orders are loaded

const rows = await page.locator("tbody tr");
const count = await rows.count();

for (let i=0; i< count; ++i)
{ 
    const rowOrderId = await rows.nth(i).locator("th").textContent(); // wait for the first column of the row to be visible to ensure that the row is loaded
    if (response.orderID.includes(rowOrderId))
    {
        console.log("Order ID is present in orders page: ", rowOrderId);
        await rows.nth(i).locator("button").first().click(); // click on the view button of the order to see the order details
        break; // break the loop once the order ID is found and clicked
    }
}

const orderIdDetails = await page.locator(".table-responsive").textContent(); // get the order ID from the order details page
expect (response.orderID.includes(orderIdDetails)).toBeTruthy(); // assert that the order ID in the order details page is same as the order ID in the orders page
console.log("Order ID in order details page: ", orderIdDetails);

});
});
*/