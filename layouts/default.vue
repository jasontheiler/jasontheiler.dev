<template>
  <div>
    <TheNavbar />

    <Nuxt />

    <TheFooter />
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}

body {
  @apply bg-white text-gray-600 transition-colors duration-150;
}

.dark body {
  @apply bg-black text-gray-400;
}

[data-js-focus-visible] :focus:not([data-focus-visible-added]) {
  @apply outline-none;
}
</style>

<style scoped>
.page-enter-active,
.page-leave-active {
  @apply transition-opacity duration-300;
}

.page-enter,
.page-leave-to {
  @apply opacity-0;
}
</style>
