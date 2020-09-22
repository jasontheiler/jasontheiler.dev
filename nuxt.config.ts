import { NuxtConfig } from "@nuxt/types"

const config: NuxtConfig = {
  /*
   * Nuxt target
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-target/
   */
  target: "static",

  /*
   * Nuxt source directory
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-srcdir/
   */
  srcDir: "src",

  /*
   * Headers of the page
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-head/
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
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-plugins/
   */
  plugins: [],

  /*
   * Auto import components
   * See: https://nuxtjs.org/guides/configuration-glossary/configuration-components/
   */
  components: true,

  /*
   * Nuxt.js dev-modules
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
   * Nuxt.js modules
   * See:
   *   - https://pwa.nuxtjs.org/
   *   - https://content.nuxtjs.org/
   */
  modules: ["@nuxtjs/pwa", "@nuxt/content"],

  /*
   * Build configuration
   * See: https://nuxtjs.org/api/configuration-build/
   */
  build: {},

  /*
   * Color mode configuration
   * See: https://color-mode.nuxtjs.org/#configuration
   */
  colorMode: {
    classSuffix: "",
  },

  /*
   * Content module configuration
   * See: https://content.nuxtjs.org/configuration/
   */
  content: {},

  /*
   * Optimized images configuration
   * See: https://marquez.co/docs/nuxt-optimized-images/configuration
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
