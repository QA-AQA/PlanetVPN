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
}
