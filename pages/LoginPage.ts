// Archivo: pages/LoginPage.ts

import { type Page, type Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder('nombre@dominio.com'); 
    this.passwordInput = page.locator('#LoginInput_Password');
    this.submitButton = page.locator('#login_submit_button');
  }

  async goTo(url: string): Promise<LoginPage> {
    await this.page.goto(url);
    return this;
  }

  async login(email: string, password: string): Promise<LoginPage> {
    await this.emailInput.click();
    await this.emailInput.fill(email);
    await this.passwordInput.click();
    await this.passwordInput.fill(password);

    await expect(this.submitButton).toBeEnabled();
    await this.submitButton.click();
    return this;
  }

  async ensureLoggedIn(email: string, password: string): Promise<LoginPage> {
    console.log('Verificando formulario de login...');
    
  
    await this.page.waitForSelector('input[placeholder="nombre@dominio.com"]', { state: 'visible', timeout: 5000 });
    
    console.log('Formulario visible, procediendo con login');
    await this.login(email, password);

    
    await expect(this.page.getByText('Dashboard')).toBeVisible({ timeout: 10000 });
    await expect(this.page).toHaveURL(/.*projects/);

    return this;
  }
}