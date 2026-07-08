import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent.component';

export class PricingSection extends BaseComponent {
  readonly planOption: (name: string) => Locator;
  readonly planLabel: Locator;
  readonly emailInput: Locator;
  readonly payButton: Locator;

  constructor(page: Page) {
    super(page);
    this.planOption = (selectorName: string) =>
      page
        .locator('form#PPG')
        .locator('label.ppg__label.radio')
        .filter({ hasText: selectorName });
    this.planLabel = page.locator('form#PPG').locator('p').filter({ hasText: 'Choose the plan' }).first();
    this.emailInput = page.locator('form#PPG input[name="email"]');
    this.payButton = page.locator('form#PPG button[type="submit"]');
  }

  async selectPlan(planName: string): Promise<void> {
    const option = this.planOption(planName);
    await option.first().waitFor({ state: 'visible' });
    await option.first().click();
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.waitFor({ state: 'visible' });
    await this.emailInput.fill(email);
  }

  async submit(): Promise<void> {
    await this.payButton.waitFor({ state: 'visible' });
    await this.payButton.click();
  }
}
