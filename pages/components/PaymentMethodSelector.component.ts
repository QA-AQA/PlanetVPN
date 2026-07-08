import { expect, Locator, Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent.component';

export class PaymentMethodSelector extends BaseComponent {
  // Returns the payment option matching the requested method name.
  readonly paymentOption: (name: string) => Locator;
  // Hidden checkbox that stores the terms-acceptance state.
  readonly termsCheckbox: Locator;
  // Visible label shown to the visitor for the terms checkbox.
  readonly termsLabel: Locator;
  // Primary submit button on the payment step.
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

  // Selects the requested payment method for the visitor.
  async selectMethod(method: string): Promise<void> {
    const option = this.paymentOption(method);
    await option.first().click();
  }

  // Accepts the checkout terms when they are not already accepted.
  async acceptTerms(): Promise<void> {
    await expect(this.termsLabel).toBeVisible();
    if (!(await this.termsCheckbox.isChecked())) {
      await this.termsLabel.click();
    }
  }

  // Submits the payment step to continue the checkout.
  async submit(): Promise<void> {
    await expect(this.payButton).toBeVisible();
    await this.payButton.click();
  }
}
