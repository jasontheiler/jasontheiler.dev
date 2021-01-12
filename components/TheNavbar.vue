<template>
  <header class="sticky top-0 w-full max-w-screen-lg z-50 mx-auto p-2">
    <div
      class="w-full h-16 px-4 flex justify-between items-center rounded-2xl bg-gray-100 dark:bg-gray-800 transition-colors duration-150"
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

        <TheThemeToggle class="ml-4 sm:ml-8" />
      </nav>
    </div>
  </header>
</template>
