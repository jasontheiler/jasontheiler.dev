<template>
  <ul class="w-full max-w-screen-lg mx-auto px-4">
    <li v-for="{ slug, title } in posts" :key="slug">
      <nuxt-link :to="`/posts/${slug}`">{{ title }}</nuxt-link>
    </li>
  </ul>
</template>

<script>
import { getPageHead } from "~/utils"

export default {
  async asyncData({ $content }) {
    const posts = await $content("posts").only(["slug", "title"]).fetch()

    return { posts }
  },

  head() {
    return getPageHead({
      instance: this,
      title: "Posts",
    })
  },
}
</script>
