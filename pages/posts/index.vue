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
import {
  defineComponent,
  ref,
  useContext,
  useStatic,
} from "@nuxtjs/composition-api";

import { useSeo } from "~/composables";

export default defineComponent({
  head: {},

  setup() {
    useSeo({ title: "Posts" });

    const { $content } = useContext();

    const posts = useStatic(
      () => $content("posts").only(["slug", "title"]).fetch(),
      ref("posts"),
      "posts"
    );

    return {
      posts,
    };
  },
});
</script>
