# Manual Test Cases - E-Commerce Application
**Target URL**: `https://automationexercise.com/`

## 1. Authentication

| ID | Title | Preconditions | Test Steps | Expected Result | Priority |
|----|-------|---------------|------------|-----------------|----------|
| TC_AUTH_01 | Verify Valid Login | User is on Home Page | 1. Click 'Signup / Login'<br>2. Enter valid Email<br>3. Enter valid Password<br>4. Click 'Login' | User is logged in; 'Logged in as [User]' is visible | High |
| TC_AUTH_02 | Verify Invalid Login | User is on Login Page | 1. Enter valid Email<br>2. Enter invalid Password<br>3. Click 'Login' | Error message 'Incorrect email or password' is displayed | High |
| TC_AUTH_03 | Login with Empty Fields | User is on Login Page | 1. Leave Email & Password empty<br>2. Click 'Login' | HTML5 validation prompt or inline error indicating required fields | Medium |
| TC_AUTH_04 | Logout | User is logged in | 1. Click 'Logout' | User is redirected to Login page | Medium |

## 2. Product Discovery

| ID | Title | Preconditions | Test Steps | Expected Result | Priority |
|----|-------|---------------|------------|-----------------|----------|
| TC_PROD_01 | Search Product by Keyword | User is on Products Page | 1. Enter 'Dress' in Search input<br>2. Click Search button | List of products containing 'Dress' is displayed | High |
| TC_PROD_02 | Filter by Category | User is on Products Page | 1. Click 'Women' category<br>2. Click 'Dress' sub-category | Only products belonging to 'Women > Dress' are displayed | High |
| TC_PROD_03 | Search Non-Existent Product | User is on Products Page | 1. Enter 'ZXY123' in Search<br>2. Click Search | Message 'No products found' or empty list is displayed | Low |
| TC_PROD_04 | Verify Product Details | User on Search Results | 1. Click 'View Product' on any item | Product detail page opens; Price, Availability, Condition are visible | Medium |

## 3. Shopping Cart

| ID | Title | Preconditions | Test Steps | Expected Result | Priority |
|----|-------|---------------|------------|-----------------|----------|
| TC_CART_01 | Add Product to Cart | User on Product Detail | 1. Click 'Add to cart'<br>2. Click 'View Cart' in modal | Product is listed in Cart with correct Price and Quantity 1 | High |
| TC_CART_02 | Increase Quantity | User has 1 item in Cart | 1. (On Product Page) Set Qty to 3<br>2. Click 'Add to cart'<br>3. View Cart | OR logic: If added twice, Qty updates. On this site, Qty is set before adding. Verify Cart shows Qty 3. | Medium |
| TC_CART_03 | Remove Product | User has item in Cart | 1. Click 'X' button next to item | Item is removed from the list; Cart is empty (if only 1 item) | High |
| TC_CART_04 | Validate Total Price | User has 2 items in Cart | 1. Verify 'Total' matches (Price * Qty) | Calculation is correct | High |

## 4. Checkout

| ID | Title | Preconditions | Test Steps | Expected Result | Priority |
|----|-------|---------------|------------|-----------------|----------|
| TC_CHK_01 | Checkout Logic | User Logged In, Cart > 0 | 1. Click 'Proceed To Checkout'<br>2. Verify Address/Review Order<br>3. Enter Comment<br>4. Click 'Place Order' | Payment page is displayed | High |
| TC_CHK_02 | Payment Success (Mock) | User on Payment Page | 1. Enter Mock Card Details<br>2. Click 'Pay and Confirm Order' | Success message 'Your order has been placed successfully!' displayed | High |
