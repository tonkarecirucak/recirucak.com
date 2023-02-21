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
    NetlifyCMS({
      config: {
        backend: {
          name: 'git-gateway',
          repo: 'tonkarecirucak/recirucak.com',
          branch: 'main',
        },
        collections: [
          {
            name: 'posts',
            label: 'Posts',
            label_singular: 'Post',
            folder: 'theme/src/pages/blog/posts',
            extension: 'mdx',
            create: true,
            delete: true,
            fields: [
              { name: 'title', widget: 'string', label: 'Post Title' },
              { name: 'description', widget: 'string', label: 'Description', required: false },
              {
                name: 'publishDate',
                widget: 'datetime',
                format: 'YYYY-MM-DDTHH:mm:ssZ',
                date_format: 'DD MMM YYYY',
                time_format: false,
                label: 'Publish Date',
              },
              { name: 'featuredImage', widget: 'image', choose_url: true, label: 'Featured Image', default: false },
              { name: 'excerpt', widget: 'string', label: 'Excerpt', required: false },
              { name: 'tags', widget: 'list', label: 'Tags', default: false },
              {
                name: 'layout',
                widget: 'hidden',
                default: '../../../layouts/Post.astro',
              },
            ],
        },
        ],
      },
    }),
    sitemap(), 
    mdx(), 
    image(), 
    lit(), 
  ], // Add renderers to the config

  // This is for the astro-icon package. You can find more about the package here: https://www.npmjs.com/package/astro-icon
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
});