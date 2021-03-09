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
  @apply bg-white dark:bg-trueGray-1100 text-trueGray-600 dark:text-trueGray-400;
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
