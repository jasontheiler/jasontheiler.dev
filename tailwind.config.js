/*
 * TailwindCSS configuration
 *
 * Docs: https://tailwindcss.com/docs/configuration/
 * Default: https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  // See: https://tailwindcss.com/docs/upcoming-changes/
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  // See: https://github.com/tailwindlabs/tailwindcss/pull/2279/
  experimental: {
    darkModeVariant: true,
  },
  dark: "class",
  theme: {},
  variants: {},
  plugins: [],
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: [
      "components/**/*.vue",
      "layouts/**/*.vue",
      "pages/**/*.vue",
      "plugins/**/*.{ts,js}",
      "nuxt.config.ts",
    ],
  },
}
