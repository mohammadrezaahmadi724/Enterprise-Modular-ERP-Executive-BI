import { describe, expect, it } from 'vitest';
import { computeWizardEstimate } from '../src/pricing/compute-wizard-estimate';

describe('computeWizardEstimate', () => {
  it('matches reference ballpark for single sales module at 35 users on private cloud', () => {
    const r = computeWizardEstimate({
      userCount: 35,
      deployment: 'private_cloud',
      integrations: ['data-migration'],
      modules: [{ moduleId: 'sales', complexity: 'standard', addonIds: [] }],
    });
    expect(r.moduleCodes).toEqual(['sales']);
    expect(r.userMultiplier).toBe(1.15);
    expect(r.rangeMinTomans).toBeGreaterThan(95_000_000);
    expect(r.rangeMaxTomans).toBeLessThan(125_000_000);
    expect(r.costBuckets.length).toBeGreaterThanOrEqual(4);
    expect(r.deliveryMode).toBe('custom_implementation');
    expect(r.primaryQuoteKind).toBe('implementation_range');
    expect(r.cloudBreakdown.totalMonthlyTomans).toBe(r.cloudMonthlyTomans);
  });

  it('cloud path: all modules with per-seat breakdown, onboarding one-time only', () => {
    const moduleIds = [
      'sales',
      'inventory',
      'finance',
      'hr',
      'distribution',
      'retail',
      'manufacturing',
      'org-comms',
    ] as const;
    const r = computeWizardEstimate({
      deliveryMode: 'cloud_saas',
      userCount: 25,
      deployment: 'private_cloud',
      integrations: ['data-migration'],
      modules: moduleIds.map((moduleId) => ({ moduleId, complexity: 'standard', addonIds: [] })),
    });
    expect(r.primaryQuoteKind).toBe('cloud_monthly');
    expect(r.cloudBreakdown.moduleLines.length).toBe(8);
    expect(r.cloudBreakdown.extraSeatCount).toBe(15);
    expect(r.deploymentTomans).toBe(0);
    expect(r.cloudMonthlyTomans).toBeGreaterThan(0);
    expect(r.rangeMaxTomans).toBeLessThan(r.cloudMonthlyTomans);
  });
});
