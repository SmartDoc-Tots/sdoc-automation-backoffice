// Archivo: tests/login.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TestConfig } from '../utils/config';

test('Login exitoso al backoffice con credenciales válidas', async ({ browser }) => {
  const context = await browser.newContext(); // Sin sesión
  const page = await context.newPage();

  const loginPage = new LoginPage(page);

  await loginPage.goTo(TestConfig.url);
  await loginPage.ensureLoggedIn(TestConfig.email, TestConfig.password);

  await context.close();
});