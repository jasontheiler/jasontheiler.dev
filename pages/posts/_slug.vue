<template>
  <article class="w-full max-w-screen-lg mx-auto px-4">
    <nuxt-content :document="post" />
  </article>
</template>

<script>
import { getPageHead } from "~/utils"

export default {
  async asyncData({ $content, params }) {
    const post = await $content("posts", params.slug).fetch()
    const [prevPost, nextPost] = await $content("posts")
      .only(["slug", "title"])
      .sortBy("createdAt", "asc")
      .surround(params.slug)
      .fetch()

    return {
      post,
      prevPost,
      nextPost,
    }
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

<style>
.nuxt-content .nuxt-content-highlight {
  @apply relative;
}

.nuxt-content .nuxt-content-highlight .filename {
  @apply absolute;
  @apply right-0;
  @apply top-0;
  @apply px-2;
  @apply py-1;
  @apply font-medium;
  @apply text-sm;
}

.dark .nuxt-content .nuxt-content-highlight .light {
  @apply hidden;
}

.nuxt-content .nuxt-content-highlight .dark {
  @apply hidden;
}

.dark .nuxt-content .nuxt-content-highlight .dark {
  @apply block;
}
</style>
