const Color = require("color")

module.exports = () => ({ addUtilities, e, theme, variants }) => {
  const shadow = theme("boxShadowOutline.shadow") || "0 0 0 3px"
  const colors = theme("boxShadowOutline.colors") || theme("colors")

  const getBoxShadowOutlines = (colors, prevKeys = []) =>
    Object.entries(colors).reduce((acc, [key, value]) => {
      const keys = [...prevKeys, key]

      let newBoxShadowOutlines = {}

      if (typeof value === "object")
        newBoxShadowOutlines = getBoxShadowOutlines(value, keys)

      if (typeof value === "string") {
        const css = { boxShadow: `${shadow} ${value}` }

        if (
          !(
            value === "transparent" ||
            value === "currentColor" ||
            value.match(/^var\(.+?\)$/)
          )
        ) {
          const { r, g, b } = Color(value).object()

          css["--shadow-outline-opacity"] = "0.5"
          css[
            "box-shadow"
          ] = `${shadow} rgba(${r}, ${g}, ${b}, var(--shadow-outline-opacity))`
        }

        newBoxShadowOutlines[`.${e(`shadow-outline-${keys.join("-")}`)}`] = css
      }

      return { ...acc, ...newBoxShadowOutlines }
    }, {})

  addUtilities(
    getBoxShadowOutlines(colors),
    variants("boxShadowOutline") || ["responsive", "hover", "focus"]
  )

  const opacities = theme("boxShadowOutlineOpacity") || theme("opacity")

  const getBoxShadowOutlineOpacities = (opacities) =>
    Object.entries(opacities).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [`.${e(`shadow-outline-opacity-${key}`)}`]: {
          "--shadow-outline-opacity": `${value}`,
        },
      }),
      {}
    )

  addUtilities(
    getBoxShadowOutlineOpacities(opacities),
    variants("boxShadowOutlineOpacity") || ["responsive", "hover", "focus"]
  )
}
