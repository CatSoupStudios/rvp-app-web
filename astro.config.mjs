import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  // Configuración de sitio para SEO
  site: 'https://www.rangelvalleypainting.com',

  // CAMBIO CLAVE: Para usar el adaptador de Vercel sin errores, 
  // cambiamos el output a 'server'.
  output: 'server',

  adapter: vercel(),

  integrations: [
    react(),
    sitemap()
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});