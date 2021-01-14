<template>
  <main
    class="w-full max-w-screen-xl mx-auto px-4 flex justify-center items-center"
  >
    <div class="w-full">
      <OptimizedImage image="kelp_forest.png" alt="Kelp Forest" />
    </div>
  </main>
</template>

<script>
import { getPageHead } from "~/utils";

export default {
  head() {
    return getPageHead({
      instance: this,
      title: "Home",
    });
  },
};
</script>
