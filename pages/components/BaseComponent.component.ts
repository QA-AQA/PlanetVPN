import { Page } from '@playwright/test';

export abstract class BaseComponent {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected async waitForVisible(selector: string, timeout = 15000): Promise<void> {
    await this.page.locator(selector).first().waitFor({ state: 'visible', timeout });
  }
}
