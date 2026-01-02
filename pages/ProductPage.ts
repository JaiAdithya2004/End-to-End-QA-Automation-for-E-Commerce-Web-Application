import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly productsLink: Locator;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly searchResultsTitle: Locator;
    readonly productList: Locator;
    readonly categorySidebar: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productsLink = page.locator('a[href="/products"]'); // More robust selector
        this.searchInput = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');
        this.searchResultsTitle = page.locator('.features_items .title');
        this.productList = page.locator('.features_items .col-sm-4');
        this.categorySidebar = page.locator('#accordian'); // Left sidebar
    }

    async navigate() {
        // Step 1: Go to the homepage first to ensure we're on the site
        await this.page.goto('/');
        await this.page.waitForLoadState('domcontentloaded');

        // Step 2: Remove ALL iframes (ads) from the DOM using JavaScript
        // This is a robust approach for sites with heavy ad overlays
        await this.page.evaluate(() => {
            document.querySelectorAll('iframe').forEach(el => el.remove());
            // Also remove common ad containers
            document.querySelectorAll('[id*="google_ads"], [class*="adsbygoogle"], [id*="ad_position"]').forEach(el => el.remove());
        });

        // Step 3: Wait for the Products link to be visible
        await expect(this.productsLink.first()).toBeVisible({ timeout: 10000 });

        // Step 4: Click the Products link
        await this.productsLink.first().click();

        // Step 5: Verify navigation
        await expect(this.page).toHaveURL(/.*products/);
    }

    async searchProduct(term: string) {
        await this.searchInput.fill(term);
        await this.searchButton.click();
    }

    async filterByCategory(category: string, subCategory: string) {
        // Expand category
        await this.categorySidebar.getByRole('link', { name: category, exact: false }).click();
        // Click sub category
        await this.page.getByRole('link', { name: subCategory, exact: false }).click();
        // Wait for page load or title change
        await expect(this.searchResultsTitle).toContainText(subCategory, { ignoreCase: true });
    }

    async addProductToCart(index: number = 0) {
        // Remove any lingering ads first
        await this.page.evaluate(() => {
            document.querySelectorAll('iframe').forEach(el => el.remove());
        });

        // Get the product card
        const product = this.productList.nth(index);
        await expect(product).toBeVisible({ timeout: 10000 });

        // Hover to reveal overlay
        await product.hover();

        // Click add to cart (the overlay version)
        const addToCartBtn = product.locator('.product-overlay a.add-to-cart');
        await expect(addToCartBtn).toBeVisible({ timeout: 5000 });
        await addToCartBtn.click();

        // Wait for modal and click Continue Shopping
        await expect(this.page.locator('#cartModal')).toBeVisible({ timeout: 10000 });
        await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
    }
}
