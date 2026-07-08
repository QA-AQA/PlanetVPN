import { expect, Page } from '@playwright/test';

export abstract class BaseComponent {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Shared helper for asserting that a selector becomes visible without manual waits.
  protected async waitForVisible(selector: string, timeout = 15000): Promise<void> {
    await expect(this.page.locator(selector).first()).toBeVisible({ timeout });
  }
}
