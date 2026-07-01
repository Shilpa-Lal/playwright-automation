const {test,expect,request} = require('@playwright/test');
const loginPayLoad = {userEmail: "lal.shilpa4@gmail.com", userPassword: "Admin@123"}; // inspect > network > 'login' api > Payload
const orderPayLoad = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};//inspect> network > 'create order' api > Payload
let token; // to make it accessible to all test cases
let orderID; 
let response;

test.beforeAll (async () =>
{
    //login API
    const apiContext = await request.newContext();
    //inspect > network > 'login' api > headers > check 'Request URL' & 'Request Method' 
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
        {
            data:loginPayLoad
        })
        expect(loginResponse.ok()).toBeTruthy(); //checks success call 200, 201 etc
        const loginResponseJson = await loginResponse.json(); //store json response, inspect > network > 'login' api > Response
        token = loginResponseJson.token;
        console.log("Token : ", token);

        //network > /Create order' api > header
        const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data : orderPayLoad,
                headers : 
                {
                    'authorization': token,
                    'content-type': 'application/json'
                },
            }) 
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        orderID = orderResponseJson.orders[0];
});
//set the token
test('Place the Order', async ({page}) => 
{
    await page.addInitScript(value => 
        {
            window.localStorage.setItem('token', value);
        }, token );

await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await page.locator('button:has-text("ORDERS")').click(); // click on the orders button to go to orders page
await page.locator("tbody").waitFor(); // wait for the table body to be visible to ensure that the orders are loaded

const rows = await page.locator("tbody tr");

for (let i=0; i< rows; ++i)
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

//verify if order created is showing in history page
//precondition - create it with using api