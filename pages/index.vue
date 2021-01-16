<template>
  <main>
    <TheHeroSection />

    <section class="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <OptimizedImage image="kelp_forest.png" alt="Kelp Forest" />
    </section>
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
