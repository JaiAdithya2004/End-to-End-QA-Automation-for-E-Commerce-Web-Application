import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly placeOrderButton: Locator;
    readonly nameOnCardInput: Locator;
    readonly cardNumberInput: Locator;
    readonly cvcInput: Locator;
    readonly expirationMonthInput: Locator;
    readonly expirationYearInput: Locator;
    readonly payButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.placeOrderButton = page.getByRole('link', { name: 'Place Order' });

        // Payment Page Selectors
        this.nameOnCardInput = page.locator('[data-qa="name-on-card"]');
        this.cardNumberInput = page.locator('[data-qa="card-number"]');
        this.cvcInput = page.locator('[data-qa="cvc"]');
        this.expirationMonthInput = page.locator('[data-qa="expiry-month"]');
        this.expirationYearInput = page.locator('[data-qa="expiry-year"]');
        this.payButton = page.locator('[data-qa="pay-button"]');
        this.successMessage = page.locator('[data-qa="order-placed"]'); // or similar
    }

    async placeOrder() {
        await this.placeOrderButton.click();
    }

    async enterPaymentDetails(name: string, number: string, cvc: string, month: string, year: string) {
        await this.nameOnCardInput.fill(name);
        await this.cardNumberInput.fill(number);
        await this.cvcInput.fill(cvc);
        await this.expirationMonthInput.fill(month);
        await this.expirationYearInput.fill(year);
        await this.payButton.click();
    }

    async verifyOrderSuccess() {
        // "Order Placed!" or similar
        // AutomationExercise specific:
        await expect(this.page.locator('h2[data-qa="order-placed"]')).toBeVisible();
    }
}
