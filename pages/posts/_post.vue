<template>
  <article class="w-full max-w-screen-lg mx-auto px-4">
    <nuxt-content :document="post" />
  </article>
</template>

<script>
import { getPageHead } from "~/utils"

export default {
  async asyncData({ $content, params }) {
    const post = await $content("posts", params.post).fetch()

    return { post }
  },

  head() {
    const { title, description, image } = this.post

    return getPageHead({
      instance: this,
      title,
      description,
      image: require(`~/assets/images/${image}`),
    })
  },
}
</script>
