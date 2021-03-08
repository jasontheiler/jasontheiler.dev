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
        blueGray: {
          ...colors.blueGray,
          1000: "#0B111F",
          1100: "#070B15",
          1200: "#03050A",
        },
        coolGray: {
          ...colors.coolGray,
          1000: "#0D121E",
          1100: "#080C14",
          1200: "#04060A",
        },
        gray: {
          ...colors.gray,
          1000: "#121215",
          1100: "#0C0C0E",
          1200: "#060607",
        },
        trueGray: {
          ...colors.trueGray,
          1000: "#121212",
          1100: "#0C0C0C",
          1200: "#060606",
        },
        warmGray: {
          ...colors.warmGray,
          1000: "#151211",
          1100: "#0E0C0B",
          1200: "#070706",
        },
        red: {
          ...colors.red,
          1000: "#601515",
          1100: "#400E0E",
          1200: "#200707",
        },
        orange: {
          ...colors.orange,
          1000: "#5D210D",
          1100: "#3E1609",
          1200: "#1F0B04",
        },
        amber: {
          ...colors.amber,
          1000: "#5A280B",
          1100: "#3C1A07",
          1200: "#1E0D03",
        },
        yellow: {
          ...colors.yellow,
          1000: "#56300D",
          1100: "#391F09",
          1200: "#1D1004",
        },
        lime: {
          ...colors.lime,
          1000: "#293F0F",
          1100: "#1B2A0A",
          1200: "#0E1605",
        },
        green: {
          ...colors.green,
          1000: "#0F3F22",
          1100: "#0A2A16",
          1200: "#05150B",
        },
        emerald: {
          ...colors.emerald,
          1000: "#043B2C",
          1100: "#03271E",
          1200: "#01130E",
        },
        teal: {
          ...colors.teal,
          1000: "#0E3B38",
          1100: "#092826",
          1200: "#041312",
        },
        cyan: {
          ...colors.cyan,
          1000: "#103B4B",
          1100: "#0B2732",
          1200: "#051318",
        },
        lightBlue: {
          ...colors.lightBlue,
          1000: "#093853",
          1100: "#062537",
          1200: "#03121C",
        },
        blue: {
          ...colors.blue,
          1000: "#162B68",
          1100: "#0F1D45",
          1200: "#070E23",
        },
        indigo: {
          ...colors.indigo,
          1000: "#252261",
          1100: "#181741",
          1200: "#0C0B21",
        },
        violet: {
          ...colors.violet,
          1000: "#391570",
          1100: "#260E4B",
          1200: "#130726",
        },
        purple: {
          ...colors.purple,
          1000: "#421566",
          1100: "#2C0E44",
          1200: "#160722",
        },
        fuchsia: {
          ...colors.fuchsia,
          1000: "#511254",
          1100: "#380D3B",
          1200: "#1C061E",
        },
        pink: {
          ...colors.pink,
          1000: "#621232",
          1100: "#410B21",
          1200: "#210611",
        },
        rose: {
          ...colors.rose,
          1000: "#660E29",
          1100: "#44091B",
          1200: "#22040D",
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
      gradientColorStops: ["group-hover"],
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
