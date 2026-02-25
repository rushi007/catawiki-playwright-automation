import { Page, expect } from "@playwright/test";
import { SearchResultPageLocators } from "./SearchResultPage.locators";
import { HomePage } from "./HomePage";

export class SearchResultPage {
  readonly page: Page;
  readonly searchResultpageLocators: SearchResultPageLocators;

  constructor(page: Page) {
    this.page = page;
    this.searchResultpageLocators = new SearchResultPageLocators(page);
  }

  async getTitle() {
    return this.searchResultpageLocators.searchResultTitleLocator.textContent();
  }

  async getResultCountFromTitle() {
    const countText = await this.searchResultpageLocators.searchResultCounterLocator.textContent();
    return countText ? parseInt(countText.replace(/\D/g, '')) : 0;
  }

  async getActualResultCount(homePage: HomePage, searchkeyword: string) {
    let itemsPerPage = await this.searchResultpageLocators.searchResultItemsLocator.count();
    let paginationLastPageText = (await this.searchResultpageLocators.searchResultPaginationLastPageLocator.textContent())?.trim();
    let lastPageNumber = Number(paginationLastPageText);

    if (lastPageNumber) {
      const resultsMinusLastPageItems = itemsPerPage * (lastPageNumber - 1); // Calculate results on all pages except the last one

      // Add the items on the last page to get the total count
      // Navigate to the last page to count items
      // await this.searchResultpageLocators.searchResultPaginationLastPageLocator.click();
      await this.goToLastPage(3);

      // Wait for the last page to load and count items on the last page
      let lastPageItemsCount = await this.searchResultpageLocators.searchResultItemsLocator.count();

      // await this.searchResultpageLocators.searchResultPaginationFirstPageLocator.click();

      await this.goToFirstPage(3);

      return resultsMinusLastPageItems + lastPageItemsCount;
    }
    return itemsPerPage;
  }

  async goToLastPage(retries = 3) {
    for (let i = 0; i< retries; i++){
      try {
        const pagination = this.searchResultpageLocators.searchPaginationLocator.last();
        await pagination.click();
        await expect(pagination).toHaveClass(/current/);
        return;
      } catch (error) {
        if (1 == retries -1) {
          console.log(`Failed while paginating to the last page number. ${error}`);
        }
      }
    }
  }

  async goToFirstPage(retries = 3) {
    for (let i = 0; i< retries; i++){
      try {
        const pagination = this.searchResultpageLocators.searchPaginationLocator.first();
        await pagination.click();
        await expect(pagination).toHaveClass(/current/);
        return;
      } catch (error) {
        if (1 == retries -1) {
          console.log(`Failed while paginating to the first page number. ${error}`);
        }
      }
    }
  }

  async getLotCardFaouritesCount(lotIndex: number) {
    const favouritesTextLocator = await this.searchResultpageLocators.searchResultItemsLocator.nth(lotIndex).locator('div.c-lot-card__favorite button[data-testid="lot-card-favorite-button"]');
    await expect(favouritesTextLocator).toBeVisible();
    const favouritesText = await favouritesTextLocator.getAttribute('count');
    return favouritesText ? parseInt(favouritesText.replace(/\D/g, '')) : 0;
  }

  async getLotCardCurrentBid(lotIndex: number) {
    await this.searchResultpageLocators.searchResultItemsLocator.first().waitFor();
    const bidTextLocator = await this.searchResultpageLocators.searchResultItemsLocator.nth(lotIndex).locator('div.c-lot-card__content p.c-lot-card__price');
    await expect(bidTextLocator).toBeVisible();
    await expect(bidTextLocator).not.toHaveText('');
    const bidText = await bidTextLocator.innerText();
    return bidText ? parseFloat(bidText.replace(/\D/g, '')) : 0;
  }

  async getLotCardTimer(lotIndex: number) {
    const timerTextLocator = await this.searchResultpageLocators.searchResultItemsLocator.nth(lotIndex).locator('[data-testid="timer-lot-count-down"]');
    await expect(timerTextLocator).toBeVisible();
    await expect(timerTextLocator).not.toHaveText('');
    const timerText = await timerTextLocator.innerText();
    return timerText ? parseInt(timerText.replace(/\D/g, '')) : 0;
  }
}