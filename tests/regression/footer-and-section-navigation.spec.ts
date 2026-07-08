import { test, expect } from '../../fixtures/base';
import { HomePage } from '../../pages/HomePage.page';
import { annotateTest } from '../../utils/allure';

test.describe('Footer and section navigation', () => {
  test('exposes footer navigation links and supports section scrolling', async ({ page }) => {
    await annotateTest({
      id: 'TC-NAV-002',
      feature: 'Landing page',
      story: 'Footer and section navigation',
      severity: 'minor',
      tags: ['regression', 'navigation', 'footer'],
      description: 'Verifies footer links and the landing page sections are reachable and visible.',
    });

    const homePage = new HomePage(page);
    await homePage.openFooterSection();

    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('text=Support 24/7').first()).toBeVisible();
    await expect(page.locator('h2').filter({ hasText: 'Choose your plan' }).first()).toBeVisible();
  });
});
