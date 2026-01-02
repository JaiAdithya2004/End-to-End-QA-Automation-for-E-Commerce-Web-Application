# QA Automation - E-Commerce Project

## Project Overview
This project demonstrates an End-to-End (E2E) Test Automation Framework for an e-commerce application (`automationexercise.com`). It covers critical user journeys including Authentication, Product Discovery, Shopping Cart, and Checkout flows. 

The framework is built using **Playwright** with **TypeScript**, following the **Page Object Model (POM)** design pattern for maintainability and scalability.

## Technologies Used
- **Automation Tool**: Playwright
- **Language**: TypeScript
- **Runtime**: Node.js
- **Reporting**: Playwright HTML Reporter
- **CI/CD**: Local Execution Support (Cross-browser)

## Test Scope & Coverage
The project includes both manual test cases and automated scripts.

### 1. Manual Test Cases
Located in [`manual-test-cases/ecommerce_manual_test_cases.md`](./manual-test-cases/ecommerce_manual_test_cases.md).
- **Authentication**: Valid/Invalid Logins, Signup flows.
- **Product Discovery**: Search, Filter, Sorting validation.
- **Cart**: Add/Remove items, Quantity updates, Total calculation.
- **Checkout**: End-to-end checkout process with mock payment.

### 2. Automation Scenarios
| Spec File | Description |
|-----------|-------------|
| `auth.spec.ts` | Validates User Registration and Login (Positive & Negative). |
| `search_filter.spec.ts` | Verifies Product Search by keyword and Category filtering. |
| `cart.spec.ts` | Validates Add to Cart, Quantity updates, and Removal functionality. |
| `checkout.spec.ts` | Executes the full purchase flow: Register -> Cart -> Checkout -> Payment. |

## How to Run Tests

### Prerequisites
- Node.js installed

### Installation
```bash
npm install
npx playwright install
```

### Run All Tests
```bash
npx playwright test
```

### Run Specific Test
```bash
npx playwright test tests/auth.spec.ts
```

### View Report
```bash
npx playwright show-report
```

## Key Features
- **Page Object Model**: Separates page elements/actions from test logic.
- **Data-Driven Testing**: Uses JSON fixtures for test data.
- **Cross-Browser Testing**: Configured for Chromium, Firefox, and Mobile Viewports.
- **Resilience**: Auto-waiting and robust selectors using `data-qa` attributes.

## QA Mindset & Resume Highlights
- **Test Strategy**: Combining manual test design with targeted automation coverage.
- **Framework Design**: POM for reusability; strict types for reliability.
- **Validation**: Detailed assertions on UI states and business logic (Cart totals).
- **Defect Reporting**: Ready for screenshot capture on failures.

## Known Issues
- **⚠️ Ad Overlays**: The target application (`automationexercise.com`) displays variable interstitial ads. The test framework includes logic to dismiss these overlays to simulate real user behavior. If this fails, navigation may timeout.
- **⚠️ Firefox Flakiness**: Some tests may fail intermittently on Firefox due to browser-specific ad rendering behavior. Chromium tests are more stable.

