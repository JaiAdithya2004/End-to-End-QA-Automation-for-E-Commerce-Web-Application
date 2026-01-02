import { test, expect } from './baseTest';
import { LoginPage } from '../pages/LoginPage';
import * as users from '../test-data/users.json';

test.describe('Authentication Flow', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('User should be able to signup and login', async ({ page }) => {
        // Randomize email to ensure signup works
        const timestamp = Date.now();
        const email = `qa_intern_${timestamp}@example.com`;
        const name = 'QA Intern';

        // Navigate to Login/Signup
        // Perform Signup (Inline step as it might require a SignupPage or just simple steps)
        await page.locator('[data-qa="signup-name"]').fill(name);
        await page.locator('[data-qa="signup-email"]').fill(email);
        await page.locator('[data-qa="signup-button"]').click();

        // Fill Account Info
        // Note: automationexercise.com has a long form.
        // We will fill mandatory fields.
        await expect(page.locator('text=Enter Account Information')).toBeVisible();
        await page.locator('#id_gender1').check();
        await page.locator('[data-qa="password"]').fill(users.validUser.password);

        // Select Date of Birth - use option values
        await page.locator('[data-qa="days"]').selectOption({ label: '1' });
        await page.locator('[data-qa="months"]').selectOption({ label: 'January' });
        await page.locator('[data-qa="years"]').selectOption({ label: '2000' });

        await page.locator('#first_name').fill(name);
        await page.locator('#last_name').fill('User');
        await page.locator('#address1').fill('123 Test St');
        await page.locator('#country').selectOption({ label: 'India' });
        await page.locator('#state').fill('NY');
        await page.locator('#city').fill('New York');
        await page.locator('#zipcode').fill('10001');
        await page.locator('#mobile_number').fill('1234567890');

        await page.locator('[data-qa="create-account"]').click();

        await expect(page.locator('[data-qa="account-created"]')).toBeVisible();

        // Remove ads before clicking continue
        await page.evaluate(() => {
            document.querySelectorAll('iframe').forEach(el => el.remove());
        });
        await page.locator('[data-qa="continue-button"]').click();

        // Verify Logged In
        await expect(page.locator('text=Logged in as ' + name)).toBeVisible();

        // Logout
        await page.getByRole('link', { name: 'Logout' }).click();

        // Verify Login with created user
        await loginPage.login(email, users.validUser.password);
        await expect(page.locator('text=Logged in as ' + name)).toBeVisible();

        // Delete Account (Cleanup)
        await page.getByRole('link', { name: 'Delete Account' }).click();
        await expect(page.locator('[data-qa="account-deleted"]')).toBeVisible();
    });

    test('Login with invalid credentials', async ({ page }) => {
        await loginPage.login(users.invalidUser.email, users.invalidUser.password);
        await loginPage.verifyLoginError();
    });
});
