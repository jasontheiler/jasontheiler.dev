import type { NuxtConfig } from "@nuxt/types";
import { $content } from "@nuxt/content";
import { getHighlighter } from "shiki";

import { fixUrl } from "./utils";

// Reads environment variables.
const { BASE_URL } = process.env;

const baseUrl = fixUrl(BASE_URL ?? "");

const config: NuxtConfig = {
  /*
   * Target configuration
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-target/
   */
  target: "static",

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
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
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
   *   - https://color-mode.nuxtjs.org/
   *   - https://image.nuxtjs.org/
   */
  buildModules: [
    "@nuxt/typescript-build",
    "@nuxtjs/composition-api",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
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
   * Color mode configuration
   * See: https://color-mode.nuxtjs.org/#configuration
   */
  colorMode: {
    classSuffix: "",
  },

  /*
   * Modules
   * See:
   *   - https://nuxtjs.org/guides/configuration-glossary/configuration-modules/
   *   - https://content.nuxtjs.org/
   *   - https://pwa.nuxtjs.org/
   *   - https://github.com/nuxt-community/robots-module/
   *   - https://github.com/nuxt-community/sitemap-module/
   */
  modules: [
    "@nuxt/content",
    "@nuxtjs/pwa",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
  ],

  /*
   * Content configuration
   * See: https://content.nuxtjs.org/configuration/
   */
  content: {
    liveEdit: false,
    markdown: {
      async highlighter() {
        const lightHighlighter = await getHighlighter({
          theme: "github-light",
        });

        const darkHighlighter = await getHighlighter({
          theme: "github-dark",
        });

        interface ThematicBlock {
          lineHighlights: string | null;
          fileName: string | null;
        }

        return (rawCode: string, lang: string, thematicBlock?: ThematicBlock) =>
          `
          <div class="code-block">
            ${
              thematicBlock?.fileName
                ? `<span class="file-name">${thematicBlock.fileName}</span>`
                : ""
            }

            <div class="light">
              ${
                lightHighlighter.codeToHtml
                  ? lightHighlighter.codeToHtml(rawCode, lang)
                  : ""
              }
            </div>

            <div class="dark">
              ${
                darkHighlighter.codeToHtml
                  ? darkHighlighter.codeToHtml(rawCode, lang)
                  : ""
              }
            </div>
          </div>
          `;
      },
    },
  },

  /*
   * PWA configuration
   * See: https://pwa.nuxtjs.org/setup/#configuration
   */
  pwa: {
    manifest: {
      name: "Jason Theiler",
      short_name: "J. Theiler",
      description: "Work in progress!",
    },

    meta: {
      author: "Jason Theiler",
      description: "Work in progress!",
      ogSiteName: "Jason Theiler",
      ogTitle: "Jason Theiler",
      ogHost: baseUrl,
      ogImage: "/image.png",
      twitterCard: "summary_large_image",
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
};

export default config;
