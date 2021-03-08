<template>
  <header
    class="sticky top-0 w-full z-30 mb-16 py-1 border-b border-trueGray-200 border-opacity-75 dark:border-trueGray-800 dark:border-opacity-75 bg-white bg-opacity-75 dark:bg-trueGray-1100 dark:bg-opacity-75 blur"
  >
    <nav
      class="w-full max-w-screen-xl h-16 mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center"
    >
      <NuxtLink to="/" class="font-bold text-2xl"
        ><span class="sm:hidden">J.</span
        ><span class="hidden sm:inline">Jason</span
        ><span class="text-black dark:text-white"
          >Theiler</span
        >
      </NuxtLink>

      <div
        class="flex items-center divide-x divide-trueGray-200 dark:divide-trueGray-800"
      >
        <ul class="pr-4 sm:pr-6 lg:pr-8 flex font-medium">
          <li class="ml-4 sm:ml-6 lg:ml-8">
            <NuxtLink
              to="/posts"
              active-class="text-black dark:text-white"
              class="hover:text-black dark:hover:text-white transition-colors duration-150"
              >Posts</NuxtLink
            >
          </li>
        </ul>

        <div class="pl-4 sm:pl-6 lg:pl-8">
          <TheThemeToggle />
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.blur {
  backdrop-filter: blur(12px);
}
</style>
