import {
  computed,
  onBeforeUnmount,
  onMounted,
  Ref,
  ref,
  watchEffect,
} from "@nuxtjs/composition-api";

import { Toc } from "~/types";

const OFFSET_TOP = 4;

export const useToc = (toc: Ref<Toc> | Toc) => {
  const tocRef = ref(toc);
  const activeItemId = ref<string | null>(null);
  const activeParentItemIds = computed(() => {
    const activeParentItemIds: string[] = [];

    let i = tocRef.value.findIndex((item) => item.id === activeItemId.value);

    if (i > 0) {
      let depth = tocRef.value[i].depth;

      while (i > 0 && depth >= 2) {
        i--;

        const prevDepth = tocRef.value[i].depth;

        if (prevDepth < depth) {
          activeParentItemIds.push(tocRef.value[i].id);
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
    watchEffect(() => {
      const yTop = scrollPaddingTop.value + OFFSET_TOP;
      const yMid = window.innerHeight / 2;

      observer?.disconnect();
      observer = new IntersectionObserver(
        (entries) => {
          let yMin = window.innerHeight;

          for (const {
            isIntersecting,
            boundingClientRect: { y },
            target: { id },
          } of entries) {
            if (isIntersecting && y < yTop) activeItemId.value = id;

            if (isIntersecting && y >= yTop && y < yMid && y < yMin) {
              const i = tocRef.value.findIndex((item) => item.id === id);

              if (i === 0) activeItemId.value = null;
              else activeItemId.value = tocRef.value[i - 1].id;

              yMin = y;
            }
          }
        },
        {
          rootMargin: `${-yTop}px 0px 0px 0px`,
          threshold: [0, 1],
        }
      );

      // Observes all elements with corresponding items in the table of
      // contents.
      for (const { id } of tocRef.value) {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      }
    });
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
