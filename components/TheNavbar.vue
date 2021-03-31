<template>
  <header
    class="sticky top-0 w-full z-30 mb-16 border-b border-trueGray-800 border-opacity-75 bg-trueGray-1100 bg-opacity-75 blur"
  >
    <nav
      class="w-full max-w-screen-xl h-18 mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center"
    >
      <NuxtLink :to="{ name: 'index' }" class="font-bold text-2xl"
        ><span class="sm:hidden">J.</span
        ><span class="hidden sm:inline">Jason</span
        ><span class="text-white">Theiler</span>
      </NuxtLink>

      <ul class="flex font-medium">
        <li class="ml-4 sm:ml-6 lg:ml-8">
          <NuxtLink
            :to="{ name: 'posts' }"
            active-class="text-white"
            class="hover:text-white transition-colors duration-150"
            >Posts</NuxtLink
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<style>
html {
  scroll-padding-top: 6rem;
}
</style>

<style scoped>
.blur {
  backdrop-filter: blur(12px);
}
</style>
