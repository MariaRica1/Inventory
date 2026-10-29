import { Page , Locator } from '@playwright/test'

export class itemsPage{
    readonly page: Page;
    readonly itemCodeinput: Locator;
    readonly barcodeInput: Locator;
    readonly nameInput: Locator;
    readonly categoryLookup: Locator;
    readonly groupLookup: Locator;
    readonly subgroupLookup: Locator;
    readonly brandLookup: Locator;
    readonly colorInput: Locator;
    readonly weightInput: Locator;
    readonly gradeLookup: Locator;
    readonly productCodeInput: Locator;
    readonly supplierCodeInput: Locator;
    readonly UOMLookup: Locator;
    readonly inventoriableDropdown: Locator;
    readonly serializedDropdown: Locator;
    readonly flooringInput: Locator;
    readonly ceilingInput: Locator;
    readonly reorderQuantityInput: Locator;
    readonly unitCostInput: Locator;
    readonly unitPriceInput: Locator;
    readonly VATClassDropdown: Locator;
    readonly selectButton: Locator;
    readonly closeButton: Locator;

    constructor ( page: Page){
        this.page = page;
        this.itemCodeinput = page.getByPlaceholder('Enter item code')
        this.barcodeInput = page.getByPlaceholder('Enter barcode')
        this.nameInput = page.getByPlaceholder('Enter name')
        this.categoryLookup = page.getByPlaceholder('Select category')
        this.groupLookup = page.getByPlaceholder('Select group')
        this.subgroupLookup = page.getByPlaceholder('Select subgroup' )
        this.brandLookup = page.getByPlaceholder('Select brand')
        this.colorInput = page.getByPlaceholder('Enter color/s')
        this.weightInput = page.getByRole('textbox', { name: '0.000' })
        this.gradeLookup = page.getByPlaceholder('Select grade')
        this.productCodeInput = page.getByPlaceholder('Enter product Code')
        this.supplierCodeInput = page.getByPlaceholder('Enter supplier item code' )
        this.UOMLookup = page.getByPlaceholder('Select unit of measurement')
        this.inventoriableDropdown = page.getByRole('textbox', { name: 'Inventoriable' })
        this.serializedDropdown = page.getByRole('textbox', { name: 'Serialized' })
        this.flooringInput = page.getByRole('textbox', { name: 'Flooring' })
        this.ceilingInput = page.getByRole('textbox', { name: 'Ceiling' })
        this.reorderQuantityInput = page.getByRole('textbox', { name: 'Reorder Quantity' })
        this.unitCostInput = page.getByRole('textbox', { name: 'Unit Cost' })
        this.unitPriceInput = page.getByText('Unit Price *')
        this.VATClassDropdown = page.getByPlaceholder('Select VAT class')
        this.selectButton = page.getByRole('button', { name: 'SELECT' })
        this.closeButton = page.getByRole('button', { name: 'CLOSE' })
    }

    async inputItemCode(itemcode: string){
        await this.itemCodeinput.fill(itemcode); 
    }
    async inputBarcode(barcode: number){
        await this.barcodeInput.fill(barcode.toString())
    }
    async inputName(name: string){
        await this.nameInput.fill(name)
    }
    async selectCategory(category: string){
        await this.categoryLookup.click()
        await this.page
            .locator("tr")
            .filter({hasText: `${category}`})
            .getByRole('checkbox')
            .click();
        await this.selectButton.click();
    }
    async selectGroup(group: string){
        await this.groupLookup.click()
        await this.page
            .locator("tr")
            .filter({hasText: `${group}`})
            .getByRole('checkbox')
            .click();
        await this.selectButton.click();
    } 
    async selectSubgroup(subgroup: string){
        await this.subgroupLookup.click()
        await this.page
            .locator("tr")
            .filter({hasText: `${subgroup}`})
            .getByRole('checkbox')
            .click();
        await this.selectButton.click();
    }
    async selectBrand(brand: string){
        await this.brandLookup.click()
            const rows = this.page.locator('tr');
            const nextPageBtn = this.page.getByRole('button').nth(15);

            for (let page = 1; page <= 20; page++) {
                const rowCount = await rows.count();

                console.log(`Lookup page ${page}: ${rowCount} rows`);

                for (let i = 0; i < rowCount; i++) {
                    const row = rows.nth(i);
                    const brandCell = row.getByText(brand, { exact: true });

                    console.log(`Row ${i}: ${brandCell}`);

                    if (await brandCell.count() > 0) {
                        await row.getByRole('checkbox').check();
                        await this.selectButton.click();
                        return;
                    }
                }

                if (
                    await nextPageBtn.count() === 0 ||
                    !(await nextPageBtn.isEnabled())
                ) {
                    throw new Error(
                        `Brand "${brand}" not found. Check the logged rows and Next button locator.`
                    );
                }

                await nextPageBtn.click();
            }

        throw new Error(`Stopped after 20 pages looking for "${brand}".`);
    }
    async inputColor(color: string){
        await this.colorInput.fill(color)
        await this.colorInput.press('Enter')
    }
    async inputWeight(weight: number){
        await this.weightInput.fill(weight.toString())
    } 
    async selectGrade(grade: string){
        await this.gradeLookup.click()
        await this.page
            .locator("tr")
            .filter({hasText: `${grade}`})
            .getByRole('checkbox')
            .click();
        await this.selectButton.click();
    }
    async inputProductCode(productcode: string){
        await this.productCodeInput.fill(productcode)
    }
    async inputSupplierCode(suppliercode: string){
        await this.supplierCodeInput.fill(suppliercode)
    }
    async selectUOM(uom: string){
        await this.UOMLookup.click()
        await this.page
            .locator("tr")
            .filter({hasText: `${uom}`})
            .getByRole('checkbox')
            .click();
        await this.selectButton.click();
    }
    async selectInventoriable(inventoriable: boolean) {
        await this.inventoriableDropdown.click();

        const option = inventoriable ? 'Yes' : 'No';

        await this.page.getByRole('option', { name: option, exact: true }).click();
    }
    async inputFlooring(flooring: number){
        await this.flooringInput.fill(flooring.toString())
    }
    async inputCeiling(ceiling: number){
        await this.ceilingInput.fill(ceiling.toString())
    }
    async inputReorderQuantity(reorderquantity: number){
        await this.reorderQuantityInput.fill(reorderquantity.toString())
    }
    async inputUnitCost(unitcost: number){
        await this.unitCostInput.fill(unitcost.toString())
    }
    async inputUnitPrice(unitprice: number){
        await this.unitPriceInput.fill(unitprice.toString())
    }
    async selectVATClass(vatclass: string){
        await this.VATClassDropdown.click()
        await this.page.$(`text=${vatclass}`).then(option => option?.click());
    }

}