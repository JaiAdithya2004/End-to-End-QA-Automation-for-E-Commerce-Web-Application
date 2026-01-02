import { test, expect } from './baseTest';
import { ProductPage } from '../pages/ProductPage';

test.describe('Product Discovery', () => {
    let productPage: ProductPage;

    test.beforeEach(async ({ page }) => {
        productPage = new ProductPage(page);
        await productPage.navigate();
        // Dismiss ad if present (common on this site) - handled globally or by click
    });

    test('Search Product by keyword', async ({ page }) => {
        await productPage.searchProduct('Dress');

        // Wait for search results
        await expect(productPage.searchResultsTitle).toBeVisible({ timeout: 10000 });
        await expect(productPage.searchResultsTitle).toContainText('Searched Products');

        // Validate search results count
        const count = await productPage.productList.count();
        expect(count).toBeGreaterThan(0);

        // Validate item name contains keyword (check paragraph inside product)
        const firstItemName = await productPage.productList.first().locator('p').first().innerText();
        expect(firstItemName.toLowerCase()).toContain('dress');
    });

    test('Filter Products by Category', async ({ page }) => {
        // Validate initial count (optional)

        // Filter by Women -> Dress
        await productPage.filterByCategory('Women', 'Dress');

        // Validate title
        await expect(page.locator('.features_items .title')).toContainText('Women - Dress Products');

        // Validate items are displayed
        const count = await productPage.productList.count();
        expect(count).toBeGreaterThan(0);
    });
});
