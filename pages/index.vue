<template>
  <main>
    <TheHeroSection />

    <section class="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <NuxtPicture
        src="/images/kelp_forest.png"
        alt="Kelp Forest"
        loading="lazy"
      />
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

import { getPageHead } from "~/utils";

export default defineComponent({
  head() {
    return getPageHead({
      instance: this,
      title: "Home",
    });
  },
});
</script>
