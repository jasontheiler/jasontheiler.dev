const { fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  /*
   * Dark mode configuration
   * See: https://tailwindcss.com/docs/dark-mode
   */
  darkMode: "class",

  /*
   * Plugins configuration
   * See:
   *   - https://tailwindcss.com/docs/plugins
   *   - https://tailwindcss.com/docs/typography-plugin
   */
  plugins: [require("@tailwindcss/typography")],

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
};
