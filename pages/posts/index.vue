<template>
  <main class="w-full max-w-screen-lg mx-auto px-4">
    <ul>
      <li v-for="{ slug, title } in posts" :key="slug">
        <NuxtLink :to="`/posts/${slug}`">{{ title }}</NuxtLink>
      </li>
    </ul>
  </main>
</template>

<script>
import { getPageHead } from "~/utils";

export default {
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
};
</script>
