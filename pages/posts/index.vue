<template>
  <ul class="w-full max-w-screen-lg mx-auto px-4">
    <li v-for="{ path, title } in posts" :key="path">
      <nuxt-link :to="path">{{ title }}</nuxt-link>
    </li>
  </ul>
</template>

<script>
import { getPageHead } from "~/utils"

export default {
  async asyncData({ $content }) {
    const posts = await $content("posts").only(["path", "title"]).fetch()

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
