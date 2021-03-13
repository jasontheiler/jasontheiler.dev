const { fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

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
      colors: {
        ...colors,
        trueGray: {
          ...colors.trueGray,
          1000: "#121212",
          1100: "#0C0C0C",
          1200: "#060606",
        },
      },
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
      translate: ["dark"],
      borderOpacity: ["dark"],
      backgroundOpacity: ["dark"],
      backgroundImage: ["dark"],
      outline: ["focus-visible"],
      ringWidth: ["focus-visible"],
      ringColor: ["focus-visible"],
      ringOffsetWidth: ["focus-visible"],
      ringOffsetColor: ["focus-visible"],
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
      "./components/**/*.vue",
      "./content/**/*.md",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.ts",
      "./nuxt.config.ts",
    ],
  },
};
