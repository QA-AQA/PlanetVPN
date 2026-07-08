import { test } from '../../fixtures/base';
import { HomePage } from '../../pages/HomePage.page';
import { annotateTest } from '../../utils/allure';

test.describe('Footer and section navigation', () => {
  test('keeps footer navigation and section scrolling working for users', async ({ page }) => {
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

    await homePage.expectFooterVisible();
    await homePage.expectSupportLinkVisible();
    await homePage.expectPurchaseSectionVisible();
  });
});
