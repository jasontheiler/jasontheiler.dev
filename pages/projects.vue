<template>
  <main class="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8"></main>
</template>

<script>
import { getPageHead } from "~/utils";

export default {
  head() {
    return getPageHead({
      instance: this,
      title: "Projects",
    });
  },
};
</script>
