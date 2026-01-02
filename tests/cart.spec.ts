import { test, expect } from './baseTest';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test.describe('Shopping Cart', () => {
    test('Add Product to Cart and Verify Quantity', async ({ page }) => {
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);

        await productPage.navigate();

        // Add random product (e.g., first one)
        await productPage.addProductToCart(0);

        // Go to Cart
        await cartPage.navigate();

        // Verify 1 item
        await expect(cartPage.cartItems).toHaveCount(1);
        await expect(cartPage.cartItems.first().locator('.cart_quantity')).toContainText('1');
    });

    test('Add Product with specific quantity', async ({ page }) => {
        // Go to product details of the 3rd product
        await page.goto('/product_details/3');
        await page.waitForLoadState('domcontentloaded');

        // Remove ads
        await page.evaluate(() => {
            document.querySelectorAll('iframe').forEach(el => el.remove());
        });

        // Set quantity to 3
        await page.locator('#quantity').fill('3');

        // Add to cart - the button has type="button" and class "btn btn-default cart"
        await page.locator('button[type="button"].cart').click();
        await expect(page.locator('#cartModal')).toBeVisible({ timeout: 10000 });
        await page.getByRole('link', { name: 'View Cart' }).click();

        // Verify Quantity
        await expect(page.locator('.cart_quantity').first()).toContainText('3');
    });

    test('Remove Product from Cart', async ({ page }) => {
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);

        await productPage.navigate();
        await productPage.addProductToCart(0);
        await cartPage.navigate();

        await expect(cartPage.cartItems).toHaveCount(1);

        await cartPage.removeItem();

        // The site shows "Cart is empty! Click here to buy products."
        await expect(page.getByText('Cart is empty!')).toBeVisible({ timeout: 10000 });
    });
});
