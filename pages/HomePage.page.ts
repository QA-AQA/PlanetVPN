import { Page } from '@playwright/test';
import { BasePage } from './BasePage.page';
import { PricingSection } from './components/PricingSection.component';
import { ServerSelector } from './components/ServerSelector.component';

export class HomePage extends BasePage {
  readonly pricing: PricingSection;
  readonly server: ServerSelector;

  constructor(page: Page) {
    super(page);
    this.pricing = new PricingSection(page);
    this.server = new ServerSelector(page);
  }

  async open(): Promise<void> {
    await super.open('/');
  }

  async choosePlan(planName: string, email: string): Promise<void> {
    await this.pricing.selectPlan(planName);
    await this.pricing.fillEmail(email);
    await this.pricing.submit();
  }

  async selectPlanAndContinue(planName: string, email: string, location: string): Promise<void> {
    await this.server.selectLocation(location);
    await this.pricing.selectPlan(planName);
    await this.pricing.fillEmail(email);
    await this.pricing.submit();
  }

  async openAndVerifyForm(): Promise<void> {
    await this.open();
    await this.pricing.waitForVisibleForm();
  }

  async fillEmailAndSubmit(email: string): Promise<void> {
    await this.pricing.fillEmail(email);
    await this.pricing.submit();
  }

  async verifyLandingPageContent(): Promise<void> {
    await this.open();
    await this.pricing.waitForVisibleForm();
    await this.page.locator('text=Frequently Asked Questions (FAQs)').first().waitFor({ state: 'visible' });
    await this.page.locator('text=How to connect Planet VPN configuration after a purchase?').first().waitFor({ state: 'visible' });
  }

  async openCurrencySelector(): Promise<void> {
    await this.open();
    await this.page.locator('form#PPG label.ppg__label.select').nth(1).click();
  }

  async openFooterSection(): Promise<void> {
    await this.open();
    await this.page.locator('footer').waitFor({ state: 'visible' });
    await this.page.locator('a[href="#content"]').first().click();
  }

  async verifyMobileForm(): Promise<void> {
    await this.openAndVerifyForm();
    await this.page.locator('form#PPG').waitFor({ state: 'visible', timeout: 15000 });
  }

  async verifyInvalidEmailState(email: string): Promise<void> {
    await this.open();
    await this.pricing.fillEmail(email);
    await this.pricing.submit();
  }
}
