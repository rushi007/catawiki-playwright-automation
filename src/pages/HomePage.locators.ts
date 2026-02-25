import { Page, Locator } from "@playwright/test";

export class HomePageLocators {
    readonly cookieAgreeButtonLocator: Locator;
    readonly searchInputLocator: Locator;
    readonly searchButtonLocator: Locator;
    readonly mobileSearchButtonLocator: Locator;

    constructor(page: Page) {
        this.cookieAgreeButtonLocator = page.locator('button[id="cookie_bar_agree_button"]');
        this.searchInputLocator = page.locator('input[data-testid="search-field"]:visible');
        this.searchButtonLocator = page.locator('button[aria-label="Search"]:visible');
        this.mobileSearchButtonLocator = page.locator('button.c-header__mobile-nav__search');
    }
}