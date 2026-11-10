'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '../components/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="outline"
      size="sm"
      type="button"
      className="relative h-9 w-9 px-0"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="تغییر تم"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
