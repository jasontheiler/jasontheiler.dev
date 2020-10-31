<template>
  <article class="w-full max-w-screen-lg mx-auto px-4 prose overflow-hidden">
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

.prose strong {
  @apply text-black;
  @apply transition-colors;
  @apply duration-150;
}

.dark .prose strong {
  @apply text-white;
}

.prose code {
  @apply text-black;
  @apply transition-colors;
  @apply duration-150;
}

.dark .prose code {
  @apply text-white;
}

.prose a,
.prose a strong,
.prose a code {
  @apply text-indigo-600;
  @apply no-underline;
  @apply transition-colors;
  @apply duration-150;
}

.prose a:hover,
.prose a:hover strong,
.prose a:hover code {
  @apply text-black;
}

.dark .prose a,
.dark .prose a strong,
.dark .prose a code {
  @apply text-indigo-500;
}

.dark .prose a:hover,
.dark .prose a:hover strong,
.dark .prose a:hover code {
  @apply text-white;
}

.prose blockquote {
  @apply relative;
  @apply p-2;
  @apply pr-4;
  @apply pl-12;
  @apply rounded-r-md;
  @apply border-indigo-600;
  @apply bg-indigo-200;
  @apply bg-opacity-25;
  @apply font-normal;
  @apply text-gray-800;
  @apply transition-colors;
  @apply duration-150;
  quotes: none;
}

.dark .prose blockquote {
  @apply border-indigo-500;
  @apply bg-indigo-900;
  @apply bg-opacity-25;
  @apply text-gray-300;
}

.prose blockquote::before {
  content: "i";
  @apply absolute;
  @apply left-0;
  @apply inset-y-0;
  @apply w-12;
  @apply flex;
  @apply justify-center;
  @apply items-center;
  @apply font-bold;
  @apply not-italic;
  @apply text-2xl;
  @apply text-indigo-600;
  @apply transition-colors;
  @apply duration-150;
}

.dark .prose blockquote::before {
  @apply text-indigo-500;
}

.prose blockquote *:first-child {
  @apply mt-0;
}

.prose blockquote *:last-child {
  @apply mb-0;
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
  @apply h-16;
  @apply -mt-16;
  @apply block;
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
  margin-right: 0.375em;
}

.prose ul li::before {
  @apply bg-gray-700;
  @apply transition-colors;
  @apply duration-150;
}

.dark .prose ul li::before {
  @apply bg-gray-400;
}

.prose ol li::before {
  @apply text-gray-800;
  @apply transition-colors;
  @apply duration-150;
}

.dark .prose ol li::before {
  @apply text-gray-300;
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

.prose .code-block pre {
  @apply text-base;
}

.prose .code-block .light,
.dark .prose .code-block .dark {
  @apply block;
}

.prose .code-block .dark,
.dark .prose .code-block .light {
  @apply hidden;
}

.prose hr {
  @apply border-gray-300;
  @apply transition-colors;
  @apply duration-150;
}

.dark .prose hr {
  @apply border-gray-800;
}

.prose thead {
  @apply border-gray-300;
  @apply text-black;
  @apply transition-colors;
  @apply duration-150;
}

.dark .prose thead {
  @apply border-gray-800;
  @apply text-white;
}

.prose tbody tr {
  @apply border-gray-200;
  @apply transition-colors;
  @apply duration-150;
}

.dark tbody tr {
  @apply border-gray-900;
}
</style>
