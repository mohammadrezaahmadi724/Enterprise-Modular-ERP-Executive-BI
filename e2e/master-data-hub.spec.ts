import { test, expect } from '@playwright/test';

test('master data hub loads with section cards', async ({ page }) => {
  await page.goto('/projects/settings/master-data');
  await expect(page.getByRole('heading', { name: 'اطلاعات پایه' })).toBeVisible({ timeout: 20_000 });
  await expect(page.getByRole('navigation', { name: 'بخش‌های اطلاعات پایه' })).toBeVisible();
  await expect(page.getByText('طرف‌حساب‌ها').first()).toBeVisible();
});

test('master data taxes list shows archive action', async ({ page }) => {
  await page.goto('/projects/settings/master-data/taxes');
  await expect(page.getByRole('heading', { name: 'مالیات‌ها' })).toBeVisible({ timeout: 20_000 });
  await expect(page.getByRole('button', { name: 'آرشیو' }).first()).toBeVisible();
});
