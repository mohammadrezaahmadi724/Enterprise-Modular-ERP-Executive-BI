import { createHmac, timingSafeEqual } from 'node:crypto';

export interface PaymentGateway {
  createOrder(input: { amount: number; currency: string; callbackUrl: string }): Promise<{ orderId: string; redirectUrl: string }>;
  verifyPayment(input: { orderId: string; authority: string }): Promise<{ ok: boolean; refId?: string }>;
  handleWebhook(input: { payload: string; signature: string; secret: string }): boolean;
}

export class ZarinpalMockGateway implements PaymentGateway {
  async createOrder(input: { amount: number; currency: string; callbackUrl: string }) {
    const orderId = `zp_${input.amount}_${Date.now()}`;
    return {
      orderId,
      redirectUrl: `https://sandbox.zarinpal.com/pg/StartPay/mock/${orderId}`,
    };
  }

  async verifyPayment(input: { orderId: string; authority: string }) {
    return { ok: input.authority.length > 3, refId: `REF-${input.orderId}` };
  }

  handleWebhook(input: { payload: string; signature: string; secret: string }): boolean {
    const expected = createHmac('sha256', input.secret).update(input.payload).digest('hex');
    try {
      return timingSafeEqual(Buffer.from(expected), Buffer.from(input.signature));
    } catch {
      return false;
    }
  }
}

export const zarinpalGateway = new ZarinpalMockGateway();
