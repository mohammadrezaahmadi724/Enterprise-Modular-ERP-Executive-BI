'use client';

import { motion } from 'framer-motion';
import { BrowserMockup } from './BrowserMockup';

export function AnimatedScreenshot() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.28 }}
    >
      <BrowserMockup>
        <div className="grid grid-cols-3 gap-2 text-right" dir="rtl">
          {['فروش', 'نقد', 'ریسک'].map((k) => (
            <p key={k} className="rounded bg-slate-800 p-2 text-xs">
              {k}: {new Intl.NumberFormat('fa-IR').format(k === 'فروش' ? 420 : k === 'نقد' ? 310 : 88)}
            </p>
          ))}
        </div>
      </BrowserMockup>
    </motion.div>
  );
}
