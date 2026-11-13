'use client';

import Link from 'next/link';
import { Button, Card, CardContent } from '@repo/ui';
import { Bot, Lock } from 'lucide-react';

export function WmsAssistantScreen() {
  return (
    <Card>
      <CardContent className="py-12 text-center space-y-3">
        <Bot className="size-10 mx-auto text-muted-foreground" />
        <p className="font-semibold flex items-center justify-center gap-2">
          دستیار انبار
          <Lock className="size-4 text-muted-foreground" />
        </p>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          در محیط نمایشی، تحلیل کم‌موجودی و پیشنهاد جابجایی غیرفعال است. انبار‌یار جداگانه نیز برای اشتراک کامل است.
        </p>
        <Button asChild variant="outline">
          <Link href="/ai/conversations">دستیار عمومی پلتفرم</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
