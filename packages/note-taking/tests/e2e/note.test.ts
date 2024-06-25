import { test, expect } from '@playwright/test';
test.describe('Note App', () => {
    test('should display a message when no notes are available', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('text=Vous n\'avez aucune note pour le moment 😶')).toBeVisible();
    });

    test('should create a new note', async ({ page }) => {
        await page.goto('/create');
        await page.fill('input[name="title"]', 'Test Note');
        await page.fill('textarea[name="content"]', 'Ceci est une note de test.');
        await page.click('text=Ajouter');
        await expect(page.locator('text=Test Note')).toBeVisible();
    });
  });
