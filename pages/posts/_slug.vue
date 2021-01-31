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
  @apply max-w-none text-gray-600 transition-colors duration-150;
}

.dark .prose {
  @apply text-gray-400;
}

.prose strong {
  @apply text-black transition-colors duration-150;
}

.dark .prose strong {
  @apply text-white;
}

.prose code {
  @apply text-black transition-colors duration-150;
}

.dark .prose code {
  @apply text-white;
}

.prose a,
.prose a strong,
.prose a code {
  @apply relative text-gray-700 no-underline transition-colors duration-150;
}

.prose a:hover,
.prose a:hover strong,
.prose a:hover code {
  @apply text-black;
}

.dark .prose a,
.dark .prose a strong,
.dark .prose a code {
  @apply text-gray-300;
}

.dark .prose a:hover,
.dark .prose a:hover strong,
.dark .prose a:hover code {
  @apply text-white;
}

.prose a::before {
  @apply absolute inset-x-1 -bottom-1.5 h-1  bg-indigo-200 transition-all duration-150;
  content: "";
}

.prose a:hover::before {
  @apply -inset-x-1 bg-indigo-500;
}

.dark .prose a::before {
  @apply bg-indigo-900;
}

.dark .prose a:hover::before {
  @apply bg-indigo-700;
}

.prose a::after {
  @apply absolute left-1/2 top-full z-10 px-4 py-2 transform-gpu -translate-x-1/2 opacity-0 invisible rounded-lg bg-gray-100 leading-4 text-sm text-gray-700 whitespace-nowrap shadow-sm transition duration-150;
  content: attr(href);
}

.prose a:hover::after {
  @apply translate-y-2 opacity-100 visible;
}

.dark .prose a::after {
  @apply bg-gray-1000 text-gray-300;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4 {
  @apply text-black transition-colors duration-150;
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
  @apply h-28 -mt-28 block invisible pointer-events-none;
  content: "";
}

.prose h1 > a:first-child::before,
.prose h2 > a:first-child::before,
.prose h3 > a:first-child::before,
.prose h4 > a:first-child::before,
.prose h5 > a:first-child::before,
.prose h6 > a:first-child::before {
  @apply static bg-transparent text-gray-400;
  content: "#";
  margin-right: 0.375em;
}

.prose h1 > a:first-child:hover::before,
.prose h2 > a:first-child:hover::before,
.prose h3 > a:first-child:hover::before,
.prose h4 > a:first-child:hover::before,
.prose h5 > a:first-child:hover::before,
.prose h6 > a:first-child:hover::before {
  @apply bg-transparent text-black;
}

.dark .prose h1 > a:first-child::before,
.dark .prose h2 > a:first-child::before,
.dark .prose h3 > a:first-child::before,
.dark .prose h4 > a:first-child::before,
.dark .prose h5 > a:first-child::before,
.dark .prose h6 > a:first-child::before {
  @apply text-gray-600;
}

.dark .prose h1 > a:first-child:hover::before,
.dark .prose h2 > a:first-child:hover::before,
.dark .prose h3 > a:first-child:hover::before,
.dark .prose h4 > a:first-child:hover::before,
.dark .prose h5 > a:first-child:hover::before,
.dark .prose h6 > a:first-child:hover::before {
  @apply bg-transparent text-white;
}

.prose h1 > a:first-child::after,
.prose h2 > a:first-child::after,
.prose h3 > a:first-child::after,
.prose h4 > a:first-child::after,
.prose h5 > a:first-child::after,
.prose h6 > a:first-child::after {
  @apply left-0 translate-x-0;
}

.prose ul li::before {
  @apply bg-gray-400 transition-colors duration-150;
}

.dark .prose ul li::before {
  @apply bg-gray-600;
}

.prose ol li::before {
  @apply text-gray-500;
}

.prose blockquote {
  @apply p-4 rounded-2xl border-none bg-gradient-to-br from-purple-500 to-indigo-500 font-normal not-italic text-white transition-colors duration-150;
  quotes: none;
}

.dark .prose blockquote {
  @apply from-purple-700 to-indigo-700;
}

.prose blockquote *:first-child {
  @apply mt-0;
}

.prose blockquote *:last-child {
  @apply mb-0;
}

.prose .code-block {
  @apply relative;
}

.prose .code-block .file-name {
  @apply absolute right-0 top-0 px-4 py-2 font-mono text-sm md:text-base text-gray-600;
}

.dark .prose .code-block .file-name {
  @apply text-gray-400;
}

.prose .code-block .file-name ~ * pre {
  @apply pt-8;
}

.prose .code-block pre {
  @apply rounded-2xl shadow-inner;
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
  @apply border-gray-300 transition-colors duration-150;
}

.dark .prose hr {
  @apply border-gray-800;
}

.prose table {
  @apply block overflow-x-auto;
}

.prose thead {
  @apply border-gray-300 text-black transition-colors duration-150;
}

.dark .prose thead {
  @apply border-gray-800  text-white;
}

.prose tbody tr {
  @apply border-gray-200 transition-colors duration-150;
}

.dark tbody tr {
  @apply border-gray-900;
}
</style>
