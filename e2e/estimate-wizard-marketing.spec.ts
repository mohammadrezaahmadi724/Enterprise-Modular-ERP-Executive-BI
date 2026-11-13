import { test, expect } from '@playwright/test';
import { e2eMobile, readStackStatus, skipUnlessMarketingStack } from './helpers/stack-guard';

test.describe('ویزارد مارکتینگ — مسیر ابری', () => {
  test.beforeEach(() => {
    skipUnlessMarketingStack();
  });

  test('از identity تا نتیجه + لینک checkout', async ({ page }) => {
    await page.goto('/pricing/estimate');

    await expect(page.getByRole('heading', { name: /با چه کسی و کدام سازمان/ })).toBeVisible({
      timeout: 20_000,
    });
    await page.locator('#identity-name').fill('مامال تست');
    await page.locator('#identity-org').fill('شرکت نمونه E2E');
    await page.getByTestId('est-next').click();

    await expect(page.getByRole('heading', { name: /کسب‌وکار شما چه ساختاری/ })).toBeVisible();
    await page.getByTestId('est-next').click();

    await expect(page.getByRole('heading', { name: /می‌خواهید ERP را چطور/ })).toBeVisible();
    await page.getByTestId('est-next').click();

    await expect(page.getByRole('heading', { name: /کدام بخش‌ها باید یکپارچه/ })).toBeVisible();
    await page.getByTestId('est-next').click();

    await expect(page.getByRole('heading', { name: /اتصال|راه‌اندازی/ })).toBeVisible();
    await page.getByTestId('est-next').click();

    await page.locator('#est-phone').fill(e2eMobile());
    const sendWait = page.waitForResponse(
      (r) => r.url().includes('estimate/otp/send') && r.request().method() === 'POST',
    );
    await page.getByTestId('est-next').click();
    const sendRes = await sendWait;
    expect(sendRes.ok()).toBeTruthy();
    const sendBody = (await sendRes.json()) as { accepted: boolean; devCode?: string };
    expect(sendBody.accepted).toBe(true);
    expect(sendBody.devCode).toMatch(/^\d{5}$/);

    await page.locator('#est-otp').fill(sendBody.devCode!);
    const verifyWait = page.waitForResponse(
      (r) => r.url().includes('estimate/otp/verify') && r.request().method() === 'POST',
    );
    await page.getByTestId('est-next').click();
    const verifyRes = await verifyWait;
    expect(verifyRes.ok()).toBeTruthy();

    await expect(page.getByText(/تعرفه ERP ابری سازمانی|برآورد تخمینی/)).toBeVisible({ timeout: 30_000 });
    const checkout = page.getByTestId('est-checkout-link');
    await expect(checkout).toBeVisible();
    const href = await checkout.getAttribute('href');
    expect(href).toContain('/checkout/plan/');
    expect(href).toContain('estimateId=');
    expect(href).toContain('utm_source=estimate');
  });

  test('نتیجه → باز کردن چک‌اوت tenant', async ({ page, context }) => {
    test.skip(!process.env.E2E_FULL_STACK, 'E2E_FULL_STACK=1 برای چک‌اوت cross-origin');
    const { web } = readStackStatus();
    await page.goto('/pricing/estimate?step=12');
    const deep = page.getByTestId('est-checkout-link');
    if ((await deep.count()) === 0) {
      test.skip(true, 'deep-link step=12 بدون OTP — از تست قبلی استفاده کنید');
    }
    const href = await deep.getAttribute('href');
    const absolute = href!.startsWith('http') ? href! : `${web}${href}`;
    const checkoutPage = await context.newPage();
    await checkoutPage.goto(absolute!);
    await expect(checkoutPage.getByText(/تعداد کاربر/)).toBeVisible({ timeout: 20_000 });
  });
});
