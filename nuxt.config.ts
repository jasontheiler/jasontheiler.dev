import { NuxtConfig } from "@nuxt/types"
import { $content } from "@nuxt/content"

const config: NuxtConfig = {
  /*
   * Nuxt target
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-target/
   */
  target: "static",

  /*
   * Nuxt runtime configuration
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-runtime-config/
   */
  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL,
  },

  /*
   * Headers of the page
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-head/
   */
  head: {
    titleTemplate: (title) =>
      title ? `${title} | Jason Theiler` : "Jason Theiler",
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  /*
   * Plugins to load before mounting the app
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-plugins/
   */
  plugins: [{ src: "~/plugins/vue-observe-visibility.ts", mode: "client" }],

  /*
   * Auto import components
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-components/
   */
  components: true,

  /*
   * Nuxt.js build modules
   * See:
   *   - https://typescript.nuxtjs.org/
   *   - https://tailwindcss.nuxtjs.org/
   *   - https://color-mode.nuxtjs.org/
   *   - https://marquez.co/docs/nuxt-optimized-images/
   */
  buildModules: [
    "@nuxt/typescript-build",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@aceforth/nuxt-optimized-images",
  ],

  /*
   * Color mode configuration
   * See: https://color-mode.nuxtjs.org/#configuration
   */
  colorMode: {
    classSuffix: "",
  },

  /*
   * Optimized images configuration
   * See: https://marquez.co/docs/nuxt-optimized-images/configuration/
   */
  optimizedImages: {
    optimizedImagesInDev: true,
  },

  /*
   * Nuxt.js modules
   * See:
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
  content: {},

  /*
   * PWA configuration
   * See: https://pwa.nuxtjs.org/setup/#configuration
   */
  pwa: {
    meta: {
      author: "Jason Theiler",
      description: "Work in progress!",
      ogSiteName: "Jason Theiler",
      ogTitle: "Jason Theiler",
      ogHost: process.env.BASE_URL,
      ogImage: "/image.png",
      twitterCard: "summary_large_image",
    },

    manifest: {
      name: "Jason Theiler",
      short_name: "J. Theiler",
      description: "Work in progress!",
    },
  },

  /*
   * Sitemap configuration
   * See: https://github.com/nuxt-community/sitemap-module/#configuration
   */
  sitemap: {
    hostname: process.env.BASE_URL,
    async routes() {
      const posts = await $content("posts").only(["path"]).fetch()

      return Array.isArray(posts) ? posts.map((post) => post.path) : posts.path
    },
  },
}

export default config
