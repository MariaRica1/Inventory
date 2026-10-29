import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://10.0.0.92:8009/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('superuser');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('SomePass123$%^');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.locator('div').filter({ hasText: /^PURCHASES$/ }).nth(3).click();
  await page.locator('div').filter({ hasText: /^PURCHASE REQUESTS$/ }).nth(2).click();
  await page.getByRole('button', { name: 'New' }).click();
  await page.getByRole('textbox', { name: 'Required Date' }).click();
  await page.getByRole('button', { name: 'October 2026', exact: true }).click();
  await page.locator('.m_730a79ed > button:nth-child(3)').click();
  await page.locator('.mantine-focus-auto.m_2351eeb0').first().click();
  await page.getByRole('button', { name: '2026' }).click();
  await page.getByText('– 2029').click();
  await page.getByText('– 2029').click();
  await page.locator('.m_730a79ed > button:nth-child(3)').click();
  await page.locator('div:nth-child(4) > div:nth-child(3)').click();
  await page.getByRole('button', { name: 'Open calendar' }).nth(1).click();
  await page.locator('.m_730a79ed > button:nth-child(3)').click();
  await page.locator('.mantine-focus-auto.m_2351eeb0').first().click();
});