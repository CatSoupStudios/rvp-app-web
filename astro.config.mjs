import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // ESTO ES LO CRUCIAL PARA EL SEO (Google necesita saber tu web real)
  site: 'https://www.rangelvalleypainting.com',

  integrations: [
    react(),
    sitemap() // Esto crea el archivo sitemap-0.xml automáticamente
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});