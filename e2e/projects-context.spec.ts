import { test, expect } from '@playwright/test';

test('project context page shows production supply demo', async ({ page }) => {
  await page.goto('/projects/projects/PRJ-0024');
  await expect(page.getByRole('heading', { name: /تأمین قطعات خط تولید/ })).toBeVisible({ timeout: 20_000 });
  await expect(page.getByRole('button', { name: /درخواست خرید برای این پروژه/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: /اعضای تیم پروژه/ })).toBeVisible();
});
