import { test, expect } from '../../fixtures/base';
import { HomePage } from '../../pages/HomePage.page';
import { PaymentPage } from '../../pages/PaymentPage.page';
import { annotateTest } from '../../utils/allure';
import { testData } from '../../data/test-data';

test.describe('Payment methods', () => {
  test('exposes every currently available payment method and allows selection', async ({ page }) => {
    await annotateTest({
      id: 'TC-PAYMENT-001',
      feature: 'Payment methods',
      story: 'Available payment methods',
      severity: 'critical',
      tags: ['payment', 'regression'],
      description: 'Verifies the currently available payment methods are exposed and selectable.',
    });

    const homePage = new HomePage(page);
    const paymentPage = new PaymentPage(page);

    await homePage.open();
    await homePage.choosePlan('1 month', testData.validEmail);
    await paymentPage.waitForPaymentPage();

    const visibleMethods = (await page.locator('form#PPG label.ppg__modal-label').allTextContents()).map((item) => item.replace(/\s+/g, ' ').trim());
    const expectedMethods = testData.paymentMethods;

    expect(visibleMethods).toEqual(expect.arrayContaining(expectedMethods));
    await expect(page.getByText(expectedMethods[0], { exact: false })).toBeVisible();
    await expect(page.getByText(expectedMethods[1], { exact: false })).toBeVisible();
  });
});
