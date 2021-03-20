<template>
  <section class="relative w-full -mt-36 mb-16 pt-36 pb-16">
    <div
      class="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row"
    >
      <div class="lg:w-1/2"></div>
      <div class="lg:w-1/2 flex justify-center items-center">
        <div
          ref="box"
          class="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  useContext,
} from "@nuxtjs/composition-api";

export default defineComponent({
  setup() {
    const box = ref<HTMLElement | null>(null);

    const { $anime } = useContext();

    onMounted(() => {
      const tl = $anime.timeline({
        targets: box.value,
        duration: 2000,
        loop: true,
      });

      tl.add({
        translateX: ["-20vw", "20vw"],
        rotate: 360,
        borderRadius: "50%",
      });
      tl.add({
        translateX: ["20vw", "-20vw"],
        rotate: 0,
        borderRadius: "0%",
      });
    });

    return {
      box,
    };
  },
});
</script>
