import { Locator, Page, expect } from '@playwright/test';
import SearchStrategy from '../strategies/SearchStrategy';
import { DesktopSearchStrategy } from '../strategies/DesktopSearchStrategy';
import { MobileSearchStrategy } from '../strategies/MobileSearchStrategy';
import { HomePageLocators } from './HomePage.locators';

export class HomePage {
  private searchStrategy: SearchStrategy;

  readonly page: Page;
  readonly cookieAgreeButtonLocator: Locator;
  readonly homePageLocators: HomePageLocators;
  constructor(page: Page, projectName: string) {
    this.page = page;
    this.homePageLocators = new HomePageLocators(page);
    this.cookieAgreeButtonLocator = this.homePageLocators.cookieAgreeButtonLocator;
    this.searchStrategy = projectName.includes("Mobile") ? new MobileSearchStrategy(this) : new DesktopSearchStrategy(this);
  }

  async navigate(pageUrl: string) {
    await pageUrl.length > 0 ? this.page.goto(`${pageUrl}`) : this.page.goto('/');
  }

  async verifyHomePage() {
    console.log("Verifying home page...");
  }

  async agreeToCookies() {
    await this.cookieAgreeButtonLocator.click();
  }

  async search(keyword: string) {
    await this.searchStrategy.searchForKeyword(keyword);
  }
}