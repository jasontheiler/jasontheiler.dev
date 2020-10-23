<template>
  <div>
    <TheNavbar />

    <Nuxt class="pt-16 min-h-screen" />

    <TheFooter />
  </div>
</template>

<style>
body {
  @apply bg-white;
  @apply text-gray-600;
  @apply transition-colors;
  @apply duration-150;
}

.dark body {
  @apply bg-black;
  @apply text-gray-500;
}

.js-focus-visible :focus:not(.focus-visible) {
  outline: none;
}
</style>
