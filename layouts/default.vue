<template>
  <div>
    <TheNavbar />

    <Nuxt />

    <TheFooter />
  </div>
</template>

<style>
body {
  @apply bg-white dark:bg-trueGray-1100 text-trueGray-700 dark:text-trueGray-300;
}

body ::selection {
  @apply bg-violet-600 dark:bg-violet-500 text-white;
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
