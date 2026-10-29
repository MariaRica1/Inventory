import { test, expect } from '../../fixtures/baseTest';

test.describe('Purchase Request Creation', () => {
    test('As a user, I should be able to create a new purchase request', async ({ page, loginAs, sidebar, buttons, datepicker, creationPurchaseRequest, itemsTable }) => {
        await loginAs('SuperUser');
        await sidebar.navigateTo('PURCHASES');
        await sidebar.navigateTo('PURCHASE REQUESTS');
        await buttons.newButton.click();
        await creationPurchaseRequest.purchaseRequestDate.isVisible();
        await creationPurchaseRequest.selectRequesterName('EMP017');
        await creationPurchaseRequest.selectProject('PJCT002');
        await creationPurchaseRequest.costumerField.isVisible();
        await datepicker.selectDate('Jan 10, 2027');
        await creationPurchaseRequest.referenceNo.fill('REF-12345'); 
        await creationPurchaseRequest.remarksInput.fill('This is a test purchase request.');
        await itemsTable.selectItems(0, 'HSR-ITM-0001');
        await itemsTable.fillParticular(0, 'Particulars for Item 1');
        await itemsTable.fillQuantity(0, 10);
        await itemsTable.addRow();
        await itemsTable.selectItems(1, 'ITM-PK-042');
        await itemsTable.fillParticular(1, 'Particulars for Item 2');
        await itemsTable.fillQuantity(1, 5);
        // Add more items as needed



    })
})