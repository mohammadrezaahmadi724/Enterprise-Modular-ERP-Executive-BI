import type { PricingModel } from './types';

export type PriceInput = {
  model: PricingModel;
  basePrice: number;
  seats?: number;
  quantity?: number;
  tiers?: { upTo: number; unitPrice: number }[];
  customAmount?: number;
};

export function calculatePrice(input: PriceInput): number {
  switch (input.model) {
    case 'Flat':
      return input.basePrice;
    case 'PerSeat':
      return input.basePrice * (input.seats ?? 1);
    case 'Tiered': {
      const qty = input.quantity ?? input.seats ?? 1;
      const tiers = input.tiers ?? [
        { upTo: 10, unitPrice: input.basePrice },
        { upTo: 50, unitPrice: input.basePrice * 0.8 },
      ];
      let remaining = qty;
      let total = 0;
      let prev = 0;
      for (const tier of tiers) {
        const span = Math.min(remaining, tier.upTo - prev);
        if (span <= 0) break;
        total += span * tier.unitPrice;
        remaining -= span;
        prev = tier.upTo;
      }
      if (remaining > 0) {
        const last = tiers[tiers.length - 1];
        total += remaining * (last?.unitPrice ?? input.basePrice);
      }
      return total;
    }
    case 'Volume':
      return input.basePrice * (input.quantity ?? 1);
    case 'Usage':
      return input.basePrice * (input.quantity ?? 0);
    case 'Custom':
      return input.customAmount ?? input.basePrice;
    default:
      return input.basePrice;
  }
}
