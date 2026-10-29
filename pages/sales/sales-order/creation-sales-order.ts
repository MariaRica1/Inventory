import { Page, Locator} from '@playwright/test'

export class salesOrderPage{
    readonly page: Page;
    readonly customerLookup: Locator;
    readonly invoicingPreferenceField: Locator;
    readonly salesTeamLookup: Locator;
    readonly salesPersonLookup: Locator;
    readonly consingneeLookup: Locator;
    readonly orderDesignationDropdown: Locator;
    readonly deliveryMethodDropdown: Locator;
    readonly deliveryDateField: Locator;
    readonly paymentTermsLookup: Locator;
    readonly VATClassDropdown: Locator;
    readonly referenceNoInput: Locator;
    readonly checkedByLookup: Locator;
    constructor ( page: Page){
        this.page = page;
        this.customerLookup = page.getByPlaceholder("")
        this.invoicingPreferenceField = page.locator('')
        this.salesTeamLookup = page.locator('')
        this.salesPersonLookup = page.locator('')
        this.consingneeLookup = page.locator('')
        this.orderDesignationDropdown = page.locator('')
        this.deliveryMethodDropdown = page.locator('')
        this.deliveryDateField = page.locator('')
        this.paymentTermsLookup = page.locator('')
        this.VATClassDropdown = page.locator('')
        this.referenceNoInput = page.locator('')
        this.checkedByLookup = page.locator('')

    }
}