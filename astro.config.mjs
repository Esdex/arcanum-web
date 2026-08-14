import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://arcanum.zip',
  integrations: [
    tailwind(),
    react(),
    // Quick Start is reachable at /docs/ and used to be generated at
    // /docs/getting-started/ as well. The old address now redirects, so keep it out
    // of the sitemap - listing a redirect is what tells Google the duplicate is still
    // a page worth indexing.
    sitemap({ filter: url => url !== 'https://arcanum.zip/docs/getting-started/' }),
  ],
  // Static build: Astro emits an HTML page with a meta refresh and a canonical link,
  // which Google follows as a move. Kept rather than deleted because the URL is
  // already indexed and may be linked from outside.
  redirects: {
    '/docs/getting-started': '/docs/',
  },
});
