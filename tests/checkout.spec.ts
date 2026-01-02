import { test, expect } from './baseTest';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout Flow', () => {
    test('User can place order', async ({ page }) => {
        // 1. Register User (Prerequisite for Checkout)
        const timestamp = Date.now();
        const email = `checkout_${timestamp}@test.com`;

        await page.goto('/login');
        await page.locator('[data-qa="signup-name"]').fill('Checkout User');
        await page.locator('[data-qa="signup-email"]').fill(email);
        await page.locator('[data-qa="signup-button"]').click();

        // Fill Mandatory Registration (Quickest path)
        await page.locator('#id_gender1').check();
        await page.locator('[data-qa="password"]').fill('Password123');
        await page.locator('#first_name').fill('User');
        await page.locator('#last_name').fill('Test');
        await page.locator('#address1').fill('Street 1');
        await page.locator('#country').selectOption('India');
        await page.locator('#state').fill('State');
        await page.locator('#city').fill('City');
        await page.locator('#zipcode').fill('00000');
        await page.locator('#mobile_number').fill('9999999999');
        await page.locator('[data-qa="create-account"]').click();
        await expect(page.locator('[data-qa="account-created"]')).toBeVisible();
        await page.locator('[data-qa="continue-button"]').click();

        // 2. Add Item to Cart
        const productPage = new ProductPage(page);
        await productPage.navigate();
        await productPage.addProductToCart(0);

        // 3. Proceed to Checkout
        const cartPage = new CartPage(page);
        await cartPage.navigate();
        await cartPage.proceedToCheckout();

        // 4. Verify Checkout Page
        await expect(page).toHaveURL(/.*checkout/);

        // 5. Place Order
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.placeOrder();

        // 6. Payment
        await checkoutPage.enterPaymentDetails('Test Name', '41111111111111111', '123', '01', '2030');

        // 7. Verify Success
        await checkoutPage.verifyOrderSuccess();

        // Cleanup: Delete Account
        await page.getByRole('link', { name: 'Delete Account' }).click();
        await expect(page.locator('[data-qa="account-deleted"]')).toBeVisible();
    });
});
