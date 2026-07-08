import { test, expect } from '../../fixtures/base';
import { HomePage } from '../../pages/HomePage.page';
import { annotateTest } from '../../utils/allure';

test('home page loads within a reasonable time', async ({ page }) => {
  await annotateTest({
    id: 'TC-PERF-001',
    feature: 'Performance',
    story: 'Initial page load',
    severity: 'normal',
    tags: ['performance', 'load'],
    description: 'Checks that the home page loads within a reasonable threshold.',
  });

  const homePage = new HomePage(page);
  const start = Date.now();

  await homePage.open();
  const elapsed = Date.now() - start;

  expect(elapsed).toBeLessThan(15000);
});
