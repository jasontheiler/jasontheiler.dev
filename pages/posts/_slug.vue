<template>
  <main class="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 lg:flex">
    <article class="lg:w-3/4">
      <h1
        class="mb-8 font-serif font-bold text-7xl md:text-8xl text-gray-900 dark:text-white transition-colors duration-150"
      >
        {{ post.title }}
      </h1>

      <p class="mb-16 font-medium text-xl md:text-2xl">
        {{ post.description }}
      </p>

      <OptimizedImage :image="post.image" :alt="post.title" class="mb-16" />

      <NuxtContent :document="post" class="prose md:prose-lg overflow-hidden" />
    </article>

    <ThePostToC :toc="post.toc" />
  </main>
</template>

<script>
import { getPageHead } from "~/utils";
import PostBlockquote from "~/components/PostBlockquote";

export default {
  components: {
    PostBlockquote,
  },

  async asyncData({ $content, params }) {
    const post = await $content("posts", params.slug).fetch();
    const [prevPost, nextPost] = await $content("posts")
      .surround(params.slug)
      .sortBy("createdAt", "asc")
      .only(["slug", "title"])
      .fetch();

    return {
      post,
      prevPost,
      nextPost,
    };
  },

  head() {
    const { title, description, image } = this.post;

    return getPageHead({
      instance: this,
      title,
      description,
      image: require(`~/assets/images/${image}`),
    });
  },
};
</script>

<style>
.prose {
  @apply max-w-none;
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
  @apply relative;
  @apply text-indigo-1000;
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
  @apply text-indigo-100;
}

.dark .prose a:hover,
.dark .prose a:hover strong,
.dark .prose a:hover code {
  @apply text-white;
}

.prose a::before {
  @apply absolute;
  @apply inset-x-0;
  @apply bottom-0;
  @apply h-1;
  @apply transform-gpu;
  @apply bg-indigo-200;
  @apply transition-all;
  @apply duration-150;
  content: "";
  z-index: -1;
}

.prose a:hover::before {
  @apply translate-y-1;
  @apply bg-indigo-500;
}

.dark .prose a::before {
  @apply bg-indigo-900;
}

.dark .prose a:hover::before {
  @apply bg-indigo-600;
}

.prose a::after {
  @apply absolute;
  @apply left-1/2;
  @apply top-full;
  @apply px-4;
  @apply py-2;
  @apply transform-gpu;
  @apply -translate-x-1/2;
  @apply opacity-0;
  @apply invisible;
  @apply rounded-lg;
  @apply bg-gray-100;
  @apply leading-4;
  @apply text-sm;
  @apply text-gray-700;
  @apply shadow-sm;
  @apply transition;
  @apply duration-150;
  content: attr(href);
  z-index: 1;
}

.prose a:hover::after {
  @apply translate-y-2;
  @apply opacity-100;
  @apply visible;
}

.dark .prose a::after {
  @apply bg-gray-1000;
  @apply text-gray-400;
}

.prose blockquote {
  @apply p-4;
  @apply rounded-2xl;
  @apply border-none;
  @apply bg-gradient-to-br;
  @apply from-purple-500;
  @apply to-indigo-500;
  @apply font-normal;
  @apply not-italic;
  @apply text-white;
  @apply transition-colors;
  @apply duration-150;
  quotes: none;
}

.dark .prose blockquote {
  @apply from-purple-600;
  @apply to-indigo-600;
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
  @apply h-28;
  @apply -mt-28;
  @apply block;
  @apply invisible;
  @apply pointer-events-none;
  content: "";
}

.prose h1 > a:first-child::before,
.prose h2 > a:first-child::before,
.prose h3 > a:first-child::before,
.prose h4 > a:first-child::before,
.prose h5 > a:first-child::before,
.prose h6 > a:first-child::before {
  @apply static;
  content: "#";
  margin-right: 0.375em;
}

.prose ul li::before {
  @apply bg-gray-400;
  @apply transition-colors;
  @apply duration-150;
}

.dark .prose ul li::before {
  @apply bg-gray-700;
}

.prose ol li::before {
  @apply transition-colors;
  @apply duration-150;
  @apply text-gray-500;
}

.dark .prose ol li::before {
  @apply text-gray-600;
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
  @apply font-mono;
  @apply font-medium;
  @apply text-sm;
}

.prose .code-block .file-name ~ * pre {
  @apply pt-8;
}

.prose .code-block pre {
  @apply rounded-2xl;
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
