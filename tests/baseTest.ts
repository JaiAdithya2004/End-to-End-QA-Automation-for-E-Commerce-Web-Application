import { test as base } from '@playwright/test';

export const test = base.extend({
    page: async ({ page }, use) => {
        // Mock/Block Ad Networks common on automationexercise.com
        await page.route('**/*google_ads*', route => route.abort());
        await page.route('**/*googlesyndication*', route => route.abort());
        await page.route('**/*doubleclick*', route => route.abort());
        await page.route('**/view_cart/**', route => route.continue()); // Whitelist app routes if needed
        await use(page);
    }
});

export { expect } from '@playwright/test';
