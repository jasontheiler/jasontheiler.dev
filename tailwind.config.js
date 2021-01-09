const { colors, fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  /*
   * Dark mode configuration
   * See: https://tailwindcss.com/docs/dark-mode
   */
  darkMode: "class",

  /*
   * Theme configuration
   * See: https://tailwindcss.com/docs/theme
   */
  theme: {
    extend: {
      colors,
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
        mono: ['"Cascadia Code"', ...fontFamily.mono],
      },
    },
  },

  /*
   * Variants configuration
   * See: https://tailwindcss.com/docs/configuring-variants
   */
  variants: {
    extend: {
      backgroundOpacity: ["dark"],
      outline: ["focus-visible"],
    },
  },

  /*
   * Plugins configuration
   * See:
   *   - https://tailwindcss.com/docs/plugins
   *   - https://tailwindcss.com/docs/typography-plugin
   */
  plugins: [require("@tailwindcss/typography")],

  /*
   * PurgeCSS configuration
   * See: https://tailwindcss.com/docs/optimizing-for-production
   */
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: [
      "components/**/*.vue",
      "layouts/**/*.vue",
      "pages/**/*.vue",
      "plugins/**/*.ts",
      "nuxt.config.ts",
    ],
  },
};
