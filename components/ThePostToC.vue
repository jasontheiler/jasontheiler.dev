<template>
  <aside class="lg:w-1/4">
    <div
      :class="{ hidden: !isOpen }"
      @click.self="isOpen = false"
      class="fixed lg:sticky inset-0 lg:inset-auto lg:top-36 z-40 lg:z-auto flex flex-row-reverse lg:block blur"
    >
      <div
        class="absolute left-0 inset-y-0 lg:inset-auto z-50 lg:z-auto w-full max-w-xs p-8 lg:p-0 lg:pl-16 border-r lg:border-none border-trueGray-200 dark:border-trueGray-800 bg-white dark:bg-trueGray-1100 overflow-y-auto"
      >
        <NuxtLink :to="$route.path" @click.native="isOpen = false"
          >Back to the top</NuxtLink
        >

        <p>In this post</p>

        <ul>
          <li v-for="{ id, depth, text } of toc" :key="id">
            <NuxtLink
              :to="`#${id}`"
              :class="{
                '': depth === 1,
                '': depth === 2,
                'ml-4': depth === 3,
                'bg-gradient-to-br from-purple-600 to-indigo-600 bg-clip-text text-transparent':
                  id === activeItem,
              }"
              @click.native="isOpen = false"
              >{{ text }}</NuxtLink
            >
          </li>
        </ul>
      </div>
    </div>

    <button
      @click="isOpen = !isOpen"
      class="fixed lg:hidden right-4 sm:right-6 bottom-4 sm:bottom-6 z-50 p-5 rounded-full bg-trueGray-1100 hover:bg-trueGray-800 dark:bg-white dark:hover:bg-trueGray-200 text-white dark:text-trueGray-1100 focus-visible:outline-none focus-visible:ring focus-visible:ring-trueGray-1100 dark:focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:focus-visible:ring-offset-trueGray-1100 transition duration-150"
    >
      <svg viewBox="0 0 24 24" class="w-6 h-6 stroke-2 stroke-current">
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
            d="M4 8h16M4 16h16"
          />
        </Transition>
      </svg>
    </button>
  </aside>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";

interface ToCEntry {
  id: string;
  text: string;
  depth: number;
}

interface Data {
  observer: IntersectionObserver | null;
  activeItem: string;
  isOpen: boolean;
}

export default Vue.extend({
  props: {
    toc: {
      type: Array,
      required: true,
    } as PropOptions<ToCEntry[]>,
  },

  data(): Data {
    return {
      observer: null,
      activeItem: "",
      isOpen: false,
    };
  },

  mounted() {
    this.observer = new IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        if (isIntersecting) this.activeItem = target.id;
      }
    });

    // Observes all headings with an entry in the table of contents.
    for (const { id } of this.toc) {
      const heading = document.getElementById(id);
      if (heading) this.observer?.observe(heading);
    }
  },

  beforeDestroy() {
    this.observer?.disconnect();
  },
});
</script>

<style scoped>
.blur {
  backdrop-filter: blur(6px);
}

.button-icon-path-enter-active,
.button-icon-path-leave-active {
  @apply transform-gpu origin-center transition duration-300;
}

.button-icon-path-enter,
.button-icon-path-leave-to {
  @apply scale-50 opacity-0;
}
</style>
