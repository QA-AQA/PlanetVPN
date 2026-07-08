import { test, expect } from '../../fixtures/base';
import { CheckoutFlow } from '../../flows/checkout.flow';
import { testData } from '../../data/test-data';

test.describe('Smoke flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('purchase with 1 month plan through Credit Card', async ({ page }) => {
    const checkoutFlow = new CheckoutFlow(page);

    await checkoutFlow.startPurchase('1 month', testData.validEmail);
    await checkoutFlow.completePaymentSelection('Credit Card');

    await expect(page).toHaveURL(/payment/);
  });

  test('purchase with 1 year plan through Cryptocurrency', async ({ page }) => {
    const checkoutFlow = new CheckoutFlow(page);

    await checkoutFlow.startPurchase('1 year', testData.validEmail);
    await checkoutFlow.completePaymentSelection('Cryptocurrency');

    await expect(page).toHaveURL(/payment/);
  });
});
