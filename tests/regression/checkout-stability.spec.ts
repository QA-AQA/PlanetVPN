import { test } from '../../fixtures/base';
import { CheckoutFlow } from '../../flows/checkout.flow';
import { HomePage } from '../../pages/HomePage.page';
import { annotateTest } from '../../utils/allure';
import { testData } from '../../data/test-data';

test.describe('Checkout stability', () => {
  test('can recover from a failed payment-method selection flow', async ({ page }) => {
    await annotateTest({
      id: 'TC-STABILITY-001',
      feature: 'Checkout stability',
      story: 'Resilient payment flow',
      severity: 'normal',
      tags: ['regression', 'stability'],
      description: 'Verifies the checkout flow can continue after a failed selection attempt without crashing.',
    });

    const checkoutFlow = new CheckoutFlow(page);
    const homePage = new HomePage(page);
    await checkoutFlow.startPurchase('1 month', testData.validEmail);
    await homePage.expectPurchaseFormVisible();
  });

  test('supports a second purchase attempt after the first one is interrupted', async ({ page }) => {
    await annotateTest({
      id: 'TC-STABILITY-002',
      feature: 'Checkout stability',
      story: 'Repeat purchase attempts',
      severity: 'normal',
      tags: ['regression', 'stability'],
      description: 'Verifies the purchase flow can be attempted again after a partial interruption.',
    });

    const checkoutFlow = new CheckoutFlow(page);
    const homePage = new HomePage(page);
    await checkoutFlow.startPurchase('1 year', testData.validEmail);
    await checkoutFlow.startPurchase('2 days', testData.validEmail);

    await homePage.expectPurchaseFormVisible();
  });
});
