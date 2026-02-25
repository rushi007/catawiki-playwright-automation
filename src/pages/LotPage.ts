import { Locator, Page } from "@playwright/test";
import { LotPageLocators } from "../locators/LotPage.locators"

export class LotPage {
  readonly page: Page;
  readonly lotPageLocators: LotPageLocators;

  constructor(page: Page, projectName: string) {
    this.page = page;
    this.lotPageLocators = new LotPageLocators(page, projectName);
  }

  async getLotTitle() {
    return await this.lotPageLocators.lotTitleLocator.textContent() ?? "";
  }

  async getFavouriteCount() {
    const counter = await this.lotPageLocators.favouriteButtonLocator.getAttribute("count");
    return counter ? parseInt(counter) : 0;
  }

  async getLotBidAmount() {
    const bidAmountText = await this.lotPageLocators.bidAmountLocator.textContent();
    return bidAmountText ? parseFloat(bidAmountText.replace(/\D/g, '')) : 0;
  }

  async getLotTimerDays() {
    const countText = await this.lotPageLocators.lotTimerDays.textContent();
    return countText ? parseInt(countText.replace(/\D/g, '')):0;
  }

  async verifyLotPage() {
    console.log("Verifying lot page...");
  }

  async getLotDetails() {
    return {
        title: await this.getLotTitle(),
        favouriteCount: await this.getFavouriteCount(),
        bidAmount: await this.getLotBidAmount(),
        lotTimerDays: await this.getLotTimerDays()
    };
  }
}