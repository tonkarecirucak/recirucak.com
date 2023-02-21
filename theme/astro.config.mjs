import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import image from "@astrojs/image";
import lit from "@astrojs/lit";
import NetlifyCMS from "astro-netlify-cms";

// https://astro.build/config
export default defineConfig({
  site: 'https://recirucak.com',
  sitemap: true,
  integrations: [
    sitemap(), 
    mdx(), 
    image(), 
    lit(), 
    NetlifyCMS({
      config: {
        backend: {
          name: 'git-gateway',
          repo: 'tonkarecirucak/recirucak.com',
          branch: 'main',
        },
        collections: [],
      },
    }),
  ], // Add renderers to the config

  // This is for the astro-icon package. You can find more about the package here: https://www.npmjs.com/package/astro-icon
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
});