import { Page, Locator } from '@playwright/test'

type SidebarMenu =
    | 'DASHBOARD'
    | 'MASTERFILE'
    | 'ITEMS'
    | 'SUPPLIER'
    | 'CUSTOMER'
    | 'EMPLOYEE'
    | 'PURCHASES'
    | 'PURCHASE REQUESTS'
    | 'PROFOMA INVOICE'
    | 'PURCHASE ORDER'
    | 'GOODS RECEIPTS'
    | 'BILLS'
    | 'PAYMENTS MADE'
    | 'PURCHASE RETURN'
    | 'SUPPLIER CREDITS'
    | 'CONFIGURATIONS'
    | 'ITEM CONFIGURATION';

export class Sidebar {
    readonly page: Page;
    readonly dashboardLink: Locator;
    readonly masterfileLink: Locator;
    readonly itemsLink: Locator;
    readonly supplierLink: Locator;
    readonly customerLink: Locator;
    readonly employeeLink: Locator;
    readonly purchasesLink: Locator;
    readonly purchaseRequestLink: Locator;
    readonly proformaInvoiceLink: Locator;
    readonly purchaseOrderLink: Locator;
    readonly goodsReceiptsLink: Locator;
    readonly billsLink: Locator;
    readonly paymentsMadeLink: Locator;
    readonly purchaseReturnLink: Locator;
    readonly supplierCreditsLink: Locator;
    readonly configurationsLink: Locator;
    readonly itemConfigurationsLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dashboardLink = page.getByText('DASHBOARD');
        this.masterfileLink = page.getByText('MASTERFILE');
        this.itemsLink = page.getByText('ITEMS').first();
        this.supplierLink = page.getByText('SUPPLIER');
        this.customerLink = page.getByText('CUSTOMER');
        this.employeeLink = page.getByText('EMPLOYEE');
        this.purchasesLink = page.getByText('PURCHASES');
        this.purchaseRequestLink = page.getByText('PURCHASE REQUESTS').nth(0);
        this.proformaInvoiceLink = page.getByText('PROFOMA INVOICE');
        this.purchaseOrderLink = page.getByText('PURCHASE ORDER');
        this.goodsReceiptsLink = page.getByText('GOODS RECEIPTS');
        this.billsLink = page.getByText('BILLS');
        this.paymentsMadeLink = page.getByText('PAYMENTS MADE');
        this.purchaseReturnLink = page.getByText('PURCHASE RETURN');
        this.supplierCreditsLink = page.getByText('SUPPLIER CREDITS');
        const navigation = page.getByRole('navigation');
        this.configurationsLink = navigation.getByText('CONFIGURATIONS', { exact: true });
        this.itemConfigurationsLink = navigation.getByText('ITEM CONFIGURATION', { exact: true });
    }

    async navigateTo(menuItem: SidebarMenu) {
        const sidebar: Record<SidebarMenu, Locator> = {
            'DASHBOARD': this.dashboardLink,
            'MASTERFILE': this.masterfileLink,
            'ITEMS': this.itemsLink,
            'SUPPLIER': this.supplierLink,
            'CUSTOMER': this.customerLink,
            'EMPLOYEE': this.employeeLink,
            'PURCHASES': this.purchasesLink,
            'PURCHASE REQUESTS': this.purchaseRequestLink,
            'PROFOMA INVOICE': this.proformaInvoiceLink,
            'PURCHASE ORDER': this.purchaseOrderLink,
            'GOODS RECEIPTS': this.goodsReceiptsLink,
            'BILLS': this.billsLink,
            'PAYMENTS MADE': this.paymentsMadeLink,
            'PURCHASE RETURN': this.purchaseReturnLink,
            'SUPPLIER CREDITS': this.supplierCreditsLink,
            'CONFIGURATIONS': this.configurationsLink,
            'ITEM CONFIGURATION': this.itemConfigurationsLink
        };

        await sidebar[menuItem].click();
    }
}
