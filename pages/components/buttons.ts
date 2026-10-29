import { Page, Locator } from '@playwright/test'

export class Buttons {
    readonly page: Page;
    readonly newButton: Locator;
    readonly saveButton: Locator;
    readonly saveAsDraftButton: Locator;
    readonly doneButton: Locator;
    readonly selectButton: Locator;
    readonly closeButton: Locator;


    constructor (page: Page){
        this.page = page;
        this.newButton = page.getByRole("button", { name: "New"});
        this.saveButton = page.getByRole("button", { name: "Save"});
        this.saveAsDraftButton = page.getByRole("button", { name: "Save As Draft"});
        this.doneButton = page.getByRole("button", { name: "Done"});
        this.selectButton = page.getByRole("button", { name: "Select"});
        this.closeButton = page.getByRole("button", { name: "Close"});
     
    }
}