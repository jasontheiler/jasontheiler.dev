<template>
  <article class="w-full max-w-screen-lg mx-auto px-4 prose">
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
.prose {
  @apply text-gray-600;
  @apply transition-colors;
  @apply duration-150;
}

.dark .prose {
  @apply text-gray-500;
}

.prose a {
  @apply text-green-400;
  @apply no-underline;
  @apply transition-colors;
  @apply duration-150;
}

.prose a:hover {
  @apply text-black;
}

.dark .prose a:hover {
  @apply text-white;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4 {
  @apply text-black;
  @apply transition-colors;
  @apply duration-150;
}

.dark .prose h1,
.dark .prose h2,
.dark .prose h3,
.dark .prose h4 {
  @apply text-white;
}

.prose h1:before,
.prose h2:before,
.prose h3:before,
.prose h4:before,
.prose h5:before,
.prose h6:before {
  content: "";
  @apply block;
  @apply -mt-16;
  @apply h-16;
  @apply invisible;
  @apply pointer-events-none;
}

.prose h1 > a:before,
.prose h2 > a:before,
.prose h3 > a:before,
.prose h4 > a:before,
.prose h5 > a:before,
.prose h6 > a:before {
  content: "#";
  @apply mr-2;
}

.prose .light,
.prose .dark {
  @apply relative;
}

.dark .prose .dark {
  @apply block;
}

.prose .dark,
.dark .prose .light {
  @apply hidden;
}

.prose .filename {
  @apply absolute;
  @apply right-0;
  @apply top-0;
  @apply px-4;
  @apply py-2;
  @apply font-medium;
  @apply text-sm;
}

.prose .filename ~ pre {
  @apply pt-8;
}
</style>
