/* 
Test Case 2: Inventory Page Functionality Tests for SauceDemo
-----------------------------------------------
Test Case
ID	Module	Test Case	Steps	Expected Result
TC_Inventory_01	Inventory	Verify Products Displayed	Login → Inventory page	List of 6 products displayed with name, image, price
TC_Inventory_02	Inventory	Add Single Item to Cart	Click 'Add to cart' on first item	Button changes to 'Remove' & cart count = 1
TC_Inventory_03	Inventory	Add Multiple Items	Click multiple 'Add to cart' buttons	Cart count updates correctly
TC_Inventory_04	Inventory	Remove Item	Click 'Remove' on an item in cart	Cart count decreases
TC_Inventory_05	Inventory	Sort Products	Use Sort dropdown → Price/Name	Items sorted correctly by selected criteria
TC_Inventory_06	Inventory	Navigate to Cart	Click cart icon	User redirected to Cart page

*/

import { test, expect, Page } from '@playwright/test';
import { login } from '../utils/login';


test('TC_Inventory_01 Verify Products Displayed', async ({ page }) => {

  console.log('To verify ... TC_Inventory_01 Inventory Verify Products Displayed');

  // Reuse login
  await login(page, 'standard_user', 'secret_sauce');

  // Inventory validation
  const productCount = await page.locator('.inventory_item').count();

  expect(productCount).toBe(6);
  console.log('✅ Passed: 6 products are displayed');
});

test('TC_Inventory_02 Add Single Item to Cart', async ({ page }) => {

  console.log('To verify ... TC_Inventory_02 Inventory Add Single Item to Cart');   
    // Reuse login
    await login(page, 'standard_user', 'secret_sauce');

    // Add first item to cart
    await page.locator('.inventory_item').first().locator('button').click();        
    const cartCount = await page.locator('.shopping_cart_badge').innerText();

    expect(cartCount).toBe('1');
    console.log('✅ Passed: Cart count is 1 after adding one item');
});

test('TC_Inventory_03 Add Multiple Items', async ({ page }) => {

  console.log('To verify ... TC_Inventory_03 Inventory Add Multiple Items');   
    // Reuse login
    await login(page, 'standard_user', 'secret_sauce');

    // Add multiple items to cart  
    const itemsToAdd = 4;
    for (let i = 0; i < itemsToAdd; i++) {
      await page.locator('.inventory_item').nth(i).locator('button').click();
    }   
    const cartCount = await page.locator('.shopping_cart_badge').innerText();

    expect(cartCount).toBe(itemsToAdd.toString());
    console.log(`✅ Passed: Cart count is ${itemsToAdd} after adding multiple items`);
}); 

test('TC_Inventory_04 Remove Item', async ({ page }) => {

  console.log('To verify ... TC_Inventory_04 Inventory Remove Item');   
    // Reuse login
    await login(page, 'standard_user', 'secret_sauce');

    // Add item to cart     
    await page.locator('.inventory_item').first().locator('button').click(); 
    await page.waitForTimeout(1500);
    // Remove item from cart
    await page.locator('.inventory_item').first().locator('button').click();  
    await page.waitForTimeout(1500);
    const cartBadge = await page.locator('.shopping_cart_badge').count();   
    expect(cartBadge).toBe(0);
    console.log('✅ Passed: Cart count is 0 after removing the item');
});



const sortOptions = [
  {
    value: 'az',
    label: 'Name (A to Z)',
    validate: async (page: Page) => {
      const names = await page.locator('.inventory_item_name').allTextContents();
      const sorted = [...names].sort();
      expect(names).toEqual(sorted);
    }
  },
  {
    value: 'za',
    label: 'Name (Z to A)',
    validate: async (page: Page) => {
      const names = await page.locator('.inventory_item_name').allTextContents();
      const sorted = [...names].sort().reverse();
      expect(names).toEqual(sorted);
    }
  },
  {
    value: 'lohi',
    label: 'Price (low to high)',
    validate: async (page: Page) => {
      const prices = await page.locator('.inventory_item_price').allTextContents();
      const nums = prices.map(p => parseFloat(p.replace('$', '')));
      const sorted = [...nums].sort((a, b) => a - b);
      expect(nums).toEqual(sorted);
    }
  },
  {
    value: 'hilo',
    label: 'Price (high to low)',
    validate: async (page: Page) => {
      const prices = await page.locator('.inventory_item_price').allTextContents();
      const nums = prices.map(p => parseFloat(p.replace('$', '')));
      const sorted = [...nums].sort((a, b) => b - a);
      expect(nums).toEqual(sorted);
    }
  }
];


test('TC_Inventory_05 Sort Products - Data Driven', async ({ page }) => {
  test.slow();

  console.log('To verify ... TC_Inventory_05 Inventory Sort Products');

  // Login
  await login(page, 'standard_user', 'secret_sauce');

  const sortDropdown = page.locator('.product_sort_container');

  for (const option of sortOptions) {
    console.log(`Verifying sort option: ${option.label}`);

    await sortDropdown.selectOption(option.value);
    await page.waitForTimeout(3000);


    // Ensure page updated
    await expect(page.locator('.inventory_item').first()).toBeVisible();
    await page.waitForTimeout(3000);

    // Run validation
    await option.validate(page);
    await page.waitForTimeout(3000);

    console.log(`✅ Passed: ${option.label}`);
  }
});

test('TC_Inventory_06 Navigate to Cart', async ({ page }) => {

  console.log('To verify ... TC_Inventory_06 Inventory Navigate to Cart');   
    // Reuse login
    await login(page, 'standard_user', 'secret_sauce'); 
    // Navigate to cart
    await page.locator('.shopping_cart_link').click();  
    await page.waitForTimeout(1500);
    const currentUrl = page.url();  
    expect(currentUrl).toBe('https://www.saucedemo.com/cart.html');
    console.log('✅ Passed: User redirected to Cart page');
});

