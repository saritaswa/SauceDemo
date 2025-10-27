import { test, expect } from '../base/Fixture';
import {  TEST_USERS } from '../testData/Login.data';
import { TEST_INFO } from '../testData/Info.data';
import { ITEM } from '../testData/CartItem.data';


test.describe.serial('SauceDemo E2E Test Suite', () => {
test('1. Successfull purchase of one item', async ({ page, loginPage, productPage,yourCartPage,yourInfoPage,finishCheckoutPage,orderCompletePage }) => {
    //login page actions 
    await loginPage.gotoLoginPage()
    await loginPage.validateLoginPage()
    await loginPage.verifysuccessfulLogin(TEST_USERS.STANDARD.username,TEST_USERS.STANDARD.password)
    await loginPage.validateHomePageAfterLogin() 
    //product page actions 
    await productPage.addToCartButton(0)
    await productPage.checkifItemAddedToCart()
    await productPage.clickProceedToCheckout()
    //your cart page actions
    await yourCartPage.validateItemsInCart()
    await yourCartPage.clickCheckoutButton() 
    await yourInfoPage.addCustomerInfo(TEST_INFO.INFO.firstName,TEST_INFO.INFO.lastName,TEST_INFO.INFO.zipCode)
    await yourInfoPage.clickcontinueButton()
    //finish checkout page actions
    await finishCheckoutPage.validateOrderDetails(ITEM.INFO.quantity,ITEM.INFO.name,ITEM.INFO.price,ITEM.INFO.description, ITEM.INFO.subtotal, ITEM.INFO.tax, ITEM.INFO.total, ITEM.INFO.paymentInfo, ITEM.INFO.shippingInfo)
    await finishCheckoutPage.clickFinishButton()
    //order complete page actions
    await orderCompletePage.validateOrderComplete()
    await orderCompletePage.clickBackHome()
    await orderCompletePage.validateHomePageAfterBackHomeButton();

});

 test('2.Unsuccessful login with locked user', async ({ page, loginPage }) => {
    //login page actions
     await loginPage.gotoLoginPage()
     await loginPage.verifyUnsuccessfulLogin(TEST_USERS.LOCKED.username,TEST_USERS.LOCKED.password)
     await loginPage.verifyErrorMessageforUnsuccessfulLogin()
 });

test('3. Check removal of Items on product page', async ({ page, loginPage, productPage }) => {
    //login page actions
    await loginPage.gotoLoginPage()
    await loginPage.verifysuccessfulLogin(TEST_USERS.STANDARD.username, TEST_USERS.STANDARD.password)
    //product page actions
    await productPage.addToCartButton(0)
    await productPage.checkifItemAddedToCart()
    await productPage.clickRemoveButton(0)
    await productPage.checkIfItemRemovedfromCart()
});

test('4. Check removal of Items on your cart page', async ({ page, loginPage,productPage,yourCartPage }) => {
    //login page actions
    await loginPage.gotoLoginPage()
    await loginPage.verifysuccessfulLogin(TEST_USERS.STANDARD.username, TEST_USERS.STANDARD.password)
    //product page actions
    await productPage.addToCartButton(0)
    await productPage.clickProceedToCheckout()
    //your cart page actions
    await yourCartPage.validateItemsInCart()
    await yourCartPage.removeItemButton(ITEM.INFO.name)
    await yourCartPage.validatecartItemisRemoved()
});
test('5. Check pressing cancel Button on finish Checkout page and going back to home ', async ({ page, loginPage,productPage,yourCartPage,yourInfoPage,finishCheckoutPage }) => {
    //login page actions
    await loginPage.gotoLoginPage()
    await loginPage.verifysuccessfulLogin(TEST_USERS.STANDARD.username, TEST_USERS.STANDARD.password    )
    //product page actions
    await productPage.addToCartButton(0)
    await productPage.clickProceedToCheckout()
    //your cart page actions
    await yourCartPage.clickCheckoutButton() 
    //your info page actions
    await yourInfoPage.addCustomerInfo(TEST_INFO.INFO.firstName,TEST_INFO.INFO.lastName,TEST_INFO.INFO.zipCode)
    //finish checkout page actions
    await finishCheckoutPage.clickCancelButton()
    await finishCheckoutPage.validateHomePageAfterBackHomeButton();


});

});
