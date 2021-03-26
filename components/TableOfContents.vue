<template>
  <aside>
    <div
      :class="{ hidden: !isOpen }"
      class="fixed lg:sticky inset-0 lg:inset-auto top-18 lg:top-36 z-40 lg:z-auto flex lg:block"
      @click.self="isOpen = false"
    >
      <nav
        class="z-50 lg:z-auto w-full max-w-xs h-full mt-px mr-24 lg:m-auto p-8 lg:p-0 lg:pl-16 border-r lg:border-none border-trueGray-200 dark:border-trueGray-800 border-opacity-75 dark:border-opacity-75 bg-white dark:bg-trueGray-1100 bg-opacity-75 dark:bg-opacity-75 blur overflow-y-auto overscroll-y-contain"
      >
        <a
          href="#"
          class="hover:text-black dark:hover:text-white transition-colors duration-150"
          @click.prevent="
            isOpen = false;
            scrollToId();
          "
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
                'text-violet-600 hover:text-violet-700 dark:text-violet-500 dark:hover:text-violet-400':
                  id === activeItemId || activeParentItemIds.includes(id),
              }"
              class="hover:text-black dark:hover:text-white transition-colors duration-150"
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
      class="fixed lg:hidden right-4 sm:right-6 bottom-4 sm:bottom-6 z-50 p-5 rounded-full bg-trueGray-1100 hover:bg-trueGray-800 dark:bg-white dark:hover:bg-trueGray-200 text-white dark:text-trueGray-1100 focus-visible:outline-none focus-visible:ring focus-visible:ring-trueGray-1100 dark:focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:focus-visible:ring-offset-trueGray-1100 transition duration-150"
      aria-label="Toggle table of contents"
      @click="isOpen = !isOpen"
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
import {
  defineComponent,
  PropType,
  ref,
  toRefs,
} from "@nuxtjs/composition-api";

import { useToc } from "~/composables";
import { Toc } from "~/types";

export default defineComponent({
  props: {
    toc: {
      type: Array as PropType<Toc>,
      required: true,
    },
  },

  setup(props) {
    const { toc } = toRefs(props);

    const { activeItemId, activeParentItemIds, scrollToId } = useToc(toc);

    const isOpen = ref(false);

    return {
      activeItemId,
      activeParentItemIds,
      scrollToId,
      isOpen,
    };
  },
});
</script>

<style scoped>
.blur {
  backdrop-filter: blur(12px);
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
