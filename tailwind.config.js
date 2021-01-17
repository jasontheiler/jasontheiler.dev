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
    colors,
    extend: {
      colors: {
        blueGray: { 1000: "#070B15" },
        coolGray: { 1000: "#080C14" },
        gray: { 1000: "#0C0C0E" },
        trueGray: { 1000: "#0B0B0B" },
        warmGray: { 1000: "#0E0C0B" },
        red: { 1000: "#3F0E0E" },
        orange: { 1000: "#3E1609" },
        amber: { 1000: "#3C1A07" },
        yellow: { 1000: "#381F08" },
        lime: { 1000: "#1A2909" },
        green: { 1000: "#092916" },
        emerald: { 1000: "#03271E" },
        teal: { 1000: "#092725" },
        cyan: { 1000: "#0B2732" },
        lightBlue: { 1000: "#062537" },
        blue: { 1000: "#0F1D46" },
        indigo: { 1000: "#181741" },
        violet: { 1000: "#260E4B" },
        purple: { 1000: "#2C0E43" },
        fuchsia: { 1000: "#380D3B" },
        pink: { 1000: "#410B21" },
        rose: { 1000: "#44091B" },
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
        serif: ["Neuton", ...fontFamily.serif],
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
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.ts",
      "./nuxt.config.ts",
    ],
  },
};
