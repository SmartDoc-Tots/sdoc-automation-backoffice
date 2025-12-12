// Archivo: tests/login.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TestConfig } from '../utils/config';

test.use({ storageState: { cookies: [], origins: [] } });

test('Login exitoso al backoffice con credenciales válidas', async ({ page }) => {

  
  const loginPage = new LoginPage(page);

  await loginPage.goTo(TestConfig.url);
  
  await loginPage.ensureLoggedIn(TestConfig.email, TestConfig.password);
});