const { fontFamily } = require("tailwindcss/defaultTheme")

/*
 * Tailwind CSS configuration
 *
 * Docs: https://tailwindcss.com/docs/configuration/
 * Default: https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  // See: https://tailwindcss.com/docs/upcoming-changes/
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  // See: https://github.com/tailwindlabs/tailwindcss/pull/2279/
  experimental: {
    darkModeVariant: true,
  },
  dark: "class",
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#f5f5f5",
          200: "#eeeeee",
          300: "#e0e0e0",
          400: "#bdbdbd",
          500: "#9e9e9e",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#212121",
        },
      },

      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
        mono: ['"Cascadia Code"', ...fontFamily.mono],
      },
    },
  },
  variants: {
    backgroundOpacity: ["responsive", "hover", "focus", "dark"],
    outline: ["responsive", "focus", "focus-visible"],
    boxShadowOutline: ["responsive", "hover", "focus", "focus-visible"],
    boxShadowOutlineOpacity: ["responsive", "hover", "focus", "focus-visible"],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-box-shadow-outline-extended"),
  ],
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
}
