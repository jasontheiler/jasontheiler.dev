<template>
  <div>
    <TheNavbar />

    <Nuxt class="pt-16" />
  </div>
</template>

<style>
body {
  @apply bg-white;
  @apply text-black;
}

.dark body {
  @apply bg-black;
  @apply text-white;
}

.js-focus-visible :focus:not(.focus-visible) {
  outline: none;
}
</style>
