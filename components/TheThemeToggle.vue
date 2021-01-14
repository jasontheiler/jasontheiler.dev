<template>
  <button
    @click="toggleTheme"
    class="group w-10 h-6 flex justify-center items-center border-2 border-gray-800 dark:border-indigo-800 border-opacity-50 dark:border-opacity-50 rounded-full bg-gray-900 dark:bg-indigo-900 bg-opacity-50 dark:bg-opacity-50 focus-visible:outline-none focus-visible:ring focus-visible:ring-gray-800 dark:focus-visible:ring-indigo-800 focus-visible:ring-offset-4 focus-visible:ring-offset-gray-100 dark:focus-visible:ring-offset-gray-800 transition duration-150"
  >
    <div
      class="transform-gpu -translate-x-2 dark:translate-x-2 transition-transform duration-300"
    >
      <div
        class="w-7 h-7 flex justify-center items-center rounded-full bg-coolGray-600 hover:bg-coolGray-500 dark:bg-indigo-600 dark:group-hover:bg-indigo-500 text-yellow-200 transition-colors duration-150"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
          <path
            d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
          />
        </svg>
      </div>
    </div>
  </button>
</template>

<script>
export default {
  methods: {
    toggleTheme() {
      this.$colorMode.preference =
        this.$colorMode.value === "dark" ? "light" : "dark";
    },
  },
};
</script>
