'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Badge, Button, Card, CardContent } from '@repo/ui';
import { CheckCircle2, PackageCheck, ShoppingCart, Timer } from 'lucide-react';
import { ProjectsQuickReceiveDialog } from './ProjectsQuickReceiveDialog';
import { approvePurchaseRequest } from '../../lib/procurement-api';
import { formatToman } from '../../lib/finance-receivables-demo';
import type { ProjectContextApi } from '../../lib/projects-api';
import { ProjectsQuickPoDialog } from './ProjectsQuickPoDialog';

export function ProjectsProcurementNextSteps({
  ctx,
  projectCode,
  onRefresh,
}: {
  ctx: ProjectContextApi;
  projectCode: string;
  onRefresh: () => void;
}) {
  const [poOpen, setPoOpen] = useState(false);
  const [poPr, setPoPr] = useState<string | undefined>();
  const [rcvOpen, setRcvOpen] = useState(false);
  const [rcvPo, setRcvPo] = useState<string | undefined>();
  const [approving, setApproving] = useState<string | null>(null);

  const ready = ctx.procurement.readyForPurchaseOrder;
  const pending = ctx.procurement.pendingApproval;
  const receiptReady = ctx.procurement.readyForReceipt ?? [];

  if (!ready.length && !pending.length && !receiptReady.length) return null;

  async function approvePr(number: string) {
    setApproving(number);
    try {
      await approvePurchaseRequest(number);
      onRefresh();
    } finally {
      setApproving(null);
    }
  }

  return (
    <>
      <Card className="border-violet-200 bg-violet-50/40">
        <CardContent className="pt-4 space-y-3">
          <h2 className="font-semibold text-sm flex items-center gap-2">
            قدم بعدی تأمین
            <Badge variant="secondary" className="text-[10px]">
              یک‌کلیک
            </Badge>
          </h2>

          {pending.map((pr) => (
            <div key={pr.purchaseRequestNumber} className="flex flex-wrap items-center gap-2 text-xs border border-dashed rounded-lg p-2 bg-background/80">
              <Timer className="size-4 text-amber-700" />
              <span className="font-mono">{pr.purchaseRequestNumber}</span>
              <span className="text-muted-foreground flex-1 min-w-[120px]">{pr.title.slice(0, 40)}</span>
              <Button type="button" size="sm" variant="outline" disabled={approving === pr.purchaseRequestNumber} onClick={() => void approvePr(pr.purchaseRequestNumber)}>
                <CheckCircle2 className="size-3.5 ml-1" />
                تأیید CFO (دموی)
              </Button>
              <Link href={`/procurement/purchase-requests?project=${encodeURIComponent(projectCode)}`} className="text-primary text-[11px]">
                جزئیات
              </Link>
            </div>
          ))}

          {ready.map((pr) => (
            <div key={pr.purchaseRequestNumber} className="flex flex-wrap items-center gap-2 text-xs border border-dashed rounded-lg p-2 bg-background/80">
              <ShoppingCart className="size-4 text-emerald-700" />
              <span className="font-mono">{pr.purchaseRequestNumber}</span>
              <span className="text-muted-foreground flex-1 min-w-[120px]">
                آماده صدور PO · {formatToman(pr.estimatedToman)}
              </span>
              <Button
                type="button"
                size="sm"
                className="bg-rose-800"
                onClick={() => {
                  setPoPr(pr.purchaseRequestNumber);
                  setPoOpen(true);
                }}
              >
                صدور سفارش
              </Button>
            </div>
          ))}

          {receiptReady.map((po) => (
            <div key={po.purchaseOrderNumber} className="flex flex-wrap items-center gap-2 text-xs border border-dashed rounded-lg p-2 bg-background/80">
              <PackageCheck className="size-4 text-violet-700" />
              <span className="font-mono">{po.purchaseOrderNumber}</span>
              <span className="text-muted-foreground flex-1 min-w-[120px]">
                آماده رسید انبار · {po.supplierName} ({formatToman(po.totalToman)})
              </span>
              <Button
                type="button"
                size="sm"
                variant="default"
                className="bg-violet-800 hover:bg-violet-900"
                onClick={() => {
                  setRcvPo(po.purchaseOrderNumber);
                  setRcvOpen(true);
                }}
              >
                ثبت رسید
              </Button>
              <Link href={`/procurement/receipts?po=${encodeURIComponent(po.purchaseOrderNumber)}`} className="text-primary text-[11px]">
                فرم کامل
              </Link>
            </div>
          ))}
        </CardContent>
      </Card>

      <ProjectsQuickPoDialog open={poOpen} ctx={ctx} initialPr={poPr} onClose={() => setPoOpen(false)} onCreated={onRefresh} />
      <ProjectsQuickReceiveDialog
        open={rcvOpen}
        options={receiptReady}
        initialPo={rcvPo}
        projectCode={projectCode}
        onClose={() => setRcvOpen(false)}
        onCreated={onRefresh}
      />
    </>
  );
}
