import { Page, Locator } from "@playwright/test";

export class LotPageLocators {
    readonly lotTitleLocator: Locator;
    readonly favouriteButtonLocator: Locator;
    readonly bidAmountLocator: Locator;
    readonly lotTimerDays: Locator;

    constructor(page: Page, projectName: String) {
        this.lotTitleLocator = page.locator('h1.LotTitle_title__rXYHd');
        this.favouriteButtonLocator = page.locator('button[data-sentry-component="FavoriteButton"]');

        this.bidAmountLocator = projectName.includes("Mobile") 
            ? page.locator('div.bid-status-section-container div[data-sentry-component="Amount"]')
            : page.locator('div[data-testid="lot-bid-status-section"] div[data-sentry-component="Amount"]');

        this.lotTimerDays = projectName.includes("Mobile") 
            ? page.locator('time[data-testid="timer-countdown"] span').nth(0) 
            : page.locator('div[data-testid="lot-bidding-counter"] div').nth(0);
    }
}