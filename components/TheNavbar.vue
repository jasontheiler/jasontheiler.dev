<template>
  <header class="sticky top-0 w-full max-w-screen-lg z-50 mx-auto p-2">
    <nav
      class="w-full h-16 px-4 flex justify-between items-center rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-md transition-colors duration-150"
    >
      <NuxtLink to="/" class="font-bold text-2xl"
        ><span class="sm:hidden">J.</span
        ><span class="hidden sm:inline">Jason</span
        ><span class="text-black dark:text-white transition-colors duration-150"
          >Theiler</span
        >
      </NuxtLink>

      <div class="flex items-center">
        <ul class="flex font-medium">
          <li class="ml-4 sm:ml-8">
            <NuxtLink
              to="/projects"
              active-class="text-black dark:text-white"
              class="hover:text-black dark:hover:text-white transition-colors duration-150"
              >Projects</NuxtLink
            >
          </li>

          <li class="ml-4 sm:ml-8">
            <NuxtLink
              to="/posts"
              active-class="text-black dark:text-white"
              class="hover:text-black dark:hover:text-white transition-colors duration-150"
              >Posts</NuxtLink
            >
          </li>
        </ul>

        <TheThemeToggle class="ml-4 sm:ml-8" />
      </div>
    </nav>
  </header>
</template>
