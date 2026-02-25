import { Page, Locator } from "@playwright/test";
import SearchStrategy from "./SearchStrategy";
import { HomePage } from "../pages/HomePage";

export class DesktopSearchStrategy implements SearchStrategy {
  private homePage: HomePage;

  constructor(homePage: HomePage) {
    this.homePage = homePage;
  }

  async searchForKeyword(keyword: string): Promise<void> {
    await this.homePage.homePageLocators.searchInputLocator.fill(keyword);
    await this.homePage.homePageLocators.searchButtonLocator.click(); 
  }
}