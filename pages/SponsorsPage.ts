// pages/SponsorsPage.ts
import { expect, type Page, type Locator } from '@playwright/test';

export class SponsorsPage {
  readonly page: Page;
  readonly dialog: Locator;
  readonly createSponsorButton: Locator;
  readonly nameInput: Locator;
  readonly descriptionInput: Locator;
  readonly imageTrigger: Locator;
  readonly fileInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.createSponsorButton = page.getByRole('button', { name: 'Nuevo' });
    this.dialog = page.getByRole('dialog');

    // Con scope al diálogo, nth es estable; si tienes labels, cámbialos por getByLabel(...)
    this.nameInput = this.dialog.getByRole('textbox').nth(0);
    this.descriptionInput = this.dialog.getByRole('textbox').nth(1);

    this.imageTrigger = this.dialog.getByRole('img', { name: /profile/i });
    this.fileInput = this.dialog.locator('p-fileupload input[type="file"], input[type="file"]').first();

    this.saveButton = this.dialog.getByRole('button', { name: /^(save|guardar)$/i });
  }

  async goTo() {
    await this.page.goto('/sponsors', { waitUntil: 'networkidle' }); // requiere baseURL
    await this.page.waitForURL(/\/sponsors(?:[?#].*)?$/);
    return this;
  }

  async uploadLogo(filePath: string) {
    const hasInput = (await this.fileInput.count()) > 0;

    if (hasInput) {
      // Input presente: subir directo (funciona aunque esté oculto)
      await this.fileInput.setInputFiles(filePath);

      // Solo aquí verificamos files.length
      await expect
  .poll(async () =>
    this.fileInput.evaluate((el: Element) =>
      (el as HTMLInputElement).files?.length ?? 0
    )
  , { timeout: 30_000 })
  .toBe(1);

    } else {
      // Fallback: abrir file chooser desde el trigger visible
      await this.imageTrigger.scrollIntoViewIfNeeded();
      const [fc] = await Promise.all([
        this.page.waitForEvent('filechooser'),
        this.imageTrigger.click(),
      ]);
      await fc.setFiles(filePath);
      // En este flujo no forzamos files.length, porque puede no haber input accesible
    }

    // Señal funcional: el formulario reconoce el archivo
    await expect(this.saveButton).toBeEnabled({ timeout: 30_000 });
  }

  async createSponsor(name: string, description: string, filePath: string) {
    await this.createSponsorButton.click();
    await expect(this.dialog).toBeVisible();

    await this.nameInput.fill(name);
    await this.descriptionInput.fill(description);
    await this.uploadLogo(filePath);

    await Promise.all([
      this.page.waitForLoadState('networkidle'),
      this.saveButton.click(),
    ]);
  }

  async verifySponsorExists(name: string) {
    await expect(this.page.getByRole('cell', { name })).toBeVisible();
  }
}
