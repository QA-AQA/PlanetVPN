import { test, expect } from '../../fixtures/base';
import { HomePage } from '../../pages/HomePage.page';
import { annotateTest } from '../../utils/allure';

test('shows validation for invalid email format', async ({ page }) => {
  await annotateTest({
    id: 'TC-VALID-001',
    feature: 'Validation',
    story: 'Email input validation',
    severity: 'normal',
    tags: ['validation', 'regression'],
    description: 'Validates the behaviour when an invalid email format is entered into the purchase form.',
  });

  const homePage = new HomePage(page);

  await homePage.open();
  await homePage.pricing.fillEmail('not-an-email');
  await homePage.pricing.submit();

  await expect(page.locator('form#PPG input[name="email"]')).toHaveValue('not-an-email');
});
