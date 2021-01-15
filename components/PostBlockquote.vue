<template>
  <blockquote
    class="bg-gradient-to-br from-purple-500 dark:from-purple-700 to-indigo-500 dark:to-indigo-700 text-white transition-colors duration-150"
  >
    <slot />
  </blockquote>
</template>

<script>
export default {
  type: {
    type: String,
    required: false,
  },
};
</script>
