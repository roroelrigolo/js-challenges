import { test, expect } from '@playwright/test';

test.describe('Note App', () => {
    test('should be online', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('text=Convertisseur en ligne')).toBeVisible();
    });

    test('should converter work', async ({ page }) => {
        await page.goto('/');
        await page.fill('input[name="price"]', '2');
        await page.selectOption('select[name="devise-base"]', 'EUR');
        await page.selectOption('select[name="devise-final"]', 'USD');
        await page.click('text=Convertir');
        await expect(page.locator('text=1.0698503583')).toBeVisible();
    });
  });