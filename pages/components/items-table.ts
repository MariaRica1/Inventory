import { Locator, Page } from '@playwright/test';

export class ItemsTableComponent {
    readonly page: Page;
    readonly itemsTable: Locator;
    readonly itemsRows: Locator;
    readonly itemsLookup: Locator;
    readonly particularInput: Locator;
    readonly QTYInput: Locator;
    readonly UOMField: Locator;
    readonly trashIcon: Locator;
    readonly selectBtn: Locator;
    readonly addRowBtn: Locator;

    constructor (page: Page) {
        this.page = page;
        this.itemsTable = page.locator('table');
        this.itemsRows = this.itemsTable.locator('tbody tr');

        this.itemsLookup = page.getByRole('button').filter({ hasText: /^$/ }).nth(4);
        this.particularInput = page.getByPlaceholder('Enter particulars');
        this.QTYInput = page.locator('input.mantine-NumberInput-input');
        this.UOMField = page.locator('');
        this.trashIcon = page.getByRole('button').nth(11);
        this.selectBtn = page.getByRole('button', { name: 'SELECT' });
        this.addRowBtn = page.getByRole('button', { name: 'Add Row' });
        
    }

    getRow(index: number): Locator {
        return this.itemsRows.nth(index);
    }

    getItemLookup(index: number): Locator {
        return this.getRow(index).getByRole('button').first();
    }

    getParticularInput(index: number): Locator {
        return this.getRow(index).getByPlaceholder('Enter particulars');
    }

    getQTYInput(index: number): Locator {
        return this.getRow(index).locator('input.mantine-NumberInput-input');
    }

    getUOMField(index: number): Locator {
        return this.getRow(index).locator('');
    }

    getTrashIcon(index: number): Locator {
        return this.getRow(index).getByRole('button').nth(11);
    }

    async addRow() {
        await this.addRowBtn.click();
    }

    async selectItems(index: number, item: string) {
        await this.getItemLookup(index).click();

        // TODO: Replace with a locator scoped to the lookup table
        const rows = this.page.locator('tr');
        const nextPageBtn = this.page.getByRole('button').nth(32);

        for (let page = 1; page <= 20; page++) {
            const rowCount = await rows.count();

            console.log(`Lookup page ${page}: ${rowCount} rows`);

            for (let i = 0; i < rowCount; i++) {
                const row = rows.nth(i);
                const text = await row.innerText();

                console.log(`Row ${i}: ${text}`);

                if (text.includes(item)) {
                    await row.getByRole('checkbox').check();
                    await this.selectBtn.click();
                    return;
                }
            }

            if (
                await nextPageBtn.count() === 0 ||
                !(await nextPageBtn.isEnabled())
            ) {
                throw new Error(
                    `Item "${item}" not found. Check the logged rows and Next button locator.`
                );
            }

            await nextPageBtn.click();
        }

        throw new Error(`Stopped after 20 pages looking for "${item}".`);
    }

    async fillQuantity(index: number, quantity: number) {
        await this.getQTYInput(index).fill(quantity.toString());
    }
    async fillParticular(index: number, particular: string) {
        await this.getParticularInput(index).fill(particular);
    }
    async getRowCount(): Promise<number> {
        return await this.itemsRows.count();
    }
}