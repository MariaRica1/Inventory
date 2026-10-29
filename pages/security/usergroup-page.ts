import { Page, Locator } from '@playwright/test';

export class UserGroupPage {
    readonly page: Page;
    readonly newButton: Locator;
    readonly nameInput: Locator;
    readonly referenceLookup: Locator;
    readonly descriptionInput: Locator;
    readonly saveButton: Locator;
    readonly searchInput: Locator;
    readonly table: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newButton = page.getByRole('button', { name: /new/i }).first();
        this.nameInput = page.locator('input[name*="group" i], input[placeholder*="group" i], input[aria-label*="group" i], input[name*="name" i]').first();
        this.referenceLookup = page.locator('input[placeholder*="reference" i], input[aria-label*="reference" i], input[name*="reference" i]').first();
        this.descriptionInput = page.locator('textarea, input[placeholder*="description" i], input[name*="description" i], textarea[aria-label*="description" i]').first();
        this.saveButton = page.getByRole('button', { name: /save/i }).first();
        this.searchInput = page.locator('input[placeholder*="search" i], input[aria-label*="search" i]').first();
        this.table = page.locator('table').first();
    }

    async open() {
        await this.page.getByText(/security/i).click();
        await this.page.getByText(/user group/i).click();
    }

    async createUserGroup(name: string, description: string = 'QA user group') {
        await this.newButton.click();
        await this.nameInput.fill(name);
        await this.referenceLookup.fill(`REF-${Date.now()}`);
        await this.descriptionInput.fill(description);
        await this.saveButton.click();
    }

    async expectVisibleInTable(name: string) {
        await this.table.getByText(name, { exact: true }).waitFor({ state: 'visible' });
    }
}
