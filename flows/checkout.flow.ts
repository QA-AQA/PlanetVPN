import { Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage.page';
import { CheckoutPage } from '../pages/CheckoutPage.page';
import { PaymentPage } from '../pages/PaymentPage.page';

export class CheckoutFlow {
  constructor(private readonly page: Page) {}

  async startPurchase(planName: string, email: string): Promise<void> {
    const homePage = new HomePage(this.page);
    await homePage.open();
    await homePage.choosePlan(planName, email);
  }

  async completePaymentSelection(method: string): Promise<void> {
    const checkoutPage = new CheckoutPage(this.page);
    const paymentPage = new PaymentPage(this.page);

    await paymentPage.waitForPaymentPage();
    await checkoutPage.selectMethod(method);
    await checkoutPage.acceptTerms();
    await checkoutPage.proceedToPayment();
  }
}
