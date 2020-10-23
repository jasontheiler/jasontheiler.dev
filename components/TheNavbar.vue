<template>
  <header
    class="fixed left-0 top-0 w-full h-16 z-50 bg-white dark:bg-black bg-opacity-75 dark:bg-opacity-75 bg-blur"
  >
    <div
      class="w-full max-w-screen-lg h-full mx-auto px-4 flex justify-between items-center"
    >
      <nuxt-link to="/"
        ><span class="sm:hidden">J.</span
        ><span class="hidden sm:inline">Jason</span>Theiler</nuxt-link
      >

      <nav class="font-medium">
        <nuxt-link to="/" class="ml-4 sm:ml-8">Projects</nuxt-link>
        <nuxt-link to="/posts" class="ml-4 sm:ml-8">Posts</nuxt-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.bg-blur {
  backdrop-filter: blur(8px);
}
</style>
