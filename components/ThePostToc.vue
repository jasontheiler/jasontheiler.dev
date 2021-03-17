<template>
  <aside class="lg:w-1/4">
    <div
      :class="{ hidden: !isOpen }"
      @click.self="isOpen = false"
      class="fixed lg:sticky inset-0 lg:inset-auto lg:top-36 z-40 lg:z-auto flex lg:block blur"
    >
      <nav
        class="z-50 lg:z-auto w-full max-w-xs h-full mr-24 p-8 lg:p-0 lg:pl-16 border-r lg:border-none border-trueGray-200 dark:border-trueGray-800 bg-white dark:bg-trueGray-1100 overflow-y-auto"
      >
        <a
          @click.prevent="
            isOpen = false;
            scrollToId();
          "
          href="#"
          >Back to the top</a
        >

        <p>Table of contents</p>

        <ul>
          <li v-for="{ id, depth, text } in toc" :key="id">
            <a
              :href="`#${id}`"
              :class="{
                '': depth === 2,
                'ml-4': depth === 3,
                'bg-gradient-to-br from-purple-600 to-indigo-600 bg-clip-text text-transparent':
                  id === activeItemId || activeParentItemIds.includes(id),
              }"
              @click.prevent="
                isOpen = false;
                scrollToId(id);
              "
              >{{ text }}</a
            >
          </li>
        </ul>
      </nav>
    </div>

    <button
      @click="isOpen = !isOpen"
      class="fixed lg:hidden right-4 sm:right-6 bottom-4 sm:bottom-6 z-50 p-5 rounded-full bg-trueGray-1100 hover:bg-trueGray-800 dark:bg-white dark:hover:bg-trueGray-200 text-white dark:text-trueGray-1100 focus-visible:outline-none focus-visible:ring focus-visible:ring-trueGray-1100 dark:focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:focus-visible:ring-offset-trueGray-1100 transition duration-150"
      aria-label="Toggle table of contents"
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
import type { PropType } from "@nuxtjs/composition-api";
import { defineComponent, ref } from "@nuxtjs/composition-api";

import type { Toc } from "~/composables";
import { useToc } from "~/composables";

export default defineComponent({
  props: {
    toc: {
      type: Array as PropType<Toc>,
      required: true,
    },
  },

  setup(props) {
    const isOpen = ref(false);

    const { activeItemId, activeParentItemIds, scrollToId } = useToc(props.toc);

    return {
      isOpen,
      activeItemId,
      activeParentItemIds,
      scrollToId,
    };
  },
});
</script>
