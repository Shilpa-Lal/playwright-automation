const { test, expect } = require('@playwright/test');
const path = require('path');

test('Upload and Replace File', async ({ page }) => {

    // Test files
    const firstFile = ('/home/qed42/Desktop/Assignment-Data/download.xlsx');
    const secondFile = ( '/home/qed42/Desktop/Assignment-Data/download1.xlsx');

    // Open application
    await page.goto('https://rahulshettyacademy.com/upload-download-test/');

    // File input locator
    const fileInput = page.locator('input[type="file"]');

    //--------------------------------------------
    // Upload First File
    //--------------------------------------------

    await fileInput.setInputFiles(firstFile);

    // Validate first uploaded file name
    await fileInput.setInputFiles(firstFile);
    const uploadedFile1 = await fileInput.evaluate(input => input.files[0].name);
    console.log(uploadedFile1);
    expect(uploadedFile1).toBe("download.xlsx");


    //--------------------------------------------
    // Replace With Second File
    //--------------------------------------------

    await fileInput.setInputFiles(secondFile);
    const uploadedFile2 = await fileInput.evaluate(input => input.files[0].name);
    console.log(uploadedFile2);

    //--------------------------------------------
    // Validation
    //--------------------------------------------

    expect(uploadedFile2).toBe('download1.xlsx');   

     //--------------------------------------------
    // Validate row count in the table after file upload
    //--------------------------------------------
    // Get all data rows (excluding header)
    const rows = page.locator(".rdt_TableBody .rdt_TableRow");
    await expect(rows).toHaveCount(3); // Validate that there are 3 rows in the table
    console.log("Row Count:", await rows.count());

     //--------------------------------------------
    // Validate Specific Cell Value in the table after file upload. Example: Verify Banana price is 69.
    //--------------------------------------------
    //const bananaPrice = page.locator('.rdt_TableBody .rdt_TableCell:has-text("Banana")');
    const bananaRow = page.locator('.rdt_TableRow').filter({has: page.getByText('Banana')});
    await expect(bananaRow).toBeVisible(); // Validate that the Banana row is visible

    // Price is in the 3rd column (index 2)
    // Change the index if your table structure is different
    const bananaPrice = bananaRow.locator('.rdt_TableCell').nth(3);
    await expect(bananaPrice).toHaveText('69');
    console.log("Banana Price:", await bananaPrice.textContent());
    
});