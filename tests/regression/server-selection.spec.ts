import { test } from '../../fixtures/base';
import { HomePage } from '../../pages/HomePage.page';
import { annotateTest } from '../../utils/allure';
import { testData } from '../../data/test-data';

test.describe('Server selection', () => {
  test('allows selecting a different server location before checkout', async ({ page }) => {
    await annotateTest({
      id: 'TC-SERVER-001',
      feature: 'Location selection',
      story: 'Server location changes',
      severity: 'minor',
      tags: ['server', 'regression'],
      description: 'Verifies the user can switch to a different server location before purchase.',
    });

    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.server.selectLocation('Germany');
    await homePage.pricing.selectPlan('1 month');
    await homePage.pricing.fillEmail(testData.validEmail);

    await homePage.expectPurchaseFormVisible();
  });
});
