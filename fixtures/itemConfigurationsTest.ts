import { test as base } from './baseTest';
import { ItemConfigurationsPage } from '../pages/configurations/item-configurations-page';

type ItemConfigurationFixtures = {
  itemConfigurationsPage: ItemConfigurationsPage;
};

export const test = base.extend<ItemConfigurationFixtures>({
  itemConfigurationsPage: async ({ page, loginAs, sidebar }, use) => {
    await loginAs(process.env.SIMS_ROLE ?? 'SuperUser');
    await use(new ItemConfigurationsPage(page, sidebar));
  },
});

export { expect } from '@playwright/test';
