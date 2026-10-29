import { expect, type Page, type Locator } from '@playwright/test';

export class loginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly showPassword: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'Username', exact: true });
        this.passwordInput = page.getByLabel('Password', { exact: true });
        this.loginButton = page.getByRole('button', { name: 'Log In', exact: true });
        this.showPassword = page.locator('button:has-text("Show"), [aria-label*="show" i], [title*="show" i]').first();
    }

    async navigate() {
        await this.page.goto('/');
        await expect(this.loginButton).toBeVisible();
    }

     async login(user: string, pass: string) {
        try {
            await this.usernameInput.fill(user);
            await this.passwordInput.fill(pass);
            await this.loginButton.click();
            await expect(this.page).toHaveURL(/\/dashboard(?:[/?#]|$)/);
        } catch {
            // Playwright may create an error-context snapshot even with screenshots off.
            await Promise.allSettled([
                this.usernameInput.fill('', { timeout: 1000 }),
                this.passwordInput.fill('', { timeout: 1000 }),
            ]);
            // Do not propagate Playwright fill call logs containing credentials.
            throw new Error('SIMS login failed. Check the environment, account access, and login availability.');
        }
    }

}
