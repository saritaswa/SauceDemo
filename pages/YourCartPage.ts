import { Page, Locator,expect } from '@playwright/test';

export class YourCartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly cartItems: Locator;
  readonly cartTitle: Locator;
  readonly inventoryItemName: Locator;
  readonly inventoryItemPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.cartItems = page.locator('.cart_item');
    this.cartTitle = page.getByText('your cart');
    this.inventoryItemName = page.locator('.inventory_item_name');
    this.inventoryItemPrice = page.locator('.inventory_item_price');
  }

  async getItemQuantity(itemName:string): Promise<string | null> {
    const cartItem = this.cartItems.filter({ hasText: itemName });
    return await cartItem.locator('.cart_quantity').textContent();
  }

  async getItemDescription(itemName: string): Promise<string | null> {
    const cartItem = this.cartItems.filter({ hasText: itemName });
    return await cartItem.locator('.inventory_item_desc').textContent();
  }

  async getItemName(): Promise<string | null> {
    return await this.inventoryItemName.first().textContent();
  }

  async getItemPrice(): Promise<string | null> {
    return await this.inventoryItemPrice.first().textContent();
  }
  async validateItemsInCart(){

    expect (await this.getItemName()).toBe('Sauce Labs Backpack')
    expect (await this.getItemPrice()).toBe('$29.99')  
   
  }

  async removeItemButton(itemName: string) {
    const cartItem = this.cartItems.filter({ hasText: itemName });
    await cartItem.locator('.btn_secondary').click();
  
  }
  async validatecartItemisRemoved():Promise<Boolean> {
    return await this.cartItems.count()===0
  }

  async clickCheckoutButton() {
    await this.checkoutButton.click();
    await this.page.waitForTimeout(2000);
  }

  async clickContinueShoppingButton() {
    await this.continueShoppingButton.click();
  }

}