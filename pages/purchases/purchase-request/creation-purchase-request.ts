import { Page, Locator } from "@playwright/test";

export default class creationPurchaseRequestPage{
    readonly page: Page;
    readonly documentNoField: Locator
    readonly purchaseRequestDate: Locator;
    readonly statusField: Locator;
    readonly requesterNameLookup: Locator;
    readonly departmentField: Locator;
    readonly projectLookup: Locator;
    readonly costumerField: Locator;
    readonly requiredDate: Locator;
    readonly dateinput: Locator;
    readonly referenceNo: Locator;
    readonly checkedByLookup: Locator;
    readonly remarksInput: Locator;
    readonly itemsLookup: Locator;
    readonly particularInput: Locator;
    readonly QTYInput: Locator;
    readonly UOMField: Locator;
    readonly trashIcon: Locator;
    readonly closeBtn: Locator;
    readonly selectBtn: Locator;
    readonly addRowBtn: Locator


    constructor (page :Page ){
        this.page = page;
        this.documentNoField = page.getByRole('textbox', { name: 'Document No.' });
        this.purchaseRequestDate = page.getByRole('textbox', { name: 'Purchase Request Date *' });
        this.statusField = page.getByRole('textbox').nth(4);
        this.requesterNameLookup = page.getByPlaceholder('Select requester name');
        this.departmentField = page.getByRole('textbox', { name: 'Department' })
        this.projectLookup = page.getByPlaceholder('Select project');
        this.costumerField = page.getByRole('textbox', { name: 'Customer' });
        this.requiredDate = page.getByText('Required Date *');
        this.dateinput = page.getByRole('textbox', { name: 'Required Date *' })
        this.referenceNo = page.getByPlaceholder('Enter reference no.');
        this.checkedByLookup = page.getByPlaceholder('Select checker');
        this.remarksInput = page.getByPlaceholder('Enter remarks');
        this.itemsLookup = page.getByRole('button').filter({ hasText: /^$/ }).nth(4);
        this.particularInput = page.getByPlaceholder('Enter particulars');
        this.QTYInput = page.locator('input.mantine-NumberInput-input');
        this.UOMField = page.locator('');
        this.trashIcon = page.getByRole('button').nth(11);
        this.closeBtn = page.getByRole('button', { name: 'CLOSE' });
        this.selectBtn = page.getByRole('button', { name: 'SELECT' });
        this.addRowBtn = page.getByRole('button', { name: 'Add Row' });
    }

    async selectRequesterName(requester: string){
        await this.requesterNameLookup.click()
        await this.page
            .locator("tr")
            .filter({hasText: `${requester}`})
            .getByRole('checkbox')
            .click();
        await this.selectBtn.click();
    }

    async selectProject(project: string){
        await this.projectLookup.click()
        await this.page
            .locator("tr")
            .filter({hasText: `${project}`})
            .getByRole('checkbox')
            .click();
        await this.selectBtn.click();
    }
    async selectChecker(checker: string){
        await this.checkedByLookup.click()
        await this.page
            .locator("tr")
            .filter({hasText: `${checker}`})
            .getByRole('checkbox')
            .click();
        await this.selectBtn.click();
    }

    async selectItem(item: string){
        await this.itemsLookup.click()
        await this.page
            .locator("tr")
            .filter({hasText: `${item}`})
            .getByRole('checkbox')
            .click();
        await this.selectBtn.click();
    }

    async inputQty(qty: number){
        await this.QTYInput.clear();
        await this.QTYInput.fill(qty.toString());
    }

    // async InputRequiredDate(date: string){
    //     await this.requiredDate.click();
    //     await this.dateinput.fill(date);
    //     await this.dateinput.press('Enter');
    // }

}