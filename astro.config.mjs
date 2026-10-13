// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: cambiar por el dominio definitivo cuando se compre (etapa 8).
// Se usa para las URL canónicas, Open Graph y el sitemap, así que debe ser
// la dirección pública real. Se puede sobrescribir con la variable SITE_URL.
const SITE_URL = process.env.SITE_URL ?? 'https://servimopar.pages.dev';

export default defineConfig({
  site: SITE_URL,
  // URLs tipo /repuestos/soporte-motor-dodge-journey/ (con barra final, siempre igual).
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // Las páginas de ejemplo nunca deben llegar al sitemap.
      filter: (page) => !page.includes('/ejemplo-'),
    }),
  ],
});
