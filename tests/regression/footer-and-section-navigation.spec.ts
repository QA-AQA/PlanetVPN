import { test, expect } from '../../fixtures/base';
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

    await page.goto('/', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('text=Support 24/7').first()).toBeVisible();
    await page.locator('a[href="#content"]').first().click();
    await expect(page.locator('h2').filter({ hasText: 'Choose your plan' }).first()).toBeVisible();
  });
});
