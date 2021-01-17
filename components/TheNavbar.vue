<template>
  <header
    class="sticky top-0 w-full max-w-screen-xl z-30 mx-auto mb-16 px-2 sm:px-3 lg:px-4 py-2"
  >
    <nav
      class="w-full h-16 px-4 sm:px-6 lg:px-8 flex justify-between items-center rounded-2xl bg-gray-100 dark:bg-gray-1000 shadow-md transition-colors duration-150"
    >
      <NuxtLink to="/" class="font-bold text-2xl"
        ><span class="sm:hidden">J.</span
        ><span class="hidden sm:inline">Jason</span
        ><span class="text-black dark:text-white transition-colors duration-150"
          >Theiler</span
        >
      </NuxtLink>

      <div
        class="flex items-center divide-x divide-gray-300 dark:divide-gray-600"
      >
        <ul class="pr-4 sm:pr-6 lg:pr-8 flex font-medium">
          <li class="ml-4 sm:ml-6 lg:ml-8">
            <NuxtLink
              to="/projects"
              active-class="text-black dark:text-white"
              class="hover:text-black dark:hover:text-white transition-colors duration-150"
              >Projects</NuxtLink
            >
          </li>

          <li class="ml-4 sm:ml-6 lg:ml-8">
            <NuxtLink
              to="/posts"
              active-class="text-black dark:text-white"
              class="hover:text-black dark:hover:text-white transition-colors duration-150"
              >Posts</NuxtLink
            >
          </li>
        </ul>

        <div class="pl-4 sm:pl-6 lg:pl-8 transition-colors duration-150">
          <TheThemeToggle />
        </div>
      </div>
    </nav>
  </header>
</template>
