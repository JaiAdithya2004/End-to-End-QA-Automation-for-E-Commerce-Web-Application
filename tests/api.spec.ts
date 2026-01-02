import { test, expect } from '@playwright/test';

test.describe('API Validation', () => {
    test('GET All Products List', async ({ request }) => {
        const response = await request.get('https://automationexercise.com/api/productsList');
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('responseCode', 200);
        expect(Array.isArray(responseBody.products)).toBeTruthy();
        expect(responseBody.products.length).toBeGreaterThan(0);

        // Validate structure of first product
        const firstProduct = responseBody.products[0];
        expect(firstProduct).toHaveProperty('id');
        expect(firstProduct).toHaveProperty('name');
        expect(firstProduct).toHaveProperty('price');
    });
});
