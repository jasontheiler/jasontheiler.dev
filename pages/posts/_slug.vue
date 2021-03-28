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

      <NuxtContent :document="post" class="post" />

      <div
        v-if="adjacentPosts"
        class="w-full mt-16 border-t border-trueGray-200 dark:border-trueGray-800 grid grid-cols-1 sm:grid-cols-2 gap-x-8"
      >
        <div class="order-1 sm:order-0 flex">
          <NuxtLink
            v-if="adjacentPosts[0]"
            :to="{
              name: 'posts-slug',
              params: { slug: adjacentPosts[0].slug },
            }"
            class="group w-full sm:w-auto min-w-[50%] mt-8 px-6 py-4 rounded-xl border border-trueGray-200 hover:border-trueGray-300 dark:border-trueGray-800 dark:hover:border-trueGray-700 hover:bg-trueGray-50 dark:hover:bg-trueGray-1000 focus-visible:outline-none focus-visible:ring focus-visible:ring-violet-600 dark:focus-visible:ring-violet-500 focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:focus-visible:ring-offset-trueGray-1100 transition duration-150"
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
            :to="{
              name: 'posts-slug',
              params: { slug: adjacentPosts[1].slug },
            }"
            class="group w-full sm:w-auto min-w-[50%] mt-8 px-6 py-4 rounded-xl border border-trueGray-200 hover:border-trueGray-300 dark:border-trueGray-800 dark:hover:border-trueGray-700 hover:bg-trueGray-50 dark:hover:bg-trueGray-1000 focus-visible:outline-none focus-visible:ring focus-visible:ring-violet-600 dark:focus-visible:ring-violet-500 focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:focus-visible:ring-offset-trueGray-1100 transition duration-150"
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

<style scoped>
.post {
  @apply prose sm:prose-lg max-w-none text-trueGray-700 dark:text-trueGray-300;
}

.post strong {
  @apply text-black dark:text-white;
}

.post code {
  @apply p-[0.375em] rounded-lg border border-trueGray-200 dark:border-trueGray-800 bg-trueGray-50 dark:bg-trueGray-1000 font-normal text-trueGray-700 dark:text-white;
}

.post code::before,
.post code::after {
  content: none;
}

.post a,
.post a strong,
.post a code {
  @apply relative text-trueGray-700 dark:text-trueGray-300 no-underline transition-colors duration-150;
}

.post a:hover,
.post a:hover strong,
.post a:hover code {
  @apply text-black dark:text-white;
}

.post a::before {
  @apply absolute inset-x-1 -bottom-1.5 h-1 bg-indigo-200 dark:bg-indigo-900 transition-all duration-150;
  content: "";
}

.post a:hover::before {
  @apply -inset-x-1 bg-indigo-500 dark:bg-indigo-700;
}

.post a::after {
  @apply absolute left-1/2 top-full z-10 px-4 py-2 transform-gpu -translate-x-1/2 opacity-0 invisible rounded-lg bg-trueGray-100 dark:bg-trueGray-1000 leading-4 text-sm text-trueGray-700 dark:text-trueGray-300 whitespace-nowrap shadow-sm transition duration-150;
  content: attr(href);
}

.post a:hover::after {
  @apply translate-y-2 opacity-100 visible;
}

.post h1,
.post h2,
.post h3,
.post h4 {
  @apply text-black dark:text-white;
}

.post h1 > a:first-child::before,
.post h2 > a:first-child::before,
.post h3 > a:first-child::before,
.post h4 > a:first-child::before,
.post h5 > a:first-child::before,
.post h6 > a:first-child::before {
  @apply static mr-[0.375em] bg-transparent text-trueGray-400 dark:text-trueGray-600;
  content: "#";
}

.post h1 > a:first-child:hover::before,
.post h2 > a:first-child:hover::before,
.post h3 > a:first-child:hover::before,
.post h4 > a:first-child:hover::before,
.post h5 > a:first-child:hover::before,
.post h6 > a:first-child:hover::before {
  @apply bg-transparent text-black dark:text-white;
}

.post h1 > a:first-child::after,
.post h2 > a:first-child::after,
.post h3 > a:first-child::after,
.post h4 > a:first-child::after,
.post h5 > a:first-child::after,
.post h6 > a:first-child::after {
  @apply left-0 translate-x-0;
}

.post ul li::before {
  @apply bg-trueGray-400 dark:bg-trueGray-600;
}

.post ol li::before {
  @apply text-trueGray-500;
}

.post blockquote {
  @apply border-trueGray-200 dark:border-trueGray-800 text-trueGray-600 dark:text-trueGray-400;
}

/* .post blockquote {
  @apply p-4 rounded-2xl border-none bg-gradient-to-br from-purple-500 to-indigo-500 font-normal not-italic text-white transition-colors duration-150;
  quotes: none;
}

.dark .post blockquote {
  @apply from-purple-700 to-indigo-700;
}

.post blockquote *:first-child {
  @apply mt-0;
}

.post blockquote *:last-child {
  @apply mb-0;
} */

.post .nuxt-content-highlight {
  @apply relative;
}

.post .nuxt-content-highlight ::selection {
  @apply bg-white bg-opacity-25 text-current;
}

.post .nuxt-content-highlight .file-name {
  @apply absolute right-[1.1428571em] sm:right-[1.5em] top-[0.8571429em] sm:top-[1em] font-mono text-[0.875em] sm:text-[0.8888889em];
}

.post .nuxt-content-highlight .file-name + pre {
  @apply pt-[2.5em] sm:pt-[2.75em];
}

.post .nuxt-content-highlight pre {
  @apply rounded-2xl border border-trueGray-800;
  @apply bg-trueGray-1000 !important;
}

.post hr {
  @apply border-trueGray-200 dark:border-trueGray-800;
}

.post table {
  @apply block overflow-x-auto;
}

.post thead {
  @apply border-trueGray-300 dark:border-trueGray-700 text-black dark:text-white;
}

.post tbody tr {
  @apply border-trueGray-200 dark:border-trueGray-800;
}
</style>
