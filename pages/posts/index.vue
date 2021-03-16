<template>
  <main class="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
    <ul>
      <li v-for="{ slug, title } in posts" :key="slug">
        <NuxtLink :to="`/posts/${slug}`">{{ title }}</NuxtLink>
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

import { getPageHead } from "~/utils";

export default defineComponent({
  async asyncData({ $content }) {
    const posts = await $content("posts").only(["slug", "title"]).fetch();

    return { posts };
  },

  head() {
    return getPageHead({
      instance: this,
      title: "Posts",
    });
  },
});
</script>
