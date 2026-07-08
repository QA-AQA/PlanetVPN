import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage.page';
import { locators } from '../utils/locators';

export class PaymentPage extends BasePage {
  // Main heading shown once the payment step loads.
  readonly paymentHeading: Locator;
  // Terms link displayed on the payment page.
  readonly termsLink: Locator;
  // Refund link displayed on the payment page.
  readonly refundLink: Locator;

  constructor(page: Page) {
    super(page);
    this.paymentHeading = page.locator(locators.payment.heading);
    this.termsLink = page.locator(locators.payment.termsLink);
    this.refundLink = page.locator(locators.payment.refundLink);
  }

  // Confirms the payment step is visible before continuing.
  async waitForPaymentPage(): Promise<void> {
    await expect(this.paymentHeading).toBeVisible();
  }
}
