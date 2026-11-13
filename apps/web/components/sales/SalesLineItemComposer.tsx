'use client';

import { Button } from '@repo/ui';
import { Plus } from 'lucide-react';

type Props = {
  sectionTitle: string;
  addLabel: string;
};

export function SalesLineItemComposer({ sectionTitle, addLabel }: Props) {
  return (
    <div className="border rounded-lg overflow-hidden mt-3">
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-muted/40 border-b text-xs">
        <span className="font-medium">{sectionTitle}</span>
        <span className="text-muted-foreground">اقلام، مقدار و واحد الزامی است</span>
        <Button type="button" size="sm" variant="outline" className="h-8 mr-auto">
          <Plus className="size-3.5 ml-1" />
          {addLabel}
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 p-3 text-xs bg-rose-500/5">
        {['کالا *', 'شرح', 'مقدار', 'واحد', 'فی (ریال)', 'تخفیف', 'مالیات'].map((h) => (
          <span key={h} className="text-muted-foreground font-medium">
            {h}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 p-3 border-t">
        <select className="rounded-md border bg-background px-2 py-1.5 text-sm">
          <option>انتخاب کالا</option>
        </select>
        <input className="rounded-md border bg-background px-2 py-1.5 text-sm" placeholder="شرح" />
        <input className="rounded-md border bg-background px-2 py-1.5 text-sm" type="number" placeholder="۰" />
        <select className="rounded-md border bg-background px-2 py-1.5 text-sm">
          <option>عدد</option>
          <option>کیلو</option>
        </select>
        <input className="rounded-md border bg-background px-2 py-1.5 text-sm" placeholder="۰" />
        <input className="rounded-md border bg-background px-2 py-1.5 text-sm" placeholder="۰" />
        <select className="rounded-md border bg-background px-2 py-1.5 text-sm">
          <option>بدون مالیات</option>
          <option>VAT ۹٪</option>
        </select>
      </div>
    </div>
  );
}
