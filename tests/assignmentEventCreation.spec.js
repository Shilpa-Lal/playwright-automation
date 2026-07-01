const {test,expect} = require('@playwright/test');


test.only('Section 9-Assignment-Full booking flow with Event Creation', async ({page}) => 
{
    
    const email = ("lal.shilpa4@gmail.com"); // email id to be used in login and checkout page

    // Future Date Helper
    function futureDateValue(daysToAdd = 7) 
    {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T18:00`;
    }

    await page.goto("https://eventhub.rahulshettyacademy.com/login");

    //Step 1 - Login    
    await page.getByPlaceholder('you@email.com').fill(email);
    await page.getByPlaceholder('••••••').fill("Admin@123");
    await page.locator('#login-btn').click();

    await expect(page.locator(".leading-tight")).toHaveText("Discover & BookAmazing Events");

    
    
    await page.locator("#nav-events").click(); //click on tab 'Events'
    await page.getByRole('button', { name: 'Add New Event' }).click(); //click on 'Add New Event'

    //Step 2 - Create Event
    const eventTitle = `Test Event ${Date.now()}`;
    await page.locator('#event-title-input').fill(eventTitle);
    await page.getByRole('textbox', { name: 'Describe the event…' }).fill('Playwright Automation Event Description');
    await page.getByLabel('City').fill('Mumbai');
    await page.getByLabel('Venue').fill('Rahul Shetty Academy');
    await page.getByLabel('Event Date & Time').fill(futureDateValue());
    await page.getByLabel('Price ($)').fill('100');
    await page.getByLabel('Total Seats').fill('50');
    await page.locator('#add-event-btn').click();
    await expect(page.getByText('Event created!')).toBeVisible();

    await page.locator("#nav-events").click(); //click on tab 'Events'

    //await page.waitForEvent('networkidle');

    await page.locator("#event-card").filter({hasText: "eventTitle"}).getByRole("a", {name: "Book Now"}).click(); 

    await page.locator('.grid-cols-1').first().waitFor(); 

    //await page.waitForEvent('networkidle'); // wait for the page to load completely - might be flaky

    /*
    //wait for the first card title to be visible - more reliable than waitForLoadState
    //await page.locator('.card-body b').first().waitFor(); // wait for the first card title to be visible - more reliable than waitForLoadState
    

    await page.getByRole("listitem").getByRole("button", {name: "Cart"}).click(); // click on the cart button to go to cart page
    await page.locator("div li").first().waitFor(); //on cart page, we have to wait until the <li> tag loads, to ensure all products are appeared.

    await expect (page.getByText("ZARA COAT 3")).toBeVisible();   

    await page.getByRole("button",{name:"Checkout"}).click(); // click on the checkout button to go to checkout page

    await page.getByPlaceholder("Select Country").pressSequentially("ind", {delay:100}); // type 'ind' in the country input field with a delay of 100ms to simulate user typing

    await page.getByRole("button",{name:"India"}).nth(1).click(); // click on the India option
    await page.getByText("PLACE ORDER").click();

    await expect (page.getByText("Thankyou for the order.")).toBeVisible();   

    await page.getByRole("button",{name:"ORDER"}).click(); // click on the order button 
    */
        

});
