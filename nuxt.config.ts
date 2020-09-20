import { NuxtConfig } from "@nuxt/types"

const config: NuxtConfig = {
  /*
   * Nuxt rendering mode
   * See: https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",

  /*
   * Nuxt target
   * See: https://nuxtjs.org/api/configuration-target
   */
  target: "static",

  /*
   * Nuxt source directory
   * See: https://nuxtjs.org/api/configuration-srcdir
   */
  srcDir: "src",

  /*
   * Headers of the page
   * See: https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: (title) =>
      title ? `${title} | Jason Theiler` : "Jason Theiler",
    meta: [
      { charset: "utf-8" },
      {
        hid: "viewport",
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: "description",
        name: "description",
        content: "Work in progress!",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  /*
   * Global CSS
   */
  css: [],

  /*
   * Plugins to load before mounting the app
   * See: https://nuxtjs.org/guide/plugins
   */
  plugins: [],

  /*
   * Auto import components
   * See: https://nuxtjs.org/api/configuration-components
   */
  components: true,

  /*
   * Nuxt.js dev-modules
   * See:
   *   - https://typescript.nuxtjs.org/
   *   - https://tailwindcss.nuxtjs.org/
   *   - https://marquez.co/docs/nuxt-optimized-images/
   */
  buildModules: [
    "@nuxt/typescript-build",
    "@nuxtjs/tailwindcss",
    "@aceforth/nuxt-optimized-images",
  ],

  /*
   * Nuxt.js modules
   * See:
   *   - https://pwa.nuxtjs.org/
   *   - https://content.nuxtjs.org/
   */
  modules: ["@nuxtjs/pwa", "@nuxt/content"],

  /*
   * Content module configuration
   * See: https://content.nuxtjs.org/configuration
   */
  content: {},

  /*
   * Build configuration
   * See: https://nuxtjs.org/api/configuration-build/
   */
  build: {},

  /*
   * Optimized images configuration
   */
  optimizedImages: {
    optimizedImagesInDev: true,
    defaultImageLoader: "responsive-loader",
    responsive: {
      adapter: require("responsive-loader/sharp"),
      sizes: [3840, 2560, 1920, 960, 640],
      placeholder: true,
      placeholderSize: 16,
    },
  },
}

export default config
