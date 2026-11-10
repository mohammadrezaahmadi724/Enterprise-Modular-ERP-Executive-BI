# گزارش Wave 4 — Risk + BI + Payroll + Assets + WMS + POS + Retention

## معیار قبولی

| معیار | وضعیت |
|--------|--------|
| Risk Radar (۴ الگوریتم + ۶ قاعده) | ✅ |
| Premium Dashboard (RGL + Tremor + `/api/bi/kpis`) | ✅ |
| Payroll Effective-Dated + Immutable | ✅ |
| Payroll persistence (`ERP_PAYROLL_PERSISTENCE=1`) | ✅ |
| Workflow persistence (`ERP_WORKFLOW_PERSISTENCE=1`) | ✅ |
| Fixed Assets (۳ روش استهلاک) | ✅ |
| WMS + QC + POS | ✅ |
| Retention PII + cold storage + downsampling | ✅ |
| UI: dnd-kit, Jalali, PDF payslip | ✅ |

## فعال‌سازی persistence (Dev/Prod)

```bash
set ERP_WORKFLOW_PERSISTENCE=1
set ERP_WORKFLOW_STORE_PATH=.data/workflow-store.json
set ERP_PAYROLL_PERSISTENCE=1
set ERP_PAYROLL_STORE_PATH=.data/payroll-store.json
```

## تست‌ها

```bash
pnpm test
```

نسخه: `6.1.0-wave4-complete`
