'use client';

import { Button } from '@repo/ui';
import { Plus, Trash2 } from 'lucide-react';
import type { WmsLineApi } from '../../lib/wms-api';
import { WMS_WAREHOUSES } from '../../lib/wms-hub-config';
import { createEmptyWmsLine, type WmsDocVariant } from '../../lib/wms-line-factory';

const LOC_OPTS = ['A-01-02', 'B-02-01', 'C-03-00'];

type Props = {
  variant: WmsDocVariant;
  sectionTitle: string;
  lines: WmsLineApi[];
  onChange: (lines: WmsLineApi[]) => void;
  skuOptions: string[];
};

function updateLine(lines: WmsLineApi[], index: number, patch: Partial<WmsLineApi>): WmsLineApi[] {
  return lines.map((line, i) => (i === index ? { ...line, ...patch } : line));
}

function lineForApi(line: WmsLineApi, variant: WmsDocVariant): WmsLineApi {
  const trimmed: WmsLineApi = {
    ...line,
    sku: line.sku.trim(),
    warehouse: line.warehouse.trim(),
    quantity: Number(line.quantity) || 0,
    location: line.location?.trim() || undefined,
    batch: line.batch?.trim() || undefined,
    serial: line.serial?.trim() || undefined,
    batchExpiry: line.batchExpiry?.trim() || undefined,
  };
  if (variant === 'transfer') {
    trimmed.destWarehouse = line.destWarehouse?.trim() || line.warehouse;
  }
  if (variant !== 'receipt') {
    delete trimmed.unitPriceRial;
    delete trimmed.batchExpiry;
  }
  return trimmed;
}

export function sanitizeWmsDocLines(lines: WmsLineApi[], variant: WmsDocVariant): WmsLineApi[] {
  return lines
    .map((l) => lineForApi(l, variant))
    .filter((l) => l.sku && l.warehouse && l.quantity > 0);
}

export function WmsDocLineComposer({ variant, sectionTitle, lines, onChange, skuOptions }: Props) {
  const showUnitPrice = variant === 'receipt';
  const showDest = variant === 'transfer';
  const showBatchExpiry = variant === 'receipt';

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-muted/40 border-b text-xs">
        <span className="font-medium">{sectionTitle}</span>
        <span className="text-muted-foreground">کالا، انبار، محل انبار و مقدار برای هر قلم الزامی است</span>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-8 mr-auto"
          onClick={() => onChange([...lines, createEmptyWmsLine(variant)])}
        >
          <Plus className="size-3.5 ml-1" />
          افزودن قلم
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs min-w-[720px]">
          <thead>
            <tr className="bg-rose-500/5 text-muted-foreground border-b">
              <th className="py-2 px-2 w-8">#</th>
              <th className="py-2 px-2 text-right">کالا *</th>
              <th className="py-2 px-2 text-right">انبار *</th>
              <th className="py-2 px-2 text-right">محل انبار *</th>
              {showDest ? (
                <>
                  <th className="py-2 px-2 text-right">انبار مقصد</th>
                  <th className="py-2 px-2 text-right">محل مقصد</th>
                </>
              ) : null}
              <th className="py-2 px-2 text-right">مقدار *</th>
              {showUnitPrice ? <th className="py-2 px-2 text-right">بهای واحد (ریال) *</th> : null}
              <th className="py-2 px-2 text-right">بچ</th>
              {showBatchExpiry ? <th className="py-2 px-2 text-right">انقضای بچ</th> : null}
              <th className="py-2 px-2 text-right">سریال</th>
              <th className="py-2 px-2 w-10" />
            </tr>
          </thead>
          <tbody>
            {lines.map((line, index) => (
              <tr key={`line-${index}`} className="border-b">
                <td className="p-2">{(index + 1).toLocaleString('fa-IR')}</td>
                <td className="p-2">
                  <input
                    list={`wms-sku-options-${variant}`}
                    className="w-full min-w-[120px] rounded-md border bg-background px-2 py-1.5 text-sm"
                    value={line.sku}
                    placeholder="کد کالا، مثلاً SKU-QA-01"
                    onChange={(e) => onChange(updateLine(lines, index, { sku: e.target.value }))}
                  />
                  <datalist id={`wms-sku-options-${variant}`}>
                    {skuOptions.map((o) => (
                      <option key={o} value={o} />
                    ))}
                  </datalist>
                </td>
                <td className="p-2">
                  <select
                    className="w-full min-w-[100px] rounded-md border bg-background px-2 py-1.5 text-sm"
                    value={line.warehouse}
                    onChange={(e) => onChange(updateLine(lines, index, { warehouse: e.target.value }))}
                  >
                    {WMS_WAREHOUSES.map((w) => (
                      <option key={w.code} value={w.code}>
                        {w.code}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-2">
                  <select
                    className="w-full min-w-[100px] rounded-md border bg-background px-2 py-1.5 text-sm"
                    value={line.location ?? LOC_OPTS[0]}
                    onChange={(e) => onChange(updateLine(lines, index, { location: e.target.value }))}
                  >
                    {LOC_OPTS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </td>
                {showDest ? (
                  <>
                    <td className="p-2">
                      <select
                        className="w-full rounded-md border bg-background px-2 py-1.5 text-sm"
                        value={line.destWarehouse ?? 'WH-THR'}
                        onChange={(e) => onChange(updateLine(lines, index, { destWarehouse: e.target.value }))}
                      >
                        {WMS_WAREHOUSES.map((w) => (
                          <option key={w.code} value={w.code}>
                            {w.code}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-2">
                      <select className="w-full rounded-md border bg-background px-2 py-1.5 text-sm" defaultValue={LOC_OPTS[0]}>
                        {LOC_OPTS.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </td>
                  </>
                ) : null}
                <td className="p-2">
                  <input
                    type="number"
                    min={1}
                    className="w-20 rounded-md border px-2 py-1.5 text-sm"
                    value={line.quantity}
                    onChange={(e) =>
                      onChange(updateLine(lines, index, { quantity: Number(e.target.value) || 1 }))
                    }
                  />
                </td>
                {showUnitPrice ? (
                  <td className="p-2">
                    <input
                      className="w-28 rounded-md border px-2 py-1.5 text-sm"
                      value={line.unitPriceRial ?? ''}
                      onChange={(e) =>
                        onChange(updateLine(lines, index, { unitPriceRial: Number(e.target.value) || 0 }))
                      }
                    />
                  </td>
                ) : null}
                <td className="p-2">
                  <input
                    className="w-20 rounded-md border px-2 py-1.5 text-sm"
                    value={line.batch ?? ''}
                    onChange={(e) => onChange(updateLine(lines, index, { batch: e.target.value }))}
                    placeholder="اختیاری"
                  />
                </td>
                {showBatchExpiry ? (
                  <td className="p-2">
                    <input
                      type="date"
                      className="w-32 rounded-md border px-2 py-1.5 text-sm"
                      value={line.batchExpiry ?? ''}
                      onChange={(e) => onChange(updateLine(lines, index, { batchExpiry: e.target.value }))}
                    />
                  </td>
                ) : null}
                <td className="p-2">
                  <input
                    className="w-24 rounded-md border px-2 py-1.5 text-sm"
                    value={line.serial ?? ''}
                    onChange={(e) => onChange(updateLine(lines, index, { serial: e.target.value }))}
                  />
                </td>
                <td className="p-2">
                  {lines.length > 1 ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-rose-700"
                      onClick={() => onChange(lines.filter((_, i) => i !== index))}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
