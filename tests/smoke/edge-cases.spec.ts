import { test, expect } from '../../fixtures/base';
import { HomePage } from '../../pages/HomePage.page';
import { PaymentPage } from '../../pages/PaymentPage.page';
import { annotateTest } from '../../utils/allure';
import { testData } from '../../data/test-data';

test.describe('Edge cases', () => {
  test('keeps users on the home page when the email is invalid', async ({ page }) => {
    await annotateTest({
      id: 'TC-EDGE-001',
      feature: 'Purchase flow',
      story: 'Invalid email handling',
      severity: 'normal',
      tags: ['edge', 'validation'],
      description: 'Verifies the flow stays on the initial form for invalid email values.',
    });

    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.pricing.selectPlan('1 month');
    await homePage.pricing.fillEmail(testData.invalidEmail);
    await homePage.pricing.submit();

    await expect(page).toHaveURL(/personal\.freevpnplanet\.com\/$/);
  });

  test('supports navigation back and forth after plan selection', async ({ page }) => {
    await annotateTest({
      id: 'TC-EDGE-002',
      feature: 'Purchase flow',
      story: 'Browser navigation',
      severity: 'minor',
      tags: ['edge', 'navigation'],
      description: 'Verifies the checkout flow supports browser back/forward navigation.',
    });

    const homePage = new HomePage(page);
    const paymentPage = new PaymentPage(page);

    await homePage.open();
    await homePage.choosePlan('1 month', testData.validEmail);
    await paymentPage.waitForPaymentPage();
    await page.goBack();
    await expect(page).toHaveURL(/personal\.freevpnplanet\.com\/\?*/);
    await page.goForward();
    await expect(page).toHaveURL(/payment/);
  });
});
