import { test, expect } from '../base/Fixture';
import {  TEST_USERS } from '../testData/Login.data';
import { TEST_INFO } from '../testData/Info.data';
import { ITEM } from '../testData/CartItem.data';

test('Successfull purchase of one item', async ({ page, loginPage, productPage,yourCartPage,yourInfoPage,finishCheckoutPage,orderCompletePage }) => {
    await loginPage.gotoLoginPage()
    await loginPage.validateLoginPage()
    await loginPage.verifysuccessfulLogin(TEST_USERS.STANDARD.username,TEST_USERS.STANDARD.password)
    await loginPage.validateHomePageAfterLogin()  
    await productPage.addToCartButton(0)
    await productPage.checkifItemAddedToCart()
    await productPage.clickProceedToCheckout()
    await yourCartPage.validateItemsInCart()
    await yourCartPage.clickCheckoutButton() 
    await yourInfoPage.addCustomerInfo(TEST_INFO.INFO.firstName,TEST_INFO.INFO.lastName,TEST_INFO.INFO.zipCode)
    await yourInfoPage.clickcontinueButton()
    await finishCheckoutPage.validateOrderDetails(ITEM.INFO.quantity,ITEM.INFO.name,ITEM.INFO.price,ITEM.INFO.description, ITEM.INFO.subtotal, ITEM.INFO.tax, ITEM.INFO.total, ITEM.INFO.paymentInfo, ITEM.INFO.shippingInfo)
    await finishCheckoutPage.clickFinishButton()
    await orderCompletePage.validateOrderComplete()
    await orderCompletePage.clickBackHome()
    await orderCompletePage.validateHomePageAfterBackHomeButton();

});
// test('unsuccessful login with locked user', async ({ page, loginPage }) => {
//     await loginPage.gotoLoginPage()
//     await loginPage.validateLoginPage()
//     await loginPage.verifysuccessfulLogin()
//     await loginPage.validateHomePageAfterLogin()
//     await loginPage.verifyUnsuccessfulLogin()
//     await loginPage.verifyErrorMessageforUnsuccessfulLogin()
// });

// test('Check removal of Items on product page', async ({ page, loginPage }) => {
//     await loginPage.gotoLoginPage()
//     await loginPage.validateLoginPage()
    //     await loginPage.verifysuccessfulLogin()
//     await loginPage.validateHomePageAfterLogin()
//     await loginPage.verifyUnsuccessfulLogin()
//     await loginPage.verifyErrorMessageforUnsuccessfulLogin()
// });

// test('Check removal of Items on product page', async ({ page, loginPage }) => {
//     await loginPage.gotoLoginPage()
//     await loginPage.validateLoginPage()
//     await loginPage.verifysuccessfulLogin()
//     await loginPage.validateHomePageAfterLogin()
//     await loginPage.verifyUnsuccessfulLogin()
//     await loginPage.verifyErrorMessageforUnsuccessfulLogin()
// });
// test('Check removal of Items on your cart page', async ({ page, loginPage }) => {
//     await loginPage.gotoLoginPage()
//     await loginPage.validateLoginPage()
//     await loginPage.verifysuccessfulLogin()
//     await loginPage.validateHomePageAfterLogin()
//     await loginPage.verifyUnsuccessfulLogin()
//     await loginPage.verifyErrorMessageforUnsuccessfulLogin()
// });
// test('Check pressing cancel Button and going back to home on Your info page', async ({ page, loginPage }) => {
//     await loginPage.gotoLoginPage()
//     await loginPage.validateLoginPage()
//     await loginPage.verifysuccessfulLogin()
//     await loginPage.validateHomePageAfterLogin()
//     await loginPage.verifyUnsuccessfulLogin()
//     await loginPage.verifyErrorMessageforUnsuccessfulLogin()
// });
// test('Check pressing cancel Button and going back to home on finish Checkout page', async ({ page, loginPage }) => {
//     await loginPage.gotoLoginPage()
//     await loginPage.validateLoginPage()
//     await loginPage.verifysuccessfulLogin()
//     await loginPage.validateHomePageAfterLogin()
//     await loginPage.verifyUnsuccessfulLogin()
//     await loginPage.verifyErrorMessageforUnsuccessfulLogin()
// });
// test('Check pressing cancel Button and going back to home on finish Checkout page', async ({ page, loginPage }) => {
//     await loginPage.gotoLoginPage()
//     await loginPage.validateLoginPage()
//     await loginPage.verifysuccessfulLogin()
//     await loginPage.validateHomePageAfterLogin()
//     await loginPage.verifyUnsuccessfulLogin()
//     await loginPage.verifyErrorMessageforUnsuccessfulLogin()
// });
