<template>
  <main
    v-if="posts"
    class="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8"
  >
    <ul>
      <li v-for="{ slug, title } in posts" :key="slug">
        <NuxtLink :to="{ name: 'posts-slug', params: { slug } }">{{
          title
        }}</NuxtLink>
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
import { Post } from "~/types";

export default defineComponent({
  head: {},

  setup() {
    useSeo({ title: "Posts" });

    const { $content } = useContext();

    const posts = useStatic(
      () =>
        $content("posts")
          .sortBy("createdAt", "asc")
          .only(["slug", "title"])
          .fetch<Post>(),
      ref("all"),
      "posts"
    );

    return {
      posts,
    };
  },
});
</script>
