import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/loongarch-software-center',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
