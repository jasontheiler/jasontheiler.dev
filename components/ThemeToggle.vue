<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    class="w-6 h-6 hover:text-black dark:hover:text-white transition-colors duration-150 cursor-pointer"
    @click="toggleTheme"
  >
    <Transition name="path" mode="out-in">
      <path
        v-if="$colorMode.value === 'dark'"
        key="dark"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />

      <path
        v-else-if="$colorMode.value === 'light'"
        key="light"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />

      <path
        v-else
        key="system"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        class="opacity-25 cursor-not-allowed"
      />
    </Transition>
  </svg>
</template>

<script>
export default {
  methods: {
    toggleTheme() {
      this.$colorMode.preference =
        this.$colorMode.value === "dark" ? "light" : "dark"
    },
  },
}
</script>

<style scoped>
.path-enter-active,
.path-leave-active {
  @apply transition-opacity;
  @apply duration-150;
}

.path-enter,
.path-leave-to {
  @apply opacity-0;
}
</style>
