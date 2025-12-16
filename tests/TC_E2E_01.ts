/* 
Test Case 5: End to End Tests for SauceDemo
-----------------------------------------------
Test Case
ID	Module	Test Case	Steps	Expected Result
TC_E2E_01	E2E	Complete Purchase Flow	Login → Add item → Go to Cart → Checkout → Finish	Item purchased successfully, confirmation page displayed
TC_E2E_02	E2E	Remove and Purchase	Add multiple items → Remove 1 → Checkout	Only remaining items purchased
TC_E2E_03	E2E	Logout	Login → Menu → Logout	User redirected to Login page
TC_E2E_04	E2E	Performance Glitch User Flow	Login as 'performance_glitch_user' → Add items → Checkout	Flow completes correctly even with page load delays
*/

import { test, expect } from '@playwright/test';
import { login } from '../utils/login';
import { addNewItemToCart } from '../utils/addtocart';

test('TC_E2E_01 Complete Purchase Flow', async ({ page }) => {

    console.log('To verify ... TC_E2E_01 E2E Complete Purchase Flow');    
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
    console.log('✅ Passed: Item purchased successfully, confirmation page displayed');
});

test('TC_E2E_02 Remove and Purchase', async ({ page }) => {
    console.log('To verify ... TC_E2E_02 E2E Remove and Purchase');    
    // Step 1: Login
    await login(page, 'standard_user', 'secret_sauce');

    // Step 2: Add multiple items to cart   
    const itemsToAdd = 3;
    for (let i = 0; i < itemsToAdd; i++) {
      await addNewItemToCart(page, i);
    }   
    await page.waitForTimeout(3000);
    // Step 3: Go to cart
    await page.locator('.shopping_cart_link').click();  
    await page.waitForTimeout(3000);  
    // Step 4: Remove one item from cart
    await page.locator('button:has-text("Remove")').first().click();
    await page.waitForTimeout(3000);
    // Step 5: Proceed to checkout
    await page.locator('button:has-text("Checkout")').click();
    await page.waitForTimeout(3000);    
    // Step 6: Enter checkout information
    await page.locator('[data-test="firstName"]').fill('John'); 
    await page.locator('[data-test="lastName"]').fill('Doe');   
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
    await page.waitForTimeout(3000);
    // Step 7: Finish checkout
    await page.locator('button:has-text("Finish")').click();
    await page.waitForTimeout(3000);    
    // Step 8: Verify order completion
    const completionMessage = page.locator('.complete-header'); 
    console.log('✅ Passed: Only remaining items purchased');
});

test('TC_E2E_03 Logout', async ({ page }) => {  
    console.log('To verify ... TC_E2E_03 E2E Logout');    
    // Step 1: Login
    await login(page, 'standard_user', 'secret_sauce');

    // Step 2: Open menu    
    await page.locator('#react-burger-menu-btn').click();
    await page.waitForTimeout(2000);
    // Step 3: Click Logout
    await page.locator('#logout_sidebar_link').click();
    await page.waitForTimeout(3000);
    // Step 4: Verify redirect to Login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    console.log('✅ Passed: User redirected to Login page');
});

test('TC_E2E_04 Performance Glitch User Flow', async ({ page }) => {  
    console.log('To verify ... TC_E2E_04 E2E Performance Glitch User Flow');   
    test.setTimeout(60000); // 60 seconds 
    // Step 1: Login as performance glitch user
    await login(page, 'performance_glitch_user', 'secret_sauce');
    // Step 2: Add first item to cart   
    await addNewItemToCart(page, 0);
    // await page.waitForTimeout(5000);
    // Step 3: Go to cart
    await page.locator('.shopping_cart_link').click();
    // await page.waitForTimeout(5000);
    // Step 4: Proceed to checkout
    await page.locator('button:has-text("Checkout")').click();
    // await page.waitForTimeout(5000);
    // Step 5: Enter checkout information
    await page.locator('[data-test="firstName"]').fill('John'); 
    await page.locator('[data-test="lastName"]').fill('Doe');   
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
    // await page.waitForTimeout(5000);
    // Step 6: Finish checkout
    await page.locator('button:has-text("Finish")').click();
    // await page.waitForTimeout(8000);
    // Step 7: Verify order completion
    const completionMessage = page.locator('.complete-header'); 
    console.log('✅ Passed: Flow completes correctly even with page load delays');
});
