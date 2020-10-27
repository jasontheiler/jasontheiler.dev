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
  @apply text-indigo-600;
  @apply no-underline;
  @apply transition-colors;
  @apply duration-150;
}

.prose a:hover {
  @apply text-black;
}

.dark .prose a {
  @apply text-indigo-500;
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

.prose h1::before,
.prose h2::before,
.prose h3::before,
.prose h4::before,
.prose h5::before,
.prose h6::before {
  content: "";
  @apply block;
  @apply -mt-16;
  @apply h-16;
  @apply invisible;
  @apply pointer-events-none;
}

.prose h1 > a:first-child::before,
.prose h2 > a:first-child::before,
.prose h3 > a:first-child::before,
.prose h4 > a:first-child::before,
.prose h5 > a:first-child::before,
.prose h6 > a:first-child::before {
  content: "#";
  @apply mr-2;
}

.prose .code-block {
  @apply relative;
}

.prose .code-block .file-name {
  @apply absolute;
  @apply right-0;
  @apply top-0;
  @apply px-4;
  @apply py-2;
  @apply font-medium;
  @apply text-sm;
}

.prose .code-block .file-name ~ * pre {
  @apply pt-8;
}

.prose .code-block .light,
.dark .prose .code-block .dark {
  @apply block;
}

.prose .code-block .dark,
.dark .prose .code-block .light {
  @apply hidden;
}
</style>
