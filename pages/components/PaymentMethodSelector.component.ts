import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent.component';

export class PaymentMethodSelector extends BaseComponent {
  readonly paymentOption: (name: string) => Locator;
  readonly termsCheckbox: Locator;
  readonly termsLabel: Locator;
  readonly payButton: Locator;

  constructor(page: Page) {
    super(page);
    this.paymentOption = (selectorName: string) =>
      page
        .locator('form#PPG')
        .locator('label.ppg__modal-label')
        .filter({ hasText: selectorName });
    this.termsCheckbox = page.locator('form#PPG input[name="terms"]');
    this.termsLabel = page.locator('form#PPG label.ppg__label.checkbox span').first();
    this.payButton = page.locator('form#PPG button[type="submit"]');
  }

  async selectMethod(method: string): Promise<void> {
    const option = this.paymentOption(method);
    await option.first().waitFor({ state: 'visible' });
    await option.first().click();
  }

  async acceptTerms(): Promise<void> {
    await this.termsLabel.waitFor({ state: 'visible' });
    if (!(await this.termsCheckbox.isChecked())) {
      await this.termsLabel.click();
    }
  }

  async submit(): Promise<void> {
    await this.payButton.waitFor({ state: 'visible' });
    await this.payButton.click();
  }
}
