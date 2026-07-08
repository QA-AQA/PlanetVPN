import { test, expect } from '../../fixtures/base';
import { HomePage } from '../../pages/HomePage.page';
import { annotateTest } from '../../utils/allure';

test.describe('Mobile layout', () => {
  test('renders the pricing form correctly on mobile view', async ({ page }) => {
    test.slow();
    await annotateTest({
      id: 'TC-MOBILE-001',
      feature: 'Mobile experience',
      story: 'Responsive checkout layout',
      severity: 'normal',
      tags: ['mobile', 'layout'],
      description: 'Verifies the purchase form remains usable and visible on a mobile viewport.',
    });

    const homePage = new HomePage(page);
    await homePage.openAndVerifyForm();

    await page.locator('form#PPG').waitFor({ state: 'visible', timeout: 15000 });
    await expect(page.locator('form#PPG')).toBeVisible();
    await expect(page.locator('form#PPG input[name="email"]')).toBeVisible();
    await expect(page.locator('form#PPG button[type="submit"]')).toBeVisible();
  });
});
