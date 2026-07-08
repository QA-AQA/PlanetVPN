import { Locator, Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {
    void page;
  }

  async open(path = '/') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    await this.waitForLoad();
  }

  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle').catch(() => undefined);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async getURL(): Promise<string> {
    return this.page.url();
  }

  async waitForLocator(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
  }
}
