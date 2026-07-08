import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent.component';

export class ServerSelector extends BaseComponent {
  readonly selector: Locator;
  readonly option: (name: string) => Locator;

  constructor(page: Page) {
    super(page);
    this.selector = page.locator('form#PPG label.ppg__label.select').first();
    this.option = (name: string) => page.locator('form#PPG li[data-id]').filter({ hasText: name });
  }

  async selectLocation(locationName: string): Promise<void> {
    await this.selector.waitFor({ state: 'visible' });
    await this.selector.click();
    const option = this.option(locationName);
    await option.first().waitFor({ state: 'visible' });
    await option.first().click();
  }
}
