<template>
  <main
    v-if="post"
    class="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 lg:flex"
  >
    <article class="lg:w-3/4">
      <h1
        class="mb-8 font-bold text-6xl sm:text-7xl text-trueGray-900 dark:text-white"
      >
        {{ post.title }}
      </h1>

      <p class="mb-16 font-medium text-xl sm:text-2xl">
        {{ post.description }}
      </p>

      <NuxtPicture
        :src="post.image"
        :alt="post.title"
        loading="lazy"
        class="mb-16 block"
      />

      <NuxtContent :document="post" class="prose sm:prose-lg" />

      <div
        v-if="adjacentPosts"
        class="w-full mt-16 border-t border-trueGray-300 dark:border-trueGray-800 grid grid-cols-1 sm:grid-cols-2 gap-x-8"
      >
        <div class="order-1 sm:order-0 flex">
          <NuxtLink
            v-if="adjacentPosts[0]"
            :to="adjacentPosts[0].slug"
            class="group w-full sm:w-auto min-w-[50%] mt-8 px-6 py-4 rounded-xl border border-trueGray-300 hover:border-trueGray-400 dark:border-trueGray-800 dark:hover:border-trueGray-700 hover:bg-trueGray-50 dark:hover:bg-trueGray-1000 transition-colors duration-150"
          >
            <div
              class="mb-2 text-sm text-trueGray-600 group-hover:text-trueGray-700 dark:text-trueGray-400 dark:group-hover:text-trueGray-300 text-right transition-colors duration-150"
            >
              Previous post
            </div>

            <div
              class="flex flex-row justify-end items-center font-semibold text-xl text-violet-600 group-hover:text-violet-700 dark:text-violet-500 dark:group-hover:text-violet-400 transition-colors duration-150"
            >
              <svg
                viewBox="0 0 20 20"
                class="flex-shrink-0 w-6 h-6 mr-2 transform-gpu group-hover:-translate-x-1 fill-current transition-transform duration-150"
              >
                <path
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                />
              </svg>

              <span class="truncate">{{ adjacentPosts[0].title }}</span>
            </div>
          </NuxtLink>
        </div>

        <div class="order-0 sm:order-1 flex flex-row-reverse">
          <NuxtLink
            v-if="adjacentPosts[1]"
            :to="adjacentPosts[1].slug"
            class="group w-full sm:w-auto min-w-[50%] mt-8 px-6 py-4 rounded-xl border border-trueGray-300 hover:border-trueGray-400 dark:border-trueGray-800 dark:hover:border-trueGray-700 hover:bg-trueGray-50 dark:hover:bg-trueGray-1000 transition-colors duration-150"
          >
            <div
              class="mb-2 text-sm text-trueGray-600 group-hover:text-trueGray-700 dark:text-trueGray-400 dark:group-hover:text-trueGray-300 transition-colors duration-150"
            >
              Next post
            </div>

            <div
              class="flex flex-row items-center font-semibold text-xl text-violet-600 group-hover:text-violet-700 dark:text-violet-500 dark:group-hover:text-violet-400 transition-colors duration-150"
            >
              <span class="truncate">{{ adjacentPosts[1].title }}</span>

              <svg
                viewBox="0 0 20 20"
                class="flex-shrink-0 w-6 h-6 ml-2 transform-gpu group-hover:translate-x-1 fill-current transition-transform duration-150"
              >
                <path
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                />
              </svg>
            </div>
          </NuxtLink>
        </div>
      </div>
    </article>

    <TableOfContents :toc="post.toc" class="lg:w-1/4" />
  </main>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  useContext,
  useRoute,
  useStatic,
  watchEffect,
} from "@nuxtjs/composition-api";

import { useSeo } from "~/composables";
import { Post } from "~/types";

export default defineComponent({
  head: {},

  setup() {
    const { title, description, image } = useSeo({ title: "Post" });

    const { $content } = useContext();
    const route = useRoute();

    const post = useStatic(
      (slug) => $content("posts", slug).fetch() as Promise<Post>,
      computed(() => route.value.params.slug),
      "post"
    );

    watchEffect(() => {
      title.value = post.value?.title;
      description.value = post.value?.description;
      image.value = post.value?.image;
    });

    const adjacentPosts = useStatic(
      (slug) =>
        $content("posts")
          .surround(slug)
          .sortBy("createdAt", "desc")
          .only(["slug", "title"])
          .fetch() as Promise<[Post | null, Post | null]>,
      computed(() => route.value.params.slug),
      "posts"
    );

    return {
      post,
      adjacentPosts,
    };
  },
});
</script>

<style>
.prose {
  @apply max-w-none text-trueGray-700 dark:text-trueGray-300;
}

.prose strong {
  @apply text-black dark:text-white;
}

.prose code {
  @apply text-black dark:text-white;
}

.prose a,
.prose a strong,
.prose a code {
  @apply relative text-trueGray-700 dark:text-trueGray-300 no-underline transition-colors duration-150;
}

.prose a:hover,
.prose a:hover strong,
.prose a:hover code {
  @apply text-black dark:text-white;
}

.prose a::before {
  @apply absolute inset-x-1 -bottom-1.5 h-1 bg-indigo-200 dark:bg-indigo-900 transition-all duration-150;
  content: "";
}

.prose a:hover::before {
  @apply -inset-x-1 bg-indigo-500 dark:bg-indigo-700;
}

.prose a::after {
  @apply absolute left-1/2 top-full z-10 px-4 py-2 transform-gpu -translate-x-1/2 opacity-0 invisible rounded-lg bg-trueGray-100 dark:bg-trueGray-1000 leading-4 text-sm text-trueGray-700 dark:text-trueGray-300 whitespace-nowrap shadow-sm transition duration-150;
  content: attr(href);
}

.prose a:hover::after {
  @apply translate-y-2 opacity-100 visible;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4 {
  @apply text-black dark:text-white;
}

.prose h1 > a:first-child::before,
.prose h2 > a:first-child::before,
.prose h3 > a:first-child::before,
.prose h4 > a:first-child::before,
.prose h5 > a:first-child::before,
.prose h6 > a:first-child::before {
  @apply static bg-transparent text-trueGray-400 dark:text-trueGray-600;
  content: "#";
  margin-right: 0.375em;
}

.prose h1 > a:first-child:hover::before,
.prose h2 > a:first-child:hover::before,
.prose h3 > a:first-child:hover::before,
.prose h4 > a:first-child:hover::before,
.prose h5 > a:first-child:hover::before,
.prose h6 > a:first-child:hover::before {
  @apply bg-transparent text-black dark:text-white;
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
  @apply bg-trueGray-400 dark:bg-trueGray-600;
}

.prose ol li::before {
  @apply text-trueGray-500;
}

.prose blockquote {
  @apply border-trueGray-200 dark:border-trueGray-800 text-trueGray-600 dark:text-trueGray-400;
}

/* .prose blockquote {
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
} */

.prose .code-block {
  @apply relative;
}

.prose .code-block .file-name {
  @apply absolute right-0 top-0 px-4 py-2 font-mono text-sm md:text-base text-trueGray-600 dark:text-trueGray-400;
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
  @apply border-trueGray-300 dark:border-trueGray-800;
}

.prose table {
  @apply block overflow-x-auto;
}

.prose thead {
  @apply border-trueGray-300 dark:border-trueGray-700 text-black dark:text-white;
}

.prose tbody tr {
  @apply border-trueGray-200 dark:border-trueGray-800;
}
</style>
