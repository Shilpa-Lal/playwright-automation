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

});