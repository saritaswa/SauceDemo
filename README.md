# SauceDemo Playwright Test Automation Framework

This is a comprehensive end-to-end test automation framework for the [SauceDemo](https://www.saucedemo.com) e-commerce application, built using Playwright with TypeScript.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Configuration](#configuration)
- [Fixtures](#fixtures)
- [Test Cases](#test-cases)
- [CI/CD Pipeline](#cicd-pipeline)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Reporting](#reporting)

## 🎯 Project Overview

This framework automates the testing of the SauceDemo e-commerce application, covering critical user journeys including login, product selection, cart management, checkout process, and order completion.

## 📁 Project Structure

```
SauceDemo/
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions CI/CD workflow
├── base/
│   ├── Fixture.ts                  # Custom Playwright fixtures
│   └── Setup.ts                    # Test setup configurations
├── pages/                          # Page Object Model (POM)
│   ├── LoginPage.ts               # Login page object
│   ├── ProductPage.ts             # Products listing page object
│   ├── YourCartPage.ts            # Shopping cart page object
│   ├── YourInfoCheckoutPage.ts    # Checkout information page object
│   ├── FinishCheckoutPage.ts      # Order review page object
│   └── OrderCompletePage.ts       # Order confirmation page object
├── testData/                       # Test data files
│   ├── Login.data.ts              # User credentials
│   ├── Info.data.ts               # Customer information
│   └── CartItem.data.ts           # Product/cart item data
├── tests/
│   └── SauceDemo.spec.ts          # Main test suite
├── allure-results/                 # Allure test results
├── allure-report/                  # Generated Allure reports
├── playwright-report/              # Playwright HTML reports
├── test-results/                   # Test execution results
├── package.json                    # Node.js dependencies
├── playwright.config.ts            # Playwright configuration
└── tsconfig.json                   # TypeScript configuration
```

## 🛠️ Technologies Used

### Core Framework

- **Playwright**: v1.56.1 - Modern web testing framework
- **TypeScript**: Type-safe JavaScript for better code quality
- **Node.js**: JavaScript runtime environment

### Testing Tools

- **@playwright/test**: Playwright's test runner
- **@cucumber/cucumber**: v12.2.0 - BDD framework support

### Reporting

- **Allure Playwright**: Advanced test reporting with detailed insights
- **Built-in Playwright Reporter**: HTML reports with screenshots and traces

### CI/CD

- **GitHub Actions**: Automated test execution on push/PR
- **Docker Container**: `mcr.microsoft.com/playwright:v1.56.1-noble`

## ⚙️ Configuration

### Playwright Configuration (`playwright.config.ts`)

The framework is configured with the following settings:

#### Test Configuration

- **Test Match Pattern**: `SauceDemo.spec.ts`
- **Timeout**: 30 seconds per test
- **Expect Timeout**: 5 seconds for assertions
- **Parallel Execution**: Enabled (`fullyParallel: true`)
- **Retries**: 2 retries on CI, 0 on local
- **Workers**: 1 worker on CI, unlimited on local

#### Base Configuration

```typescript
use: {
  actionTimeout: 0,              // No timeout for actions
  baseURL: 'https://www.saucedemo.com',
  trace: 'on-first-retry',       // Trace on retry
  headless: true                 // Run in headless mode
}
```

#### Browser Configuration

- **Primary Browser**: Chromium (Desktop Chrome)
- **Commented Out**: Firefox, WebKit, Mobile browsers, Edge, Chrome channel

#### Reporters

The framework uses multiple reporters for comprehensive test reporting:

1. **List Reporter**: Console output with test details
2. **Dot Reporter**: Minimal progress indicator
3. **Allure Reporter**: Rich HTML reports with screenshots
4. **JSON Reporter**: Machine-readable test results

## 🔧 Fixtures

### Custom Fixtures (`base/Fixture.ts`)

The framework implements the Page Object Model using custom Playwright fixtures for better test organization and reusability.

#### Available Fixtures

```typescript
type MyFixtures = {
  loginPage: LoginPage;
  productPage: ProductPage;
  yourCartPage: YourCartPage;
  yourInfoPage: YourInfoCheckoutPage;
  finishCheckoutPage: FinishCheckoutPage;
  orderCompletePage: OrderCompletePage;
};
```

#### How Fixtures Work

Each fixture automatically initializes the corresponding page object before the test and makes it available in the test context:

```typescript
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const home = new LoginPage(page);
    await use(home);
  },
  productPage: async ({ page }, use) => {
    const product = new ProductPage(page);
    await use(product);
  },
  // ... other fixtures
});
```

#### Benefits

- **Automatic Setup**: Page objects are initialized automatically
- **Type Safety**: TypeScript provides IntelliSense and type checking
- **Clean Tests**: No manual page object instantiation in tests
- **Reusability**: Share page objects across multiple tests

## 🧪 Test Cases

### Test Suite: SauceDemo E2E Test Suite

The framework includes 5 comprehensive test cases covering critical user journeys:

#### 1. **Successful Purchase of One Item**

- **Flow**: Login → Add to Cart → Checkout → Payment → Order Confirmation
- **Validations**:
  - Login page validation
  - Successful login
  - Item added to cart
  - Cart items validation
  - Customer information submission
  - Order details (quantity, price, tax, total)
  - Payment and shipping information
  - Order completion message
  - Return to home page

#### 2. **Unsuccessful Login with Locked User**

- **Flow**: Attempt login with locked user credentials
- **Validations**:
  - Error message displayed for locked user
  - Login prevented

#### 3. **Check Removal of Items on Product Page**

- **Flow**: Login → Add to Cart → Remove from Product Page
- **Validations**:
  - Item successfully added to cart
  - Item successfully removed from cart
  - Cart badge updated correctly

#### 4. **Check Removal of Items on Your Cart Page**

- **Flow**: Login → Add to Cart → Navigate to Cart → Remove Item
- **Validations**:
  - Item present in cart
  - Item removed from cart page
  - Cart updated after removal

#### 5. **Check Cancel Button on Finish Checkout Page**

- **Flow**: Login → Add to Cart → Checkout → Enter Info → Cancel
- **Validations**:
  - Navigate through checkout process
  - Cancel button functionality
  - Return to home page after cancellation

### Test Data

Test data is externalized in separate files for maintainability:

- **Login.data.ts**: User credentials (Standard user, Locked user)
- **Info.data.ts**: Customer information (First name, Last name, Zip code)
- **CartItem.data.ts**: Product details (Name, price, quantity, description, tax, totals)

## 🚀 CI/CD Pipeline

### GitHub Actions Workflow (`playwright.yml`)

The framework includes automated CI/CD pipeline with the following features:

#### Triggers

```yaml
on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
  workflow_dispatch: # Manual trigger
```

#### Workflow Steps

1. **Checkout Code**: Clone the repository
2. **Setup Node.js**: Install LTS Node.js version with npm cache
3. **Install Dependencies**: `npm ci` for clean install
4. **Install Playwright Browsers**: Install required browser binaries
5. **Run Tests**: Execute all Playwright tests
6. **Generate Allure Report**: Create comprehensive HTML reports
7. **Upload Artifacts**: Store Allure reports for 30 days

#### Container Configuration

```yaml
container:
  image: mcr.microsoft.com/playwright:v1.56.1-noble
timeout-minutes: 60
```

## 📦 Installation

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/saritaswa/SauceDemo.git
   cd SauceDemo
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install Playwright browsers**

   ```bash
   npx playwright install
   ```

4. **Verify installation**
   ```bash
   npx playwright --version
   ```

## ▶️ Running Tests

### Run All Tests

```bash
npx playwright test
```

### Run Tests in UI Mode (Interactive)

```bash
npx playwright test --ui
```

### Run Tests in Headed Mode (See Browser)

```bash
npx playwright test --headed
```

### Run Specific Test

```bash
npx playwright test SauceDemo.spec.ts
```

### Run Tests with Specific Browser

```bash
npx playwright test --project=chromium
```

### Run Tests in Debug Mode

```bash
npx playwright test --debug
```

### Run Tests and Generate Trace

```bash
npx playwright test --trace on
```

## 📊 Reporting

### View Playwright HTML Report

```bash
npx playwright show-report
```

### Generate and View Allure Report

```bash
# Generate report
npx allure generate allure-results --clean -o allure-report

# Open report
npx allure open allure-report
```

### Report Locations

- **Playwright Reports**: `playwright-report/index.html`
- **Allure Reports**: `allure-report/index.html`
- **Test Results**: `test-results/`
- **Allure Raw Data**: `allure-results/`

## 🏗️ Framework Architecture

### Design Patterns

- **Page Object Model (POM)**: Separates page structure from test logic
- **Fixture Pattern**: Reusable test setup and teardown
- **Data-Driven Testing**: External test data management


I'll analyze the test execution and configuration to identify the assumptions made. Let me examine the key files:

Read SauceDemo.spec.ts

Read playwright.config.ts, lines 1 to 50

Read playwright.yml

Read Login.data.ts, lines 1 to 30

Read Info.data.ts

Read CartItem.data.ts

Based on my analysis of the test execution files, here are the key assumptions made during test execution:

🔍 Assumptions Made During Test Execution

1. Test Data Assumptions
   
Product Selection: Always uses index 0 (first product - "Sauce Labs Backpack")
Assumes the first product is always available and in stock
Assumes product order doesn't change
Hardcoded Product Details: Tax rate (8%), shipping method ("Free Pony Express Delivery"), and payment method ("SauceCard #31337") are fixed
Customer Information: Uses the same test user data (Saru Swami, 2167) for all checkout tests


3. Test Order Dependencies
Serial Execution: Tests use test.describe.serial()
Assumes tests must run in a specific order
If one test fails, subsequent tests may be skipped
Risky: Test 1's state might affect Tests 3-5

4. Browser & Environment Assumptions
Single Browser Testing: Only Chromium is enabled (Firefox and WebKit are commented out)
Headless Mode: Always runs headless (headless: true)
No Action Timeout: actionTimeout: 0 means unlimited wait


6. Application State Assumptions
Clean State: Each test assumes a fresh browser state via fixtures
No Session Persistence: Assumes no cookies/storage between tests
Cart Resets: Tests 3, 4, and 5 assume cart is empty at start
User Availability: Assumes standard_user is always available 

7. CI/CD Assumptions
Ubuntu Only: Workflow runs on ubuntu-latest
Assumes no OS-specific issues
Not testing on Windows or macOS
60-Minute Timeout: Assumes all tests complete within 60 minutes
Single Worker on CI: workers: 1 on CI means no parallel execution
Assumes tests are too dependent to run in parallel


8. Test Validation Assumptions
Same Item Throughout: Tests 1, 3, 4, and 5 all use the same product (index 0)
No Price Changes: Hardcoded prices assume they never change on the website


10. Page Object Assumptions
Method Names Match Actions: Assumes method names clearly indicate what they do
No Page Navigation Failures: No explicit wait for page loads between steps
Element Stability: Assumes elements don't move or change during interactions
ISC

---

**Author**: saritaswa
**Repository**: [SauceDemo](https://github.com/saritaswa/SauceDemo)
