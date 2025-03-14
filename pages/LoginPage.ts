import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly userName: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = page.locator('id=username');
    this.password = page.locator('id=password');
    this.loginBtn = page.getByRole('button', { name: 'Submit' });
    this.errorMessage = page.locator('id=error');
  }

  async goto() {
    await this.page.goto('https://practicetestautomation.com/practice-test-login/');
  }

  async login(username: string, password: string) {
    await expect(this.userName).toBeVisible();
    await expect(this.password).toBeVisible();
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.loginBtn.first().click();
  }
}