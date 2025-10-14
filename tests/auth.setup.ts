// Archivo: tests/auth.setup.ts

import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TestConfig } from '../utils/config';

// La ruta donde se guardará la sesión. Es buena práctica crear una carpeta para esto.
const authFile = 'playwright/.auth/user.json';

setup('Autenticación Global', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  // Realizamos el login usando nuestro Page Object
  await loginPage.goTo(TestConfig.url);
  await loginPage.login(TestConfig.email, TestConfig.password);

  // Verificamos que la página post-login sea la correcta antes de guardar.
  // Esta es la señal de que el login fue exitoso.
  await expect(page).toHaveURL(/.*projects/);

  // Guardamos el estado de la sesión en el archivo definido.
  await page.context().storageState({ path: authFile });
});