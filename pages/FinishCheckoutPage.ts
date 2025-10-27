import { Page, Locator,expect } from '@playwright/test';

export class FinishCheckoutPage {
  readonly page: Page;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly homepageTitle:Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.finishButton = page.locator('.btn_action.cart_button');
    this.cancelButton = page.locator('button[data-test="cancel"]');
    this.homepageTitle=page.locator('.title')
  }

  
  async getOrderItemQuantity(): Promise<string | null> {
    return await this.page.locator('.cart_quantity').first().textContent();
  }

  async getOrderItemDescription(): Promise<string | null> {
    return await this.page.locator('.inventory_item_desc').first().textContent();
  }

  async getOrderItemName(): Promise<string | null> {
    return await this.page.locator('.inventory_item_name').first().textContent();
  }

  async getOrderItemPrice(): Promise<string | null> {
    return await this.page.locator('.inventory_item_price').first().textContent();
  }

  async getSubtotal(): Promise<string | null> {
    return await this.page.locator('.summary_subtotal_label').textContent();
  }

  async getTax(): Promise<string | null> {
    return await this.page.locator('.summary_tax_label').textContent();
  }

  async getTotal(): Promise<string | null> {
    return await this.page.locator('.summary_total_label').textContent();
  }

  async getPaymentInfo(): Promise<string | null> {
    return await this.page.locator('.summary_value_label').first().textContent();
  }

  async getShippingInfo(): Promise<string | null> {
    return await this.page.locator('.summary_value_label').last().textContent();
  }
  async validateOrderDetails(itemQuantity:string,itemName:string,itemPrice:string,itemDescription:string,itemSubtotal:string,itemTax:string,itemTotal:string,itemPaymentInfo:string,itemShippingInfo:string) {
    expect (await this.getOrderItemQuantity()).toBe(itemQuantity)
    expect (await this.getOrderItemName()).toBe(itemName)
    expect (await this.getOrderItemPrice()).toBe(itemPrice)   
    expect (await this.getOrderItemDescription()).toBe(itemDescription)
    expect(await this.getTax()).toBe(itemTax)
    expect (await this.getSubtotal()).toBe(itemSubtotal)
    expect(await this.getTotal()).toBe(itemTotal)
    expect (await this.getPaymentInfo()).toBe(itemPaymentInfo)
    expect (await this.getShippingInfo()).toBe(itemShippingInfo)
    
  } 
  async clickFinishButton() {
    await this.finishButton.click();
  }
  async clickCancelButton() {
    await this.cancelButton.click();

  }
  async validateHomePageAfterBackHomeButton() {
    
    await expect(this.homepageTitle).toBeVisible()
 }

}



