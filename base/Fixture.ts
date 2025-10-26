import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { YourCartPage } from '../pages/YourCartPage';
import { YourInfoCheckoutPage } from '../pages/YourInfoCheckoutPage';
import { FinishCheckoutPage } from '../pages/FinishCheckoutPage';
import { OrderCompletePage } from '../pages/OrderCompletePage';

// Declare the types of your fixtures.
type MyFixtures = {
  loginPage: LoginPage;
  productPage: ProductPage;
  yourCartPage: YourCartPage;
  yourInfoPage: YourInfoCheckoutPage;
  finishCheckoutPage: FinishCheckoutPage;
  orderCompletePage: OrderCompletePage;

};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    // Set up the fixture.
    const home = new LoginPage(page);
    await use(home);    
  },
  productPage: async ({ page }, use) => {
    // Set up the fixture.
    const product = new ProductPage(page);
    await use(product);    
  },
  yourCartPage: async ({ page }, use) => {
    // Set up the fixture.
    const cart = new YourCartPage(page);
    await use(cart);    
  },
   yourInfoPage: async ({ page }, use) => {
    // Set up the fixture.
    const info = new YourInfoCheckoutPage(page);
    await use(info);    
  },
  finishCheckoutPage: async ({ page }, use) => {
    // Set up the fixture.
    const finish = new FinishCheckoutPage(page);
    await use(finish);    
  },
  orderCompletePage: async ({ page }, use) => {
    // Set up the fixture.
    const orderComplete = new OrderCompletePage(page);
    await use(orderComplete);    
  },
});
export { expect } from '@playwright/test';