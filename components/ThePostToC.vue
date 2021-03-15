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
            scrollTo();
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
                  id === activeEntryId || activeParentEntryIds.includes(id),
              }"
              @click.prevent="
                isOpen = false;
                scrollTo(id);
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
import type { PropOptions } from "vue";
import Vue from "vue";

interface ToCEntry {
  id: string;
  text: string;
  depth: number;
}

type ToC = ToCEntry[];

interface Data {
  observer: IntersectionObserver | null;
  activeEntryId: string | null;
  isOpen: boolean;
}

export default Vue.extend({
  props: {
    toc: {
      type: Array,
      required: true,
    } as PropOptions<ToC>,
  },

  data(): Data {
    return {
      observer: null,
      activeEntryId: null,
      isOpen: false,
    };
  },

  computed: {
    scrollPaddingTop(): number {
      const scrollPaddingTop = getComputedStyle(
        document.documentElement
      ).getPropertyValue("scroll-padding-top");

      return parseInt(scrollPaddingTop);
    },

    activeParentEntryIds(): string[] {
      const activeParentEntryIds: string[] = [];

      let idx = this.findIdxInTocById(this.activeEntryId ?? "");

      if (idx > 0) {
        let depth = this.toc[idx].depth;

        while (idx > 0 && depth >= 2) {
          idx--;

          const prevDepth = this.toc[idx].depth;

          if (prevDepth < depth) {
            activeParentEntryIds.push(this.toc[idx].id);
            depth = prevDepth;
          }
        }
      }

      return activeParentEntryIds;
    },
  },

  mounted() {
    const OFFSET_TOP = 4;

    this.observer = new IntersectionObserver(
      (headings) => {
        let minY = window.innerHeight;

        for (const { isIntersecting, boundingClientRect, target } of headings) {
          const { y } = boundingClientRect;
          const { id } = target;

          if (isIntersecting && y < this.scrollPaddingTop + OFFSET_TOP)
            this.activeEntryId = id;

          if (
            isIntersecting &&
            y >= this.scrollPaddingTop + OFFSET_TOP &&
            y < window.innerHeight / 2 &&
            y < minY
          ) {
            const idx = this.findIdxInTocById(id);

            idx === 0
              ? (this.activeEntryId = null)
              : (this.activeEntryId = this.toc[idx - 1].id);

            minY = y;
          }
        }
      },
      {
        rootMargin: `${-(this.scrollPaddingTop + OFFSET_TOP)}px 0px 0px 0px`,
        threshold: [0, 1],
      }
    );

    // Observes all headings with entries in the table of contents.
    for (const { id } of this.toc) {
      const heading = document.getElementById(id);
      if (heading) this.observer?.observe(heading);
    }
  },

  beforeDestroy() {
    this.observer?.disconnect();
  },

  methods: {
    findIdxInTocById(id: string): number {
      return this.toc.findIndex((entry) => entry.id === id);
    },

    scrollTo(id?: string) {
      let top = id ? document.getElementById(id)?.offsetTop : 0;
      top &&= top - this.scrollPaddingTop;

      window.scrollTo({ top, behavior: "smooth" });
    },
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
