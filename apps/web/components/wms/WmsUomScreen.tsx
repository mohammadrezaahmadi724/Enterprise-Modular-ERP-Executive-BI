'use client';

import { Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { Cog, Layers, Plus } from 'lucide-react';

export function WmsUomScreen() {
  return (
    <div className="flex flex-col gap-4">
      <Card className="finance-aging-card overflow-hidden p-0">
        <CardHeader className="flex flex-row items-center justify-between border-b py-3">
          <div className="flex items-center gap-2">
            <Layers className="size-4 text-violet-600" />
            <div>
              <CardTitle className="text-base">ضرایب تبدیل واحد</CardTitle>
              <p className="text-xs text-muted-foreground">۰ ضریب</p>
            </div>
          </div>
          <Button className="bg-rose-700 hover:bg-rose-800" size="sm">
            <Plus className="size-4 ml-1" />
            ثبت ضریب تبدیل
          </Button>
        </CardHeader>
        <CardContent className="py-16 text-center text-muted-foreground">
          <Layers className="size-10 mx-auto opacity-30 mb-2" />
          <p className="font-medium text-foreground">ضریب تبدیلی ثبت نشده است</p>
          <p className="text-sm">ضریبی با این فیلتر وجود ندارد</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row gap-2 border-b py-3">
          <Cog className="size-4 text-violet-600 mt-0.5" />
          <div>
            <CardTitle className="text-base">آزمونگر تبدیل به واحد پایه</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              مقدار یک کالا را با ضرایب ثبت‌شده به واحد پایه تبدیل می‌کند؛ محاسبه دقیق و کسری است.
            </p>
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3 py-4 text-sm">
          <label className="text-xs flex flex-col gap-1">
            کالا *
            <select className="rounded-md border px-3 py-2">
              <option>انتخاب کالا…</option>
            </select>
          </label>
          <label className="text-xs flex flex-col gap-1">
            واحد ورودی *
            <select className="rounded-md border px-3 py-2">
              <option>انتخاب واحد…</option>
            </select>
          </label>
          <label className="text-xs flex flex-col gap-1">
            مقدار *
            <input type="number" defaultValue={1} className="rounded-md border px-3 py-2" />
          </label>
          <Button className="sm:col-start-1 w-fit mt-2" variant="outline">
            محاسبه مقدار پایه
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
