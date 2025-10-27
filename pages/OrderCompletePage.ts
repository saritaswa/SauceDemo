import { Locator, Page, expect } from '@playwright/test';

export class OrderCompletePage {
    readonly page: Page;
    readonly thankYouMessage:Locator;
    readonly backHomeButton:Locator;
    readonly homepageTitle:Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.thankYouMessage=this.page.getByText('THANK YOU FOR YOUR ORDER')
    this.backHomeButton=this.page.locator('button[data-test="back-to-products"]')
    this.homepageTitle=this.page.locator('.title');
  }

  async validateOrderComplete() {
    await expect(this.thankYouMessage).toBeVisible()
  }

  async clickBackHome() {
    await this.backHomeButton.click()
  }
 async validateHomePageAfterBackHomeButton() {

    
    await expect(this.homepageTitle).toBeVisible()
 }

}