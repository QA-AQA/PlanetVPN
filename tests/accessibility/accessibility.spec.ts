import { test, expect } from '../../fixtures/base';
import AxeBuilder from '@axe-core/playwright';
import { HomePage } from '../../pages/HomePage.page';
import { annotateTest } from '../../utils/allure';

test('home page meets basic accessibility rules', async ({ page }) => {
  await annotateTest({
    id: 'TC-A11Y-001',
    feature: 'Accessibility',
    story: 'Accessibility smoke checks',
    severity: 'normal',
    tags: ['a11y', 'accessibility'],
    description: 'Verifies the home page satisfies a basic accessibility smoke scan.',
  });

  const homePage = new HomePage(page);
  await homePage.open();

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  const criticalViolations = accessibilityScanResults.violations.filter(
    (violation) => violation.impact === 'critical' || violation.impact === 'serious',
  );

  expect(criticalViolations).toEqual([]);
});
