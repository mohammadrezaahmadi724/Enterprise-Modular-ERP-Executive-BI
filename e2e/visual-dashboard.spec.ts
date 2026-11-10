import { test, expect } from '@playwright/test';

test.describe('visual smoke', () => {
  test('dashboard layout snapshot', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.getByRole('heading', { name: /داشبورد/ })).toBeVisible({ timeout: 20_000 });
    await expect(page).toHaveScreenshot('dashboard-rtl.png', {
      animations: 'disabled',
      fullPage: false,
    });
  });

  test('finance journal page loads', async ({ page }) => {
    await page.goto('/finance/journal-entries');
    await expect(page.getByRole('heading', { name: /اسناد حسابداری/ })).toBeVisible({ timeout: 20_000 });
  });
});
