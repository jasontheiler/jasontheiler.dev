<template>
  <div
    class="p-4 rounded-2xl bg-gradient-to-br from-purple-500 dark:from-purple-600 to-indigo-500 dark:to-indigo-600 text-white"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    type: {
      type: String,
      required: false,
    },
  },
});
</script>
