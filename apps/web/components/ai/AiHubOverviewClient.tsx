'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { SakhtarModuleAssistant, SakhtarModuleKpi } from '@repo/ui';
import { MessageSquare, Phone, Sparkles } from 'lucide-react';
import { AI_HUB_KPIS } from '../../lib/ai-hub-demo';
import { fetchAiHubOverview } from '../../lib/ai-hub-api';

export function AiHubOverviewClient() {
  const nf = new Intl.NumberFormat('fa-IR');
  const [kpis, setKpis] = useState(AI_HUB_KPIS);
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const data = await fetchAiHubOverview();
      if (cancelled) return;
      setKpis({
        openConversations: data.openConversations,
        inboxUnread: data.inboxUnread,
        callsToday: data.callsToday,
        channelsActive: data.channelsActive,
      });
      setSource(data.source);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <SakhtarModuleAssistant
        title="دستیار ساختار"
        description="خلاصه مکالمات، صف پیام و تماس‌های امروز — بدون دسترسی مستقیم به داده ERP بدون tenant."
        upsell="مدل اختصاصی و اتصال کانال‌های بیشتر در اشتراک سازمانی."
      />

      <section className="smh-kpi-grid">
        <SakhtarModuleKpi
          variant="primary"
          label="مکالمه باز"
          value={nf.format(kpis.openConversations)}
          sub="نیازمند پاسخ"
        />
        <SakhtarModuleKpi label="پیام نخوانده" value={nf.format(kpis.inboxUnread)} />
        <SakhtarModuleKpi label="تماس امروز" value={nf.format(kpis.callsToday)} />
        <SakhtarModuleKpi label="کانال فعال" value={nf.format(kpis.channelsActive)} />
      </section>
      {source ? <p className="text-[11px] text-muted-foreground">منبع داده: {source}</p> : null}

      <div className="grid gap-4 sm:grid-cols-3">
        <ShortcutCard
          icon={<Sparkles className="size-4" />}
          title="مکالمات AI"
          desc="تحلیل و پیشنهاد عملیاتی"
          href="/ai/conversations"
        />
        <ShortcutCard
          icon={<MessageSquare className="size-4" />}
          title="صندوق پیام"
          desc="ایمیل، پیامک و شبکه‌های اجتماعی"
          href="/messaging/inbox"
        />
        <ShortcutCard
          icon={<Phone className="size-4" />}
          title="VoIP"
          desc="شماره‌گیر و تاریخچه تماس"
          href="/voip/dialer"
        />
      </div>
    </div>
  );
}

function ShortcutCard({
  icon,
  title,
  desc,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <Card className="rounded-xl border shadow-sm">
      <CardHeader className="py-3">
        <CardTitle className="text-base flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground space-y-3">
        <p>{desc}</p>
        <Button variant="outline" size="sm" asChild>
          <Link href={href}>ورود</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
