import { Badge, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';

type Severity = 'شدید' | 'متوسط' | 'پایدار';

type RiskCard = {
  severity: Severity;
  tag: string;
  title: string;
  body: string;
  trend: string;
  source: string;
  suggestion: string;
};

const RISK_CARDS: RiskCard[] = [
  {
    severity: 'شدید',
    tag: 'FIN',
    title: 'فشار نقدینگی',
    body: 'جریان نقد ورودی نسبت به تعهدات کوتاه‌مدت در ۳۰ روز آینده شکاف نشان می‌دهد. شواهد متمرکز روی تأخیر دریافت‌های بزرگ و افزایش پرداخت‌های سررسیدی است.',
    trend: 'رو به وخامت ▴',
    source: 'مالی · دریافت',
    suggestion: 'قرارداد دریافت ۳ مشتری بزرگ',
  },
  {
    severity: 'شدید',
    tag: 'AR',
    title: 'افزایش مطالبات معوق',
    body: 'سهم مطالبات بالای ۹۰ روز در یک دوره به ۱۸٪ رسیده. تمرکز روی چند مشتری مشخص است — نیازمند توجه مدیریت.',
    trend: 'رو به افزایش ▴',
    source: 'دریافت · فروش',
    suggestion: 'لیست بدهکاران بالای ۹۰ روز',
  },
  {
    severity: 'متوسط',
    tag: 'SALES',
    title: 'افت فروش متمرکز',
    body: 'کاهش فروش در یک منطقه و گروه محصول خاص؛ الگو شبیه قطع سفارش‌های دوره‌ای چند مشتری است.',
    trend: 'منفی · متمرکز ▴',
    source: 'فروش · سفارش',
    suggestion: 'عملکرد ویزیتورهای منطقه ۳',
  },
  {
    severity: 'متوسط',
    tag: 'INV',
    title: 'موجودی کم‌گردش',
    body: '۱۲ قلم کالا با گردش زیر آستانه؛ سرمایه راکد و ریسک منسوخی قابل ملاحظه.',
    trend: 'پایدار —',
    source: 'انبار · تدارکات',
    suggestion: 'گزارش گردش انبار ۱۸۰ روز',
  },
  {
    severity: 'متوسط',
    tag: 'ORD',
    title: 'تأخیر سفارش‌های باز',
    body: '۱۱ سفارش از سررسید تحویل عبور کرده‌اند؛ منشأ تأمین قطعه و حمل میدانی است.',
    trend: 'افزایشی ▴',
    source: 'سفارش · پخش',
    suggestion: 'مسیر تأمین قطعه گروه B',
  },
  {
    severity: 'پایدار',
    tag: 'HR',
    title: 'کاهش فعالیت تیم',
    body: 'تعداد بازدید روزانه ویزیتورها در منطقه ۳ کاهش نشان می‌دهد؛ نشانه عملیاتی، نه قضاوت فردی.',
    trend: 'کاهشی · ملایم ▾',
    source: 'پخش · CRM',
    suggestion: 'گزارش بازدید منطقه‌ای هفتگی',
  },
];

const severityVariant: Record<Severity, 'warning' | 'default' | 'success'> = {
  شدید: 'warning',
  متوسط: 'default',
  پایدار: 'success',
};

export function RiskRadarBoard() {
  const counts = { شدید: 0, متوسط: 0, پایدار: 0 };
  for (const c of RISK_CARDS) counts[c.severity]++;

  return (
    <section className="space-y-4">
      <Box className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span>سطح شدت:</span>
        <Badge variant="warning">شدید · {counts['شدید']}</Badge>
        <Badge variant="default">متوسط · {counts['متوسط']}</Badge>
        <Badge variant="success">پایدار · {counts['پایدار']}</Badge>
      </Box>
      <Box className="grid gap-4 lg:grid-cols-2">
        {RISK_CARDS.map((c) => (
          <Card key={c.title} className="border-border/80">
            <CardHeader className="space-y-3 pb-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={severityVariant[c.severity]}>{c.severity}</Badge>
                <Badge variant="outline">{c.tag}</Badge>
              </div>
              <CardTitle className="text-lg">{c.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="leading-relaxed text-muted-foreground">{c.body}</p>
              <dl className="grid gap-2 sm:grid-cols-2">
                <Box>
                  <dt className="text-xs text-muted-foreground">روند</dt>
                  <dd className="font-medium">{c.trend}</dd>
                </Box>
                <Box>
                  <dt className="text-xs text-muted-foreground">منبع</dt>
                  <dd className="font-medium">{c.source}</dd>
                </Box>
              </dl>
              <p className="rounded-lg bg-muted/60 px-3 py-2 text-xs">
                <span className="font-semibold text-foreground">پیشنهاد بررسی: </span>
                {c.suggestion}
              </p>
            </CardContent>
          </Card>
        ))}
      </Box>
    </section>
  );
}

function Box(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={props.className}>{props.children}</div>;
}
