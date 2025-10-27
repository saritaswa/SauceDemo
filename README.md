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

### Best Practices

- ✅ Type-safe TypeScript code
- ✅ Modular and maintainable structure
- ✅ Comprehensive test coverage
- ✅ Detailed reporting and logging
- ✅ CI/CD integration
- ✅ Version-controlled test data
- ✅ Parallel test execution support

## 📝 Notes

- Tests are configured to run serially (`test.describe.serial`) to maintain state consistency
- Base URL is configured globally: `https://www.saucedemo.com`
- Headless mode is enabled by default for faster execution
- Traces are captured on first retry for debugging failures
- Allure reports provide detailed test execution insights

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

ISC

---

**Author**: saritaswa
**Repository**: [SauceDemo](https://github.com/saritaswa/SauceDemo)
