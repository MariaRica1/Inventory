import { test as base } from '@playwright/test';
import testData from '../data/users.json;'
import { loginPage} from '../pages/login/loginpage';
import { Sidebar } from '../pages/components/sidebar';
import { Buttons } from '../pages/components/buttons';
import { itemsPage } from '../pages/masterfile/items/itempage';
import { purchaseRequestListingPage } from '../pages/purchases/purchase-request/lpurchase-request-listing';
import creationPurchaseRequestPage from '../pages/purchases/purchase-request/creation-purchase-request';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { DatePicker } from '../pages/components/date-picker';
import { ItemsTableComponent } from '../pages/components/items-table';


type myFixture = {
    loginpage: loginPage;
    loginAs: (role: string) => Promise<DashboardPage>
    dashboardPage: DashboardPage;
    sidebar: Sidebar;
    buttons: Buttons;
    itempage: itemsPage
    purchaseRequestListingpage: purchaseRequestListingPage;
    creationPurchaseRequest: creationPurchaseRequestPage;
    datepicker: DatePicker;
    itemsTable: ItemsTableComponent



}

export const test = base.extend<myFixture>({
    loginAs: async ({ page }, use) => {
        const loginAs = async (role: string) => {
            const loginpage = new loginPage(page);
            const user = testData.users.find(u => u.role === role);

            if (!user) throw new Error(`Role ${role} not found in test data`)

            await loginpage.navigate()
            await loginpage.usernameInput.fill(user.username);
            await loginpage.passwordInput.fill(user.password);
            await loginpage.loginButton.click()
            return new DashboardPage(page)
        }
        await use(loginAs)
    },
     dashboardPage: async ({ page }, use) => {
        const loginpage = new loginPage(page);
        const dashboardPage = new DashboardPage(page);
        await loginpage.navigate();
        await loginpage.login('Administrator', 'Sql123$%^');
        await use(dashboardPage);
    }, 
    sidebar: async ({ page }, use) =>{
        await use(new Sidebar(page))
    },
    buttons: async ({ page }, use) =>{
        await use( new Buttons(page))
    },
    itempage: async ({ page }, use) =>{
        await use(new itemsPage(page))
    },
    purchaseRequestListingpage: async ({ page }, use) =>{
        await use(new purchaseRequestListingPage(page))
    },
    creationPurchaseRequest: async ({ page }, use) =>{
        await use(new creationPurchaseRequestPage(page))
    },
    datepicker: async ({ page }, use) =>{
        await use(new DatePicker(page))
    },
    itemsTable: async ({ page }, use) =>{
        await use(new ItemsTableComponent(page))
    }

})
export { expect } from '@playwright/test';
