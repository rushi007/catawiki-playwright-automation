import {Page, Locator } from "@playwright/test";

export class SearchResultPageLocators {
    readonly searchResultItemsLocator: Locator;
    readonly searchResultTitleLocator: Locator;
    readonly searchResultCounterLocator: Locator;
    readonly searchResultPaginationFirstPageLocator: Locator;
    readonly searchResultPaginationLastPageLocator: Locator;
    readonly searchPaginationLocator: Locator;


    constructor(page: Page) {
        this.searchResultItemsLocator = page.locator('div[data-sentry-component="ListingLotsWrapper"]');
        this.searchResultTitleLocator = page.locator('main[data-testid="SearchResults"] h1');
        this.searchResultCounterLocator = page.locator('h2[data-testid="object-amount"]');
        this.searchResultPaginationFirstPageLocator = page.locator('div[data-testid="pages"] span[data-testid="page"]:visible').nth(0);
        this.searchResultPaginationLastPageLocator = page.locator('div[data-testid="pages"] span[data-testid="page"]:visible').last();
        this.searchPaginationLocator = page.locator('div[data-testid="pages"] span')
    }
}