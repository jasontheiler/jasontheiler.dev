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
  @apply bg-white;
  @apply text-gray-600;
  @apply transition-colors;
  @apply duration-150;
}

.dark body {
  @apply bg-gray-900;
  @apply text-gray-500;
}

[data-js-focus-visible] :focus:not([data-focus-visible-added]) {
  @apply outline-none;
}
</style>

<style scoped>
.page-enter-active,
.page-leave-active {
  @apply transition-opacity;
  @apply duration-150;
}

.page-enter,
.page-leave-to {
  @apply opacity-0;
}
</style>
