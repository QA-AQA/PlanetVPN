import { test, expect } from '../../fixtures/base';
import { HomePage } from '../../pages/HomePage.page';
import { annotateTest } from '../../utils/allure';
import { testData } from '../../data/test-data';

test.describe('Navigation and validation', () => {
  test('supports back/forward navigation without losing the form state', async ({ page }) => {
    await annotateTest({
      id: 'TC-NAV-001',
      feature: 'Navigation',
      story: 'Browser history resilience',
      severity: 'normal',
      tags: ['regression', 'navigation'],
      description: 'Verifies the purchase form remains usable after browser back and forward navigation.',
    });

    const homePage = new HomePage(page);
    await homePage.openAndVerifyForm();
    await homePage.fillEmailAndSubmit(testData.validEmail);

    await page.goBack();
    await page.goForward();

    await expect(page.locator('form#PPG input[name="email"]')).toHaveValue(testData.validEmail);
  });

  test('preserves invalid email input after a failed submission attempt', async ({ page }) => {
    await annotateTest({
      id: 'TC-VALID-002',
      feature: 'Validation',
      story: 'Input stability after validation',
      severity: 'normal',
      tags: ['regression', 'validation'],
      description: 'Verifies invalid email input remains visible after a failed validation attempt.',
    });

    const homePage = new HomePage(page);
    await homePage.openAndVerifyForm();
    await homePage.fillEmailAndSubmit(testData.invalidEmail);

    await expect(page.locator('form#PPG input[name="email"]')).toHaveValue(testData.invalidEmail);
  });
});
