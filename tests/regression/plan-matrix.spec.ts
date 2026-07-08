import { test, expect } from '../../fixtures/base';
import { HomePage } from '../../pages/HomePage.page';
import { PaymentPage } from '../../pages/PaymentPage.page';
import { testData } from '../../data/test-data';
import { annotateTest } from '../../utils/allure';

test.describe('Plan matrix', () => {
  for (const plan of testData.plans) {
    test(`reaches payment page for ${plan} plan`, async ({ page }) => {
      await annotateTest({
        id: `TC-MATRIX-${plan.toUpperCase().replace(/\s+/g, '-')}`,
        feature: 'Plan selection',
        story: 'Data-driven checkout matrix',
        severity: 'normal',
        tags: ['regression', 'matrix', 'data-driven'],
        description: `Verifies the ${plan} plan reaches the payment step through the shared data-driven matrix.`,
      });

      const homePage = new HomePage(page);
      const paymentPage = new PaymentPage(page);

      await homePage.open();
      await homePage.choosePlan(plan, testData.validEmail);
      await paymentPage.waitForPaymentPage();

      await expect(page).toHaveURL(/payment/);
    });
  }
});
