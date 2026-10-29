import { Page, Locator } from '@playwright/test';

export class purchaseRequestListingPage {
    readonly page: Page;
   

    constructor(page: Page) {
        this.page = page;
    }
}