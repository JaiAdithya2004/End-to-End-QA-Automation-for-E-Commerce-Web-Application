import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly loginLink: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly logoutLink: Locator;
    readonly loggedInAs: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginLink = page.getByRole('link', { name: 'Signup / Login' });
        // Using data-qa which is standard for automationexercise.com
        this.emailInput = page.locator('[data-qa="login-email"]');
        this.passwordInput = page.locator('[data-qa="login-password"]');
        this.loginButton = page.locator('[data-qa="login-button"]');
        this.errorMessage = page.locator('form[action="/login"] p'); // Generic error finding
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.loggedInAs = page.locator('text=Logged in as');
    }

    async navigate() {
        await this.page.goto('/login');
    }

    async login(email: string, pass: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(pass);
        await this.loginButton.click();
    }

    async verifyLoggedIn(username: string) {
        await expect(this.loggedInAs).toContainText(username);
    }

    async verifyLoginError() {
        await expect(this.errorMessage).toBeVisible();
    }
}
