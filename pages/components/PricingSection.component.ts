import { expect, Locator, Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent.component';
import { locators } from '../../utils/locators';
import { safeClick, fillAndBlur } from '../../utils/interaction';

export class PricingSection extends BaseComponent {
  // Returns the plan option matching the requested plan name.
  readonly planOption: (name: string) => Locator;
  // Visible plan label shown in the pricing card.
  readonly planLabel: Locator;
  // Email input used to continue the purchase journey.
  readonly emailInput: Locator;
  // Primary action button that submits the pricing form.
  readonly payButton: Locator;

  constructor(page: Page) {
    super(page);
    this.planOption = (selectorName: string) =>
      page.locator(locators.pricing.planOption).filter({ hasText: selectorName });
    this.planLabel = page.locator(locators.pricing.planLabel).first();
    this.emailInput = page.locator(locators.pricing.emailInput);
    this.payButton = page.locator(locators.pricing.submitButton);
  }

  // Selects the requested plan for the visitor.
  async selectPlan(planName: string): Promise<void> {
    const option = this.planOption(planName);
    await safeClick(option.first(), this.page);
  }

  // Fills the email field and blurs it so validation can run.
  async fillEmail(email: string): Promise<void> {
    await fillAndBlur(this.emailInput, email);
  }

  // Submits the pricing form to continue the purchase journey.
  async submit(): Promise<void> {
    await safeClick(this.payButton, this.page);
  }

  // Confirms the pricing form is ready for user interaction.
  async expectReadyForSubmission(): Promise<void> {
    await expect(this.emailInput).toBeVisible();
    await expect(this.payButton).toBeVisible();
  }

  // Confirms the email field preserves the expected value.
  async expectEmailValue(value: string): Promise<void> {
    await expect(this.emailInput).toHaveValue(value);
  }
}
