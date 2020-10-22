<template>
  <div class="w-full h-screen flex justify-center items-center">
    <div class="w-full max-w-screen-md">
      <OptimizedImage image="kelp_forest.png" alt="Kelp Forest" />
    </div>
  </div>
</template>

<script>
import { getPageHead } from "~/utils"

export default {
  head() {
    return getPageHead({
      instance: this,
      title: null,
    })
  },
}
</script>
