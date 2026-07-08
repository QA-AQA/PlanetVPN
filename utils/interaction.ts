import { Locator, Page } from '@playwright/test';

export async function safeClick(locator: Locator, page: Page): Promise<void> {
  await locator.waitFor({ state: 'visible', timeout: 15000 });
  await locator.scrollIntoViewIfNeeded();
  await locator.click({ timeout: 15000 });
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => undefined);
}

export async function fillAndBlur(locator: Locator, value: string): Promise<void> {
  await locator.waitFor({ state: 'visible', timeout: 15000 });
  await locator.fill(value);
  await locator.press('Tab');
}
