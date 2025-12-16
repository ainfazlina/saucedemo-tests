/* 
Test Case 1: Login Functionality Tests for SauceDemo
-----------------------------------------------
Test Case
ID	Module	Test Case	Steps	Expected Result
TC_Login_01	Login	Valid Login	Enter 'standard_user' / 'secret_sauce' → Click Login	User redirected to Inventory Page
TC_Login_02	Login	Invalid Username	Enter 'wrong_user' / 'secret_sauce' → Click Login	Error: “Username and password do not match any user”
TC_Login_03	Login	Invalid Password	Enter 'standard_user' / 'wrong_pass' → Click Login	Error: “Username and password do not match any user”
TC_Login_04	Login	Blank Username	Leave username blank / Enter password → Click Login	Error: “Username is required”
TC_Login_05	Login	Blank Password	Enter username / leave password blank → Click Login	Error: “Password is required”
TC_Login_06	Login	Locked Out User	Use 'locked_out_user' / 'secret_sauce' → Click Login	Error: “Sorry, this user has been locked out”
TC_Login_07	Login	Performance Glitch User	Use 'performance_glitch_user' / 'secret_sauce' → Click Login	Login successful (page loads correctly)
TC_Login_08	Login	Visual User	Use 'visual_user' / 'secret_sauce' → Click Login	Login successful but with misaligned button position such as add to cart

*/

import { test, expect } from '@playwright/test';
import { url } from 'inspector';

test('TC_Login_01 Valid Login', async ({ page }) => {

    console.log(`To verify ... TC_Login_01	Login	Valid Login`);

    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Expected result 1: User redirected to Inventory Page
    const currentUrl = page.url();
    if (currentUrl === 'https://www.saucedemo.com/inventory.html') {
    console.log('✅ Passed: User redirected to Inventory Page');
    } else {
    console.log('❌ Failed: URL is', currentUrl);
    }
});

test('TC_Login_02 Invalid Username', async ({ page }) => {

    test.setTimeout(120000);
    console.log(`To verify ... TC_Login_02 Invalid Username`);

    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user3');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
});

test('TC_Login_03 Invalid Password', async ({ page }) => {

    test.setTimeout(120000);
    console.log(`To verify ... TC_Login_03 Invalid Password`);

    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce1');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
});

test('TC_Login_04 Blank Username', async ({ page }) => {
    test.setTimeout(120000);
    console.log(`To verify ... TC_Login_04 Blank Username`); 

      await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username is required');
});

test('TC_Login_05 Blank Password', async ({ page }) => {
    test.setTimeout(120000);
    console.log(`To verify ... TC_Login_05 Blank Password`); 

    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Password is required');
});

test('TC_Login_06 Locked Out User', async ({ page }) => {

    test.setTimeout(120000);
    console.log(`To verify ... TC_Login_06 Locked Out User`);   

    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('locked_out_user');   
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out.');
});

test('TC_Login_07 Performance Glitch User', async ({ page }) => {

    console.log(`To verify ... TC_Login_07 Performance Glitch User`);
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('performance_glitch_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();   
    
    // Expected result 1: User redirected to Inventory Page
    const currentUrl = page.url();
    if (currentUrl === 'https://www.saucedemo.com/inventory.html') {
    console.log('✅ Passed: User redirected to Inventory Page');
    } else {
    console.log('❌ Failed: URL is', currentUrl);
    }   
});

test('TC_Login_08 Visual User - detect visual defect', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.fill('[data-test="username"]', 'visual_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  // Verify user lands on inventory page
  await expect(page).toHaveURL(/inventory.html/);

  // EXPECT visual defect to exist
  await expect(page.locator('#shopping_cart_container'))
    .toHaveClass(/visual_failure/);
});
