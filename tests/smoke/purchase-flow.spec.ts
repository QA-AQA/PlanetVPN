import { test, expect } from '../../fixtures/base';
import { HomePage } from '../../pages/HomePage.page';
import { CheckoutPage } from '../../pages/CheckoutPage.page';
import { PaymentPage } from '../../pages/PaymentPage.page';
import { testData } from '../../data/test-data';

test.describe('Smoke flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('purchase with 1 month plan through Credit Card', async ({ page }) => {
    const homePage = new HomePage(page);
    const checkoutPage = new CheckoutPage(page);
    const paymentPage = new PaymentPage(page);

    await homePage.open();
    await homePage.choosePlan('1 month', testData.validEmail);

    await paymentPage.waitForPaymentPage();
    await checkoutPage.selectMethod('Credit Card');
    await checkoutPage.acceptTerms();
    await checkoutPage.proceedToPayment();

    await expect(page).toHaveURL(/payment/);
  });

  test('purchase with 1 year plan through Cryptocurrency', async ({ page }) => {
    const homePage = new HomePage(page);
    const checkoutPage = new CheckoutPage(page);
    const paymentPage = new PaymentPage(page);

    await homePage.open();
    await homePage.choosePlan('1 year', testData.validEmail);

    await paymentPage.waitForPaymentPage();
    await checkoutPage.selectMethod('Cryptocurrency');
    await checkoutPage.acceptTerms();
    await checkoutPage.proceedToPayment();

    await expect(page).toHaveURL(/payment/);
  });
});
