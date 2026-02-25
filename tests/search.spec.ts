import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { SearchResultPage } from '../src/pages/SearchResultPage';
import { LotPage } from '../src/pages/LotPage';

test.describe('Catawiki search flow', () => {
  let homePage: HomePage;
  let testInfoData: any;

  const searchKeyWord = "Train";
  const lotCardIndex = 1;

  test.beforeEach(async ({ page }, testInfo) => {
    testInfoData = testInfo;
    homePage = new HomePage(page, testInfo.project.name);
    
    // Navigate to the home page and accept cookies
    await homePage.navigate('');
    await homePage.agreeToCookies();
    await page.waitForLoadState('domcontentloaded');
  });

  test('Search Flow: Should display correct lot details when navigating from search results', async ({ page }) => {

    let searchResultPage = new SearchResultPage(page);
    await test.step(`Search for the keyword ${searchKeyWord}`, async () => {
      await homePage.search(searchKeyWord);
      await expect(page).toHaveURL(/\/s\?q=train/i);
    });

    let actualResultCount: number;
    let cardsCount: number;
    await test.step('Validate search results are present', async () => {
      cardsCount = await searchResultPage
        .searchResultpageLocators
        .searchResultItemsLocator
        .count();

      expect(cardsCount).toBeGreaterThanOrEqual(1);
    });

    let searchPageTitle: string | null;
    let resultCountFromTitle: number;
    let lotCardFavouritesCount: number;
    let lotCardCurrentBid: number;
    let lotCardTimer: number;

    await test.step('Extract search page and lot card data', async () => {

      [
        searchPageTitle,
        resultCountFromTitle,
        lotCardFavouritesCount,
        lotCardCurrentBid,
        lotCardTimer
      ] = await Promise.all([
        searchResultPage.getTitle(),
        searchResultPage.getResultCountFromTitle(),
        searchResultPage.getLotCardFaouritesCount(lotCardIndex),
        searchResultPage.getLotCardCurrentBid(lotCardIndex),
        searchResultPage.getLotCardTimer(lotCardIndex)
      ]);

      expect(searchPageTitle?.toLowerCase()).toEqual(searchKeyWord.toLowerCase());
      expect(lotCardTimer).not.toBeNull();
      expect(resultCountFromTitle).toBeGreaterThan(0);
    });

    await test.step(`Open lot card at index ${lotCardIndex}`, async () => {

      const lotLink = searchResultPage
        .searchResultpageLocators
        .searchResultItemsLocator
        .nth(lotCardIndex);

      await Promise.all([
        page.waitForURL(/\/l\//),
        lotLink.click()
      ]);
    });

    await test.step('Validate lot page details match search card', async () => {

      const lotPage = new LotPage(page, testInfoData.project.name);
      const lotDetails = await lotPage.getLotDetails();

      console.info(`Lot Details for ${testInfoData.project.name}`, {
        title: lotDetails.title,
        favouriteCount: lotDetails.favouriteCount,
        currentBid: lotDetails.bidAmount,
        lotTimerDays: lotDetails.lotTimerDays
      });

      expect(lotCardFavouritesCount).toEqual(lotDetails.favouriteCount);
      expect(lotCardCurrentBid).toEqual(lotDetails.bidAmount);
      expect(lotCardTimer).toEqual(lotDetails.lotTimerDays);
    });
  });


  /**
   * This test will FAIL
   * It seems like it's a bug in production
   */
  test('Search Flow: Displayed result count should equal actual number of result items', async ({ page }) => {
    const searchResultPage = new SearchResultPage(page);
    await test.step(`Search for the keyword ${searchKeyWord}`, async () => {
      await homePage.search(searchKeyWord);
      await expect(page).toHaveURL(/\/s\?q=train/i);
    });

    const resultCountFromTitle = await searchResultPage.getResultCountFromTitle();
    const actualResultCount = await searchResultPage.getActualResultCount(homePage, searchKeyWord);
    
    test.step('Assert disaplyed result count equal actual number of result items', async () => {
      // The count from the title should equal to the actual count, right now it's failing because of the bug in production
      expect(resultCountFromTitle).toEqual(actualResultCount);
    });
    
  });
});