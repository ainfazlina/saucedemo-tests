/* 
Test Case 4: Checkout Functionality Tests for SauceDemo
-----------------------------------------------
Test Case
ID	Module	Test Case	Steps	Expected Result
TC_Checkout_01	Checkout	Valid Checkout	Enter FirstName/LastName/PostalCode → Continue → Finish	Order completed successfully
TC_Checkout_02	Checkout	Blank First Name	Leave FirstName blank → Continue	Error: “First Name is required”
TC_Checkout_03	Checkout	Blank Last Name	Leave LastName blank → Continue	Error: “Last Name is required”
TC_Checkout_04	Checkout	Blank Postal Code	Leave PostalCode blank → Continue	Error: “Postal Code is required”
TC_Checkout_05	Checkout	Cancel Checkout	Click Cancel at checkout	Redirect to Cart Page
TC_Checkout_06 Checkout	Verify Price Total, Tax, and Total dynamically    Update item quantity in cart → Checkout	Price Total, Tax, and Total updated correctly
*/

import { test, expect } from '@playwright/test';
import { login } from '../utils/login';
import { addNewItemToCart } from '../utils/addtocart';

test('TC_Checkout_01 Valid Checkout', async ({ page }) => {

    console.log('To verify ... TC_Checkout_01 Checkout Valid Checkout');    
    // Step 1: Login
    await login(page, 'standard_user', 'secret_sauce');

    // Step 2: Add first item to cart
    await addNewItemToCart(page, 0);
    await page.waitForTimeout(3000);
    // Step 3: Go to cart
    await page.locator('.shopping_cart_link').click();
    await page.waitForTimeout(3000);
    // Step 4: Proceed to checkout
    await page.locator('button:has-text("Checkout")').click();
    await page.waitForTimeout(3000);    
    // Step 5: Enter checkout information
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');   
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
    await page.waitForTimeout(3000);    
    // Step 6: Finish checkout
    await page.locator('button:has-text("Finish")').click();
    await page.waitForTimeout(3000);
    // Step 7: Verify order completion
    const completionMessage = page.locator('.complete-header'); 
    console.log('✅ Passed: Order completed successfully');
});

test('TC_Checkout_02 Blank First Name', async ({ page }) => {

    console.log('To verify ... TC_Checkout_02 Checkout Blank First Name');    
    // Step 1: Login
    await login(page, 'standard_user', 'secret_sauce');

    // Step 2: Add first item to cart   
    await addNewItemToCart(page, 0);
    await page.waitForTimeout(3000);
    // Step 3: Go to cart
    await page.locator('.shopping_cart_link').click();
    await page.waitForTimeout(3000);
    // Step 4: Proceed to checkout
    await page.locator('button:has-text("Checkout")').click();
    await page.waitForTimeout(3000);
    // Step 5: Leave First Name blank, fill other fields
    await page.locator('[data-test="lastName"]').fill('Doe');   
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
    // Step 6: Verify error message for blank First Name
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toContainText('Error: First Name is required');
    console.log('✅ Passed: Error message displayed for blank First Name');
});

test('TC_Checkout_03 Blank Last Name', async ({ page }) => {

    console.log('To verify ... TC_Checkout_03 Checkout Blank Last Name');    
    // Step 1: Login
    await login(page, 'standard_user', 'secret_sauce');

    // Step 2: Add first item to cart   
    await addNewItemToCart(page, 0);
    await page.waitForTimeout(3000);
    // Step 3: Go to cart
    await page.locator('.shopping_cart_link').click();
    await page.waitForTimeout(3000);    
    // Step 4: Proceed to checkout
    await page.locator('button:has-text("Checkout")').click();
    await page.waitForTimeout(3000);
    // Step 5: Leave Last Name blank, fill other fields
    await page.locator('[data-test="firstName"]').fill('John');   
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();   
    // Step 6: Verify error message for blank Last Name
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toContainText('Error: Last Name is required');
    console.log('✅ Passed: Error message displayed for blank Last Name');
});

test('TC_Checkout_04 Blank Postal Code', async ({ page }) => {

    console.log('To verify ... TC_Checkout_04 Checkout Blank Postal Code');    
    // Step 1: Login
    await login(page, 'standard_user', 'secret_sauce');

    // Step 2: Add first item to cart           
    await addNewItemToCart(page, 0);
    await page.waitForTimeout(3000);    
    // Step 3: Go to cart
    await page.locator('.shopping_cart_link').click();
    await page.waitForTimeout(3000);
    // Step 4: Proceed to checkout
    await page.locator('button:has-text("Checkout")').click();
    await page.waitForTimeout(3000);
    // Step 5: Leave Postal Code blank, fill other fields
    await page.locator('[data-test="firstName"]').fill('John');   
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="continue"]').click();
    // Step 6: Verify error message for blank Postal Code
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toContainText('Error: Postal Code is required');
    console.log('✅ Passed: Error message displayed for blank Postal Code');
});

test('TC_Checkout_05 Cancel Checkout', async ({ page }) => {        
    console.log('To verify ... TC_Checkout_05 Checkout Cancel Checkout');    
    // Step 1: Login
    await login(page, 'standard_user', 'secret_sauce');

    // Step 2: Add first item to cart   
    await addNewItemToCart(page, 0);
    await page.waitForTimeout(3000);
    // Step 3: Go to cart
    await page.locator('.shopping_cart_link').click();
    await page.waitForTimeout(3000);
    // Step 4: Proceed to checkout
    await page.locator('button:has-text("Checkout")').click();
    await page.waitForTimeout(3000);
    // Step 5: Click Cancel
    await page.locator('button:has-text("Cancel")').click();
    await page.waitForTimeout(3000);
    // Step 6: Verify redirect to Cart Page
    await expect(page).toHaveURL(/cart.html/);
    console.log('✅ Passed: Redirected to Cart Page after cancelling checkout');
});

test('TC_Checkout_06 Verify Price Total, Tax, and Total dynamically', async ({ page }) => {        
    console.log('To verify ... TC_Checkout_06 Checkout Verify Price Total, Tax, and Total dynamically');    
    // Step 1: Login
    await login(page, 'standard_user', 'secret_sauce');

    // Step 2: Add second item to cart   
    await addNewItemToCart(page, 1);
    await page.waitForTimeout(3000);
    // Step 3: Go to cart
    await page.locator('.shopping_cart_link').click();
    await page.waitForTimeout(3000);
    // Step 4: Proceed to checkout
    await page.locator('button:has-text("Checkout")').click();
    await page.waitForTimeout(3000);
    // Step 5: Enter checkout information
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
    await page.waitForTimeout(3000);
    // Step 6: Verify Price Total, Tax, and Total
    // Get prices from page
    const itemTotalText = await page.locator('.summary_subtotal_label').innerText(); // e.g., "Item total: $29.99"
    const taxText = await page.locator('.summary_tax_label').innerText();           // e.g., "Tax: $2.40"
    const totalText = await page.locator('.summary_total_label').innerText();       // e.g., "Total: $32.39"

    // Extract numbers
    const itemTotal = parseFloat(itemTotalText.replace('Item total: $', ''));
    const tax = parseFloat(taxText.replace('Tax: $', ''));
    const total = parseFloat(totalText.replace('Total: $', ''));

    // Calculate expected total
    const expectedTotal = parseFloat((itemTotal + tax).toFixed(2));

    // Assertions
    expect(total).toBe(expectedTotal);

    console.log(`✅ Passed: Item total = $${itemTotal}, Tax = $${tax}, Total = $${total}`);
});
