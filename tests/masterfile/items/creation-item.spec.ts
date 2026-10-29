import { test, expect } from '../../../fixtures/baseTest';

test.describe('Item Creation', () => { 
    test('As a user, I should be able to save and create a new item', async ({ loginAs, sidebar,  buttons, itempage }) => {
        await loginAs('SuperUser');
        await sidebar.navigateTo('MASTERFILE');
        await sidebar.navigateTo('ITEMS');
        await buttons.newButton.click();
        await itempage.inputItemCode('75765');
        await itempage.inputBarcode(86788);
        await itempage.inputName('name');
        await itempage.selectCategory('wines');
        await itempage.selectGroup('Red Wine');
        await itempage.selectSubgroup('Light-Bodied');
        await itempage.selectBrand('B001'); 
        await itempage.inputColor('red');
        await itempage.inputWeight(10);
        await itempage.selectGrade('GRD0010');
        await itempage.inputProductCode('PROD-123');
        await itempage.inputSupplierCode('SUPP-456');
        await itempage.selectUOM('UM0010');
        await itempage.selectInventoriable(true);
        await itempage.inputFlooring(5);
        await itempage.inputCeiling(15);
        await itempage.inputReorderQuantity(10);
        await itempage.inputUnitCost(100);
        await itempage.inputUnitPrice(200);
        await itempage.selectVATClass('VAT EXCLUSIVE');
    })
})

