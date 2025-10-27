import { Page, Locator } from '@playwright/test';
import { TEST_INFO } from '../testData/Info.data';

export class YourInfoCheckoutPage {
 
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipCodeInput: Locator; 
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.zipCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
  
  }

  async firstName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }

  async lastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }
  async zipCode(zipCode: string) {
    await this.zipCodeInput.fill(zipCode  );
  }
  async addCustomerInfo(firstName: string, lastName: string, zipCode: string) {
    await this.firstName(firstName);
    await this.lastName(lastName);
    await this.zipCode(zipCode);
  }
  async clickCancelButton() {
    await this.cancelButton.click();
  }
  async clickcontinueButton() {
    await this.continueButton.click();
  }

}