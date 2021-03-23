<template>
  <button
    class="group w-10 h-6 flex justify-center items-center border-2 border-trueGray-500 dark:border-violet-800 border-opacity-50 dark:border-opacity-50 rounded-full bg-trueGray-400 dark:bg-violet-900 bg-opacity-50 dark:bg-opacity-50 focus-visible:outline-none focus-visible:ring focus-visible:ring-trueGray-800 dark:focus-visible:ring-violet-800 focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:focus-visible:ring-offset-trueGray-1100 transition-colors duration-150"
    aria-label="Toggle theme"
    @click="toggleTheme"
  >
    <div
      class="transform-gpu -translate-x-2 dark:translate-x-2 transition-transform duration-300"
    >
      <div
        class="relative w-7 h-7 flex justify-center items-center rounded-full bg-trueGray-500 dark:bg-gradient-to-br dark:from-purple-600 dark:to-indigo-600 text-yellow-200"
      >
        <div
          class="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-full bg-trueGray-600 dark:bg-gradient-to-br dark:from-purple-500 dark:to-indigo-500 transition-opacity duration-150"
        />

        <svg viewBox="0 0 20 20" class="z-10 w-4 h-4 fill-current">
          <path
            d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
          />
        </svg>
      </div>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent, useContext } from "@nuxtjs/composition-api";

export default defineComponent({
  setup() {
    const { $colorMode } = useContext();

    const toggleTheme = () => {
      $colorMode.preference = $colorMode.value === "dark" ? "light" : "dark";
    };

    return {
      toggleTheme,
    };
  },
});
</script>
