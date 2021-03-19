import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
} from "@nuxtjs/composition-api";

import { Toc } from "~/types";

export const useToc = (toc: Toc) => {
  const OFFSET_TOP = 4;

  const activeItemId = ref<string | null>(null);

  const activeParentItemIds = computed(() => {
    const activeParentItemIds: string[] = [];

    let idx = toc.findIndex((item) => item.id === activeItemId.value);

    if (idx > 0) {
      let depth = toc[idx].depth;

      while (idx > 0 && depth >= 2) {
        idx--;

        const prevDepth = toc[idx].depth;

        if (prevDepth < depth) {
          activeParentItemIds.push(toc[idx].id);
          depth = prevDepth;
        }
      }
    }

    return activeParentItemIds;
  });

  const scrollPaddingTop = computed(() =>
    parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        "scroll-padding-top"
      )
    )
  );

  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        let minY = window.innerHeight;

        for (const { isIntersecting, boundingClientRect, target } of entries) {
          const { y } = boundingClientRect;
          const { id } = target;

          if (isIntersecting && y < scrollPaddingTop.value + OFFSET_TOP)
            activeItemId.value = id;

          if (
            isIntersecting &&
            y >= scrollPaddingTop.value + OFFSET_TOP &&
            y < window.innerHeight / 2 &&
            y < minY
          ) {
            const idx = toc.findIndex((item) => item.id === id);

            idx === 0
              ? (activeItemId.value = null)
              : (activeItemId.value = toc[idx - 1].id);

            minY = y;
          }
        }
      },
      {
        rootMargin: `${-(scrollPaddingTop.value + OFFSET_TOP)}px 0px 0px 0px`,
        threshold: [0, 1],
      }
    );

    // Observes all elements with corresponding items in the table of contents.
    for (const { id } of toc) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
  });

  onBeforeUnmount(() => observer?.disconnect());

  const scrollToId = (id?: string) => {
    let top = id ? document.getElementById(id)?.offsetTop : 0;
    top &&= top - scrollPaddingTop.value;

    window.scrollTo({ top, behavior: "smooth" });
  };

  return {
    activeItemId,
    activeParentItemIds,
    scrollToId,
  };
};
