// tests/sponsors.spec.ts
import { test, expect } from '@playwright/test';
import path from 'path';
import { SponsorsPage } from '../pages/SponsorsPage';
import { TestConfig } from '../utils/config';

test.use({
  storageState: 'playwright/.auth/user.json',
  baseURL: TestConfig.url, // absoluta (incluye /admin si aplica)
});

test.describe('Gestión de Sponsors', () => {
  test('El usuario puede crear un sponsor con imagen', async ({ page }) => {
    const sponsorsPage = new SponsorsPage(page);
    const sponsorName = `Sponsor con Imagen ${Date.now()}`;
    const logoPath = path.resolve(process.cwd(), 'assets', 'logo.png'); // ← usa .jpg si es requisito

    await sponsorsPage.goTo();
    await sponsorsPage.createSponsor(sponsorName, 'Descripción de prueba.', logoPath);
    await sponsorsPage.verifySponsorExists(sponsorName);
  });
});
