const {test,expect} = require('@playwright/test');


test('First Playwrite Test', async ({browser}) => {

//declare the variables here so that we can use them in the test cases
const context = await browser.newContext(); // fresh instance
const page = await context.newPage(); // new tabinstance
const userName = page.locator('#username'); // locator for username text box
const password = page.locator('[type=password]'); // locator for password text box 
const signInBtn = page.locator('#signInBtn'); // locator for sign in button
const cardTitles = page.locator(".card-body a"); // locator for card titles
const addToCartBtn = page.locator(".btn.btn-info"); // locator for add to cart button
const checkoutBtn = page.locator("li.nav-item.active > a.nav-link.btn.btn-primary"); // locator for checkout button


await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
console.log(await page.title()); // writes the title in console

//sign in

await userName.fill("rahulshettyacademy"); // enter correct username
await password.fill("Learning@830$3mK2"); // enter correct password
await signInBtn.click();    

//grab the second card title, add to cart
const productName = (await cardTitles.nth(1).textContent()); // grab the second card title and trim the extra spaces
console.log(productName); // print the product name in console


await addToCartBtn.nth(1).click(); // click on the add to cart button of the second card

await checkoutBtn.click(); // click on the checkout button

/*
const cartProduct = await expect(
  page.locator("h4 a").filter({ hasText: productName })
).toBeVisible();
console.log(cartProduct); // print the product name in cart in console
*/

 const cartProduct = await page.locator("h4 a").filter({ hasText: productName });
 await expect(cartProduct).toBeVisible();
 console.log(await cartProduct.textContent());





});
