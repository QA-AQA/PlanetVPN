import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent.component';
import { locators } from '../../utils/locators';
import { safeClick } from '../../utils/interaction';

export class ServerSelector extends BaseComponent {
  // Main selector control used to open the server-location list.
  readonly selector: Locator;
  // Returns the server option matching the requested location name.
  readonly option: (name: string) => Locator;

  constructor(page: Page) {
    super(page);
    this.selector = page.locator(locators.server.selector).first();
    this.option = (name: string) => page.locator(locators.server.option).filter({ hasText: name });
  }

  // Selects the requested server location before the purchase is continued.
  async selectLocation(locationName: string): Promise<void> {
    await safeClick(this.selector, this.page);
    const option = this.option(locationName);
    await safeClick(option.first(), this.page);
  }
}
