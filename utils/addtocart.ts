import { Page } from '@playwright/test';

/**
 * Add an item to the cart by index (0 = first item)
 */
export async function addNewItemToCart(page: Page, index: number = 0) {
    const addButtons = page.locator('button:has-text("Add to cart")');
    await addButtons.nth(index).click();
}
