<template>
  <header
    :class="[
      'fixed left-0 top-0 w-full h-16 z-50 border-b bg-white dark:bg-black bg-opacity-75 dark:bg-opacity-75 bg-blur transition-colors duration-150',
      isScrolledToTop
        ? 'border-transparent'
        : 'border-gray-200 dark:border-gray-900',
    ]"
  >
    <div
      class="w-full max-w-screen-lg h-full mx-auto px-4 flex justify-between items-center"
    >
      <NuxtLink to="/" class="font-bold text-2xl"
        ><span class="sm:hidden">J.</span
        ><span class="hidden sm:inline">Jason</span
        ><span class="text-black dark:text-white transition-colors duration-150"
          >Theiler</span
        >
      </NuxtLink>

      <nav class="flex items-center font-medium">
        <NuxtLink
          to="/projects"
          active-class="text-black dark:text-white"
          class="ml-4 sm:ml-8 hover:text-black dark:hover:text-white transition-colors duration-150"
          >Projects</NuxtLink
        >

        <NuxtLink
          to="/posts"
          active-class="text-black dark:text-white"
          class="ml-4 sm:ml-8 hover:text-black dark:hover:text-white transition-colors duration-150"
          >Posts</NuxtLink
        >

        <ThemeToggle class="ml-4 sm:ml-8" />
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isScrolledToTop: true,
    }
  },

  methods: {
    handleScroll() {
      this.isScrolledToTop = window.scrollY === 0
    },
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll)
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll)
  },
}
</script>

<style scoped>
.bg-blur {
  backdrop-filter: blur(8px);
}
</style>
