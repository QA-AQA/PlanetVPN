import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage.page';

export class PaymentPage extends BasePage {
  readonly paymentHeading: Locator;
  readonly termsLink: Locator;
  readonly refundLink: Locator;

  constructor(page: Page) {
    super(page);
    this.paymentHeading = page.locator('form#PPG h2').filter({ hasText: 'Choose payment method' });
    this.termsLink = page.locator('#qa-link-terms');
    this.refundLink = page.locator('#qa-link-refund');
  }

  async waitForPaymentPage(): Promise<void> {
    await this.paymentHeading.waitFor({ state: 'visible' });
  }
}
