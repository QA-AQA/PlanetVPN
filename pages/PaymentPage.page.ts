import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage.page';
import { locators } from '../utils/locators';

export class PaymentPage extends BasePage {
  readonly paymentHeading: Locator;
  readonly termsLink: Locator;
  readonly refundLink: Locator;

  constructor(page: Page) {
    super(page);
    this.paymentHeading = page.locator(locators.payment.heading);
    this.termsLink = page.locator(locators.payment.termsLink);
    this.refundLink = page.locator(locators.payment.refundLink);
  }

  async waitForPaymentPage(): Promise<void> {
    await this.paymentHeading.waitFor({ state: 'visible' });
  }
}
