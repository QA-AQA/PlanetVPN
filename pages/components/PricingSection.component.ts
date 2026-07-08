import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent.component';
import { locators } from '../../utils/locators';
import { safeClick, fillAndBlur } from '../../utils/interaction';

export class PricingSection extends BaseComponent {
  readonly planOption: (name: string) => Locator;
  readonly planLabel: Locator;
  readonly emailInput: Locator;
  readonly payButton: Locator;

  constructor(page: Page) {
    super(page);
    this.planOption = (selectorName: string) =>
      page.locator(locators.pricing.planOption).filter({ hasText: selectorName });
    this.planLabel = page.locator(locators.pricing.planLabel).first();
    this.emailInput = page.locator(locators.pricing.emailInput);
    this.payButton = page.locator(locators.pricing.submitButton);
  }

  async selectPlan(planName: string): Promise<void> {
    const option = this.planOption(planName);
    await safeClick(option.first(), this.page);
  }

  async fillEmail(email: string): Promise<void> {
    await fillAndBlur(this.emailInput, email);
  }

  async submit(): Promise<void> {
    await safeClick(this.payButton, this.page);
  }
}
