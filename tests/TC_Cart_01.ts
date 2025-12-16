/* 
Test Case 3: Cart Functionality Tests for SauceDemo
-----------------------------------------------
Test Case
ID	Module	Test Case	Steps	Expected Result
TC_Cart_01	Cart	Verify Items in Cart	Add item → Click cart	Item details displayed correctly
TC_Cart_02	Cart	Remove Item from Cart	Click Remove	Item removed from cart
TC_Cart_03	Cart	Continue Shopping	Click 'Continue Shopping'	Redirect to Inventory Page
TC_Cart_04	Cart	Proceed to Checkout	Click 'Checkout'	Redirect to Checkout Page & Checkout page displayed correctly

*/

// tests/saucedemo_cart.spec.ts
import { test, expect } from '@playwright/test';
import { login } from '../utils/login';
import { addNewItemToCart } from '../utils/addtocart';

test('TC_Cart_01 Verify Items in Cart', async ({ page }) => {

    console.log('To verify ... TC_Cart_01 Cart Verify Items in Cart');

    // Step 1: Login
    await login(page, 'standard_user', 'secret_sauce');

    // Step 2: Add first item to cart
    await addNewItemToCart(page, 0);
    await page.waitForTimeout(3000);

    // Step 3: Go to cart
    await page.locator('.shopping_cart_link').click();
    await page.waitForTimeout(3000);

    // Step 4: Verify item details in cart
    const cartItem = page.locator('.cart_item .inventory_item_name');
    await expect(cartItem).toHaveText('Sauce Labs Backpack'); 

    console.log('✅ Passed: Item details displayed correctly');
});

test('TC_Cart_02 Remove Item from Cart', async ({ page }) => {

    console.log('To verify ... TC_Cart_02 Cart Remove Item from Cart'); 
    // Step 1: Login
    await login(page, 'standard_user', 'secret_sauce');

    // Step 2: Add first item to cart
    await addNewItemToCart(page, 0);
    await page.waitForTimeout(3000);    
    // Step 3: Go to cart
    await page.locator('.shopping_cart_link').click();
    await page.waitForTimeout(3000);    
    // Step 4: Remove item from cart
    await page.locator('button:has-text("Remove")').click();
    await page.waitForTimeout(3000);
    // Step 5: Verify cart is empty
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(0);
    console.log('✅ Passed: Item removed from cart');
});

test('TC_Cart_03 Continue Shopping', async ({ page }) => {

    console.log('To verify ... TC_Cart_03 Cart Continue Shopping'); 
    // Step 1: Login
    await login(page, 'standard_user', 'secret_sauce');

    // Step 2: Add first item to cart   
    await addNewItemToCart(page, 0);
    await page.waitForTimeout(3000);    
    // Step 3: Go to cart
    await page.locator('.shopping_cart_link').click();
    await page.waitForTimeout(3000);
    // Step 4: Click Continue Shopping
    await page.locator('button:has-text("Continue Shopping")').click();
    await page.waitForTimeout(3000);
    // Step 5: Verify redirect to Inventory Page
    await expect(page).toHaveURL(/inventory.html/);
    console.log('✅ Passed: Redirected to Inventory Page');
});

test('TC_Cart_04 Proceed to Checkout', async ({ page }) => {

    console.log('To verify ... TC_Cart_04 Cart Proceed to Checkout'); 
    // Step 1: Login
    await login(page, 'standard_user', 'secret_sauce');

    // Step 2: Add first item to cart   
    await addNewItemToCart(page, 0);
    await page.waitForTimeout(3000);    
    // Step 3: Go to cart
    await page.locator('.shopping_cart_link').click();
    await page.waitForTimeout(3000);
    // Step 4: Click Checkout
    await page.locator('button:has-text("Checkout")').click();
    await page.waitForTimeout(3000);    
    // Step 5: Verify redirect to Checkout Page
    await expect(page).toHaveURL(/checkout-step-one.html/);
    console.log('✅ Passed: Redirected to Checkout Page');
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');
    console.log('✅ Passed: Checkout page displayed correctly');

});
