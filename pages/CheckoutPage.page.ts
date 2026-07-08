import { Page } from '@playwright/test';
import { BasePage } from './BasePage.page';
import { PaymentMethodSelector } from './components/PaymentMethodSelector.component';

export class CheckoutPage extends BasePage {
  // Payment selector component used for checkout actions.
  readonly payment: PaymentMethodSelector;

  constructor(page: Page) {
    super(page);
    this.payment = new PaymentMethodSelector(page);
  }

  // Selects the requested payment method for the visitor.
  async selectMethod(method: string): Promise<void> {
    await this.payment.selectMethod(method);
  }

  // Accepts the checkout terms before submission.
  async acceptTerms(): Promise<void> {
    await this.payment.acceptTerms();
  }

  // Continues the checkout by submitting the payment step.
  async proceedToPayment(): Promise<void> {
    await this.payment.submit();
  }
}
