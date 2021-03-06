import { defineNuxtConfig } from "@nuxtjs/composition-api";
import { $content } from "@nuxt/content";
import { getHighlighter } from "shiki";

import { fixUrl } from "./utils";

// Reads environment variables.
const { BASE_URL } = process.env;

const baseUrl = fixUrl(BASE_URL ?? "");

export default defineNuxtConfig({
  /*
   * Dir configuration
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-dir
   */
  dir: {
    static: "public",
  },

  /*
   * Target configuration
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-target
   */
  target: "static",

  /*
   * Generate configuration
   * See:
   *   - https://nuxtjs.org/guides/configuration-glossary/configuration-generate/
   *   - https://composition-api.nuxtjs.org/getting-started/setup#quick-start
   */
  generate: {
    interval: 2000,
  },

  /*
   * Public runtime configuration
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-runtime-config/
   */
  publicRuntimeConfig: {
    baseUrl,
  },

  /*
   * Page metadata
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-head/
   */
  head: {
    titleTemplate: (title) => `${title} | Jason Theiler`,
  },

  /*
   * Global CSS
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-css/
   */
  css: [
    "@fontsource/inter/latin.css",
    "@fontsource/cascadia-code/latin-ext.css",
  ],

  /*
   * Plugins to load before mounting the app
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-plugins/
   */
  plugins: [
    { src: "~/plugins/animejs.ts", mode: "client" },
    { src: "~/plugins/polyfills.ts", mode: "client" },
    { src: "~/plugins/vue-observe-visibility.ts", mode: "client" },
  ],

  /*
   * Auto import components
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-components/
   */
  components: true,

  /*
   * Build modules
   * See:
   *   - https://nuxtjs.org/guides/configuration-glossary/configuration-modules/
   *   - https://typescript.nuxtjs.org/
   *   - https://composition-api.nuxtjs.org/
   *   - https://tailwindcss.nuxtjs.org/
   *   - https://image.nuxtjs.org/
   */
  buildModules: [
    "@nuxt/typescript-build",
    "@nuxtjs/composition-api",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
  ],

  /*
   * Build configuration
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-build/
   */
  build: {
    postcss: {
      plugins: {
        "postcss-focus-visible": {},
      },
    },
  },

  /*
   * Tailwind CSS configuration
   * See: https://tailwindcss.nuxtjs.org/options
   */
  tailwindcss: {
    jit: true,
  },

  /*
   * Modules
   * See:
   *   - https://nuxtjs.org/guides/configuration-glossary/configuration-modules/
   *   - https://pwa.nuxtjs.org/
   *   - https://github.com/nuxt-community/robots-module/
   *   - https://github.com/nuxt-community/sitemap-module/
   *   - https://content.nuxtjs.org/
   */
  modules: [
    "@nuxtjs/pwa",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "@nuxt/content",
  ],

  /*
   * PWA configuration
   * See: https://pwa.nuxtjs.org/setup/#configuration
   */
  pwa: {
    manifest: {
      name: "Jason Theiler",
      short_name: "J. Theiler",
      description: "Work in progress!",
      background_color: "#8b5cf6",
    },

    meta: {
      name: "Jason Theiler",
      author: "Jason Theiler",
      description: "Work in progress!",
      ogHost: baseUrl,
      ogImage: "/image.png",
      twitterCard: "summary_large_image",
      theme_color: "#8b5cf6",
    },
  },

  /*
   * Sitemap configuration
   * See: https://github.com/nuxt-community/sitemap-module/#configuration
   */
  sitemap: {
    hostname: baseUrl,
    async routes() {
      const posts = await $content("posts").only(["slug"]).fetch();

      const getPostPath = (slug: string) => `/posts/${slug}`;

      return Array.isArray(posts)
        ? posts.map(({ slug }) => getPostPath(slug))
        : getPostPath(posts.slug);
    },
  },

  /*
   * Content configuration
   * See: https://content.nuxtjs.org/configuration/
   */
  content: {
    liveEdit: false,
    markdown: {
      async highlighter() {
        const highlighter = await getHighlighter({
          theme: "github-dark",
        });

        type ThematicBlock = {
          lineHighlights: string | null;
          fileName: string | null;
        };

        return (rawCode: string, lang: string, thematicBlock?: ThematicBlock) =>
          (thematicBlock?.fileName
            ? `<span class="file-name" style="color:${highlighter.getForegroundColor()};">${
                thematicBlock.fileName
              }</span>`
            : "") + highlighter.codeToHtml(rawCode, lang);
      },
    },
  },
});
