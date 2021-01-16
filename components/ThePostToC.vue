<template>
  <aside class="lg:w-1/5 lg:ml-16">
    <div
      :class="{ hidden: !isOpen }"
      @click="isOpen = !isOpen"
      class="fixed lg:sticky inset-0 lg:inset-auto lg:top-36 z-40 lg:z-auto flex lg:block transform-gpu lg:transform-none bg-black bg-opacity-25 lg:bg-transparent"
    >
      <div
        class="z-50 w-full max-w-xs h-full lg:h-auto max-h-full mr-32 px-4 py-8 lg:p-0 bg-white dark:bg-gray-900 transition-colors duration-150"
      >
        <NuxtLink :to="$route.path">Back to the top</NuxtLink>

        <p>In this post</p>

        <ul>
          <li v-for="{ id, depth, text } of toc" :key="id">
            <NuxtLink
              :to="`#${id}`"
              :class="{
                '': depth === 1,
                '': depth === 2,
                'ml-4': depth === 3,
              }"
              >{{ text }}</NuxtLink
            >
          </li>
        </ul>
      </div>

      <div class="sm:1/2 lg:w-auto" />
    </div>

    <button
      @click="isOpen = !isOpen"
      class="fixed lg:hidden right-4 sm:right-6 bottom-4 sm:bottom-6 z-50 p-4 rounded-full bg-gray-900 hover:bg-gray-700 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-gray-900 dark:focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 transition duration-150"
    >
      <svg viewBox="0 0 24 24" class="w-7 h-7 stroke-2 stroke-current">
        <Transition name="button-icon-path">
          <path
            v-if="isOpen"
            key="close"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />

          <path
            v-else
            key="open"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </Transition>
      </svg>
    </button>
  </aside>
</template>

<script>
export default {
  props: {
    toc: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      isOpen: false,
    };
  },
};
</script>

<style scoped>
.button-icon-path-enter-active,
.button-icon-path-leave-active {
  @apply transition-opacity;
  @apply duration-150;
}

.button-icon-path-enter,
.button-icon-path-leave-to {
  @apply opacity-0;
}
</style>
