import { Page } from '@playwright/test';
import { BasePage } from './BasePage.page';
import { PaymentMethodSelector } from './components/PaymentMethodSelector.component';

export class CheckoutPage extends BasePage {
  readonly payment: PaymentMethodSelector;

  constructor(page: Page) {
    super(page);
    this.payment = new PaymentMethodSelector(page);
  }

  async selectMethod(method: string): Promise<void> {
    await this.payment.selectMethod(method);
  }

  async acceptTerms(): Promise<void> {
    await this.payment.acceptTerms();
  }

  async proceedToPayment(): Promise<void> {
    await this.payment.submit();
  }
}
