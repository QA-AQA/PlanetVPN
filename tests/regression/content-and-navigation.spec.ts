import { test, expect } from '../../fixtures/base';
import { HomePage } from '../../pages/HomePage.page';
import { annotateTest } from '../../utils/allure';

test.describe('Content and navigation', () => {
  test('renders the pricing form and FAQ section on the landing page', async ({ page }) => {
    await annotateTest({
      id: 'TC-CONTENT-001',
      feature: 'Landing page',
      story: 'Key content visibility',
      severity: 'normal',
      tags: ['regression', 'content', 'landing-page'],
      description: 'Verifies the purchase form and FAQ content are visible on the landing page.',
    });

    const homePage = new HomePage(page);
    await homePage.verifyLandingPageContent();

    await expect(page.locator('form#PPG')).toBeVisible();
    await expect(page.locator('text=Frequently Asked Questions (FAQs)')).toBeVisible();
    await expect(page.locator('text=How to connect Planet VPN configuration after a purchase?')).toBeVisible();
  });

  test('allows switching the visible currency options from the pricing form', async ({ page }) => {
    await annotateTest({
      id: 'TC-CURRENCY-001',
      feature: 'Pricing controls',
      story: 'Currency selector interaction',
      severity: 'minor',
      tags: ['regression', 'currency', 'pricing'],
      description: 'Verifies the currency selector exposes alternate options from the pricing form.',
    });

    const homePage = new HomePage(page);
    await homePage.openCurrencySelector();

    await expect(page.locator('form#PPG li[data-id]').first()).toHaveCount(1);
  });
});
