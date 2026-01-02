import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartLink: Locator;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartLink = page.getByRole('link', { name: 'Cart' });
        this.cartItems = page.locator('#cart_info_table tbody tr');
        this.checkoutButton = page.getByText('Proceed To Checkout');
    }

    async navigate() {
        // Remove ads first
        await this.page.evaluate(() => {
            document.querySelectorAll('iframe').forEach(el => el.remove());
        });
        await this.cartLink.first().click();
        await expect(this.page).toHaveURL(/.*view_cart/);
    }

    async verifyItemInCart(productName: string) {
        await expect(this.cartItems).toContainText(productName);
    }

    async removeItem(index: number = 0) {
        const deleteBtn = this.cartItems.nth(index).locator('.cart_quantity_delete');
        await deleteBtn.click();
        // Wait for the row to be removed from DOM
        await this.page.waitForTimeout(500);
    }

    async proceedToCheckout() {
        // Remove ads before clicking checkout
        await this.page.evaluate(() => {
            document.querySelectorAll('iframe').forEach(el => el.remove());
        });
        await this.checkoutButton.click();
    }

    async getCartTotal(): Promise<string> {
        // Implementation depends on site structure, assume last row or specific logic
        // For automationexercise, it might require parsing.
        // Simplified: return text of total
        return await this.page.locator('.cart_total_price').last().innerText();
    }
}
