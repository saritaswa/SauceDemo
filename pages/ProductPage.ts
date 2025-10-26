import { Page, Locator,expect} from "@playwright/test"

export class ProductPage {
 readonly page: Page;
  readonly addtoCartButton: Locator;
 readonly removefromCartButton: Locator;
  readonly productsContainer: Locator;
  readonly productTitle: Locator;
  readonly cartShoppingButton: Locator;

  constructor(page: Page, ) {
    this.page = page
    this.productTitle=page.getByTitle('Swag Labs')
    this.addtoCartButton=page.getByText('Add to cart')
    this.removefromCartButton=page.getByText('Remove')
    this.productsContainer = this.page.locator(`#inventory_container`).nth(0);
    this.cartShoppingButton=page.locator('.shopping_cart_link')
  }
async addToCartButton(productNumber:number)
{
    await this.addtoCartButton.nth(productNumber).click();
}
async removeButton()
{
 await this.removefromCartButton.click();
}
async getCartItemsCount(): Promise<number> {

    return await this.productsContainer.locator('.cart_item').count();
 }
async checkifItemAddedToCart(): Promise<Boolean> {
    return await (this.getCartItemsCount())>0
}
async checkIfItemRemovedfromCart(): Promise<Boolean> {
    this.removeButton()
    return await (this.getCartItemsCount())==0           
}
async clickProceedToCheckout()
{
  await this.cartShoppingButton.click();
 // await this.page.waitForTimeout(5000)
}
}
