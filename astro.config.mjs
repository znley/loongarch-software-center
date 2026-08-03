import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const base = process.env.BASE_PATH || '/';

export default defineConfig({
  base,
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
