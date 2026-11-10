import type { Config } from 'tailwindcss';
import preset from '../../packages/ui/tailwind.config';

const config: Config = {
  presets: [preset],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
    './node_modules/@tremor/**/*.{js,ts,tsx}',
  ],
};

export default config;
