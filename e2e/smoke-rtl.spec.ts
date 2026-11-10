import { test, expect } from '@playwright/test';

test('tenant dashboard RTL smoke', async ({ page }) => {
  await page.goto('/dashboard');
  const dir = await page.locator('html').getAttribute('dir');
  expect(dir).toBe('rtl');
  await expect(page.getByRole('heading', { name: /داشبورد/ })).toBeVisible({ timeout: 15_000 });
});
