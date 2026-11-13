import { randomUUID } from 'node:crypto';
import { test, expect } from '@playwright/test';
import {
  buildCloudCheckoutPath,
  wizardModuleIdsToErpCodes,
} from '../packages/contracts/src/pricing/checkout-redirect';
import { e2eMobile, readStackStatus, skipUnlessApiWeb } from './helpers/stack-guard';

test.describe('برآورد → OTP → checkout', () => {
  test.beforeEach(() => {
    skipUnlessApiWeb();
  });

  test('OTP عمومی و prefill چک‌اوت tenant', async ({ page, request }) => {
    const { api, web } = readStackStatus();
    const phone = e2eMobile();
    const sendRes = await request.post(`${api}/api/v1/public/pricing/estimate/otp/send`, {
      data: { phone },
    });
    if (!sendRes.ok()) {
      const errText = await sendRes.text();
      throw new Error(`otp/send ${sendRes.status()}: ${errText.slice(0, 200)}`);
    }
    const sendBody = (await sendRes.json()) as { accepted: boolean; devCode?: string };
    expect(sendBody.accepted).toBe(true);
    expect(sendBody.devCode).toBeTruthy();

    const verifyRes = await request.post(`${api}/api/v1/public/pricing/estimate/otp/verify`, {
      data: { phone, code: sendBody.devCode },
      headers: { 'Idempotency-Key': randomUUID() },
    });
    expect(verifyRes.ok()).toBeTruthy();
    const verifyBody = (await verifyRes.json()) as { verified: boolean; correlationId?: string };
    expect(verifyBody.verified).toBe(true);
    expect(verifyBody.correlationId).toBeTruthy();

    const href = buildCloudCheckoutPath(web, process.env.NEXT_PUBLIC_CLOUD_PLAN_CODE ?? 'professional', {
      seats: 12,
      moduleCodes: wizardModuleIdsToErpCodes(['sales', 'finance']),
      estimateId: verifyBody.correlationId,
      deliveryMode: 'cloud_saas',
      utmSource: 'estimate',
    });
    const path = href.startsWith(web) ? href.slice(web.length) : href;
    await page.goto(path);
    await expect(page.getByText(/تعداد کاربر/)).toBeVisible({ timeout: 20_000 });
    await expect(page.locator('input[type="range"]')).toHaveValue('12');
  });
});
