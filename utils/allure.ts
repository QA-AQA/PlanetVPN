import * as allure from 'allure-js-commons';

export async function annotateTest(options: {
  id: string;
  feature: string;
  story: string;
  severity?: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial';
  tags?: string[];
  description?: string;
}): Promise<void> {
  await allure.epic('Personal VPN purchase');
  await allure.feature(options.feature);
  await allure.story(options.story);
  await allure.severity(options.severity ?? 'normal');
  await allure.testCaseId(options.id);
  await allure.tags(...(options.tags ?? []));

  if (options.description) {
    await allure.description(options.description);
  }
}
