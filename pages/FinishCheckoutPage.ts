import { Locator, Page, expect } from '@playwright/test';

export class FinishCheckoutPage {
  readonly page: Page;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly homepageTitle: Locator;
  readonly orderItemQuantity: Locator;
  readonly orderItemDescription: Locator;
  readonly orderItemName: Locator;
  readonly orderItemPrice: Locator;
  readonly orderItemSubtotal: Locator;
  readonly orderItemTax: Locator;
  readonly orderItemTotal: Locator;
  readonly orderItemPaymentInfo: Locator;
  readonly orderItemShippingInfo: Locator;



  constructor(page: Page) {
    this.page = page;
    this.finishButton = page.locator('.btn_action.cart_button');
    this.cancelButton = page.locator('button[data-test="cancel"]');
    this.homepageTitle=this.page.locator('.title');
    this.orderItemQuantity = this.page.locator('.cart_quantity');
    this.orderItemDescription = this.page.locator('.inventory_item_desc');
    this.orderItemName = this.page.locator('.inventory_item_name');
    this.orderItemPrice = this.page.locator('.inventory_item_price');
    this.orderItemSubtotal = this.page.locator('.summary_subtotal_label');
    this.orderItemTax = this.page.locator('.summary_tax_label');
    this.orderItemTotal = this.page.locator('.summary_total_label');
    this.orderItemPaymentInfo = this.page.locator('.summary_value_label').first();
    this.orderItemShippingInfo = this.page.locator('.summary_value_label').last();
    

  }


  async getOrderItemQuantity(): Promise<string | null> {
    return await this.orderItemQuantity.first().textContent();
  }

  async getOrderItemDescription(): Promise<string | null> {
    return await this.orderItemDescription.first().textContent();
  }

  async getOrderItemName(): Promise<string | null> {
    return await this.orderItemName.first().textContent();
  }

  async getOrderItemPrice(): Promise<string | null> {
    return await this.orderItemPrice.first().textContent();
  }

  async getSubtotal(): Promise<string | null> {
    return await this.orderItemSubtotal.textContent();
  }

  async getTax(): Promise<string | null> {
    return await this.orderItemTax.textContent();
  }

  async getTotal(): Promise<string | null> {
    return await this.orderItemTotal.textContent();
  }

  async getPaymentInfo(): Promise<string | null> {
    return await this.orderItemPaymentInfo.textContent();
  }

  async getShippingInfo(): Promise<string | null> {
    return await this.orderItemShippingInfo.textContent();
  }
  async validateOrderDetails(itemQuantity: string, itemName: string, itemPrice: string, itemDescription: string, itemSubtotal: string, itemTax: string, itemTotal: string, itemPaymentInfo: string, itemShippingInfo: string) {
    expect(await this.getOrderItemQuantity()).toBe(itemQuantity)
    expect(await this.getOrderItemName()).toBe(itemName)
    expect(await this.getOrderItemPrice()).toBe(itemPrice)
    expect(await this.getOrderItemDescription()).toBe(itemDescription)
    expect(await this.getTax()).toBe(itemTax)
    expect(await this.getSubtotal()).toBe(itemSubtotal)
    expect(await this.getTotal()).toBe(itemTotal)
    expect(await this.getPaymentInfo()).toBe(itemPaymentInfo)
    expect(await this.getShippingInfo()).toBe(itemShippingInfo)

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



