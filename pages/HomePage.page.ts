import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage.page';
import { PricingSection } from './components/PricingSection.component';
import { ServerSelector } from './components/ServerSelector.component';
import { userCopy } from '../utils/user-copy';

export class HomePage extends BasePage {
  // Main pricing form shown to visitors on the landing page.
  readonly pricingForm: Locator;
  // FAQ section content used to answer common visitor questions.
  readonly faqSection: Locator;
  // FAQ answer text shown beneath the landing page support content.
  readonly faqQuestion: Locator;
  // Footer navigation block rendered at the bottom of the landing page.
  readonly footer: Locator;
  // Support link exposed in the footer for customer assistance.
  readonly supportLink: Locator;
  // Heading that introduces the plan selection section.
  readonly purchaseSectionHeading: Locator;
  // Control that opens the currency selection list.
  readonly currencySelector: Locator;
  // Link that scrolls the page to the main content area.
  readonly contentLink: Locator;

  readonly pricing: PricingSection;
  readonly server: ServerSelector;

  constructor(page: Page) {
    super(page);
    this.pricingForm = page.locator('form#PPG');
    this.faqSection = page.locator(`text=${userCopy.faqSectionTitle}`).first();
    this.faqQuestion = page.locator(`text=${userCopy.faqQuestion}`).first();
    this.footer = page.locator('footer');
    this.supportLink = page.locator(`text=${userCopy.supportLink}`).first();
    this.purchaseSectionHeading = page.locator('h2').filter({ hasText: userCopy.purchaseSectionHeading }).first();
    this.currencySelector = page.locator('form#PPG label.ppg__label.select').nth(1);
    this.contentLink = page.locator('a[href="#content"]').first();

    this.pricing = new PricingSection(page);
    this.server = new ServerSelector(page);
  }

  // Opens the landing page and prepares the main purchase journey.
  async open(): Promise<void> {
    await super.open('/');
  }

  // Chooses a plan and continues with a visitor email.
  async choosePlan(planName: string, email: string): Promise<void> {
    await this.pricing.selectPlan(planName);
    await this.pricing.fillEmail(email);
    await this.pricing.submit();
  }

  // Selects the plan, email, and location together before checkout.
  async selectPlanAndContinue(planName: string, email: string, location: string): Promise<void> {
    await this.server.selectLocation(location);
    await this.pricing.selectPlan(planName);
    await this.pricing.fillEmail(email);
    await this.pricing.submit();
  }

  // Opens the home page and confirms the purchase form is available.
  async openAndVerifyForm(): Promise<void> {
    await this.open();
    await this.expectPurchaseFormVisible();
  }

  // Fills the email input and submits the pricing form.
  async fillEmailAndSubmit(email: string): Promise<void> {
    await this.pricing.fillEmail(email);
    await this.pricing.submit();
  }

  // Confirms the landing page exposes the main purchase form and key FAQ guidance.
  async verifyLandingPageContent(): Promise<void> {
    await this.open();
    await this.expectPurchaseFormVisible();
    await expect(this.faqSection).toBeVisible();
    await expect(this.faqQuestion).toBeVisible();
  }

  // Opens the currency selector from the pricing section.
  async openCurrencySelector(): Promise<void> {
    await this.open();
    await this.currencySelector.click();
  }

  // Opens the footer section and scrolls to the main content area.
  async openFooterSection(): Promise<void> {
    await this.open();
    await expect(this.footer).toBeVisible();
    await this.contentLink.click();
  }

  // Verifies the support link remains visible in the footer.
  async expectSupportLinkVisible(): Promise<void> {
    await expect(this.supportLink).toBeVisible();
  }

  // Verifies the purchase section heading is visible to visitors.
  async expectPurchaseSectionVisible(): Promise<void> {
    await expect(this.purchaseSectionHeading).toBeVisible();
  }

  // Verifies the footer navigation is visible.
  async expectFooterVisible(): Promise<void> {
    await expect(this.footer).toBeVisible();
  }

  // Verifies the purchase form is visible on the landing page.
  async expectPurchaseFormVisible(): Promise<void> {
    await expect(this.pricingForm).toBeVisible();
  }

  // Verifies that the pricing form remains usable on mobile viewports.
  async verifyMobileForm(): Promise<void> {
    await this.open();
    await this.expectPurchaseFormVisible();
    await this.pricing.expectReadyForSubmission();
  }

  // Verifies that the currency selector can be opened and presents a choice to the visitor.
  async expectCurrencyOptionsVisible(): Promise<void> {
    await expect(this.currencySelector).toBeVisible();
    await this.currencySelector.click();
    await expect(this.page.locator('form#PPG li[data-id]').first()).toBeAttached();
  }

  // Verifies the invalid-email flow keeps the entered value visible.
  async verifyInvalidEmailState(email: string): Promise<void> {
    await this.open();
    await this.pricing.fillEmail(email);
    await this.pricing.submit();
  }
}
