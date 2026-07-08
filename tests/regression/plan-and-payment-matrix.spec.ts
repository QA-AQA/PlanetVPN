import { test, expect } from '../../fixtures/base';
import { HomePage } from '../../pages/HomePage.page';
import { PaymentPage } from '../../pages/PaymentPage.page';
import { testData } from '../../data/test-data';
import { annotateTest } from '../../utils/allure';

for (const plan of testData.plans) {
  test(`selects plan ${plan} and reaches payment page`, async ({ page }) => {
    await annotateTest({
      id: `TC-PLAN-${plan.toUpperCase().replace(/\s+/g, '-')}`,
      feature: 'Plan selection',
      story: 'Plan matrix coverage',
      severity: 'normal',
      tags: ['regression', 'plan', 'matrix'],
      description: `Verifies the ${plan} plan transitions to the payment page successfully.`,
    });

    const homePage = new HomePage(page);
    const paymentPage = new PaymentPage(page);

    await homePage.open();
    await homePage.choosePlan(plan, testData.validEmail);
    await paymentPage.waitForPaymentPage();

    await expect(page).toHaveURL(/payment/);
  });
}

for (const method of testData.paymentMethods) {
  test(`shows payment method ${method}`, async ({ page }) => {
    await annotateTest({
      id: `TC-PAYMENT-${method.toUpperCase().replace(/\s+/g, '-')}`,
      feature: 'Payment methods',
      story: 'Payment method visibility',
      severity: 'critical',
      tags: ['regression', 'payment', 'matrix'],
      description: `Verifies the ${method} option is visible and available on the payment page.`,
    });

    const homePage = new HomePage(page);
    const paymentPage = new PaymentPage(page);

    await homePage.open();
    await homePage.choosePlan('1 month', testData.validEmail);
    await paymentPage.waitForPaymentPage();

    await expect(page.getByText(method, { exact: false })).toBeVisible();
  });
}
