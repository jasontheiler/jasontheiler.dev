<template>
  <main></main>
</template>

<script>
import { getPageHead } from "~/utils"

export default {
  head() {
    return getPageHead({
      instance: this,
      title: "Projects",
    })
  },
}
</script>
