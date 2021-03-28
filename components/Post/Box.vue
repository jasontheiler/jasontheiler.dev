<template>
  <div
    :class="{
      'from-purple-500 to-indigo-500': variant === 'info',
      'from-teal-500 to-green-500': variant === 'success',
      'from-yellow-500 to-orange-500': variant === 'warning',
      'from-pink-500 to-red-500': variant === 'danger',
    }"
    class="p-4 rounded-2xl bg-gradient-to-br text-white"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    variant: {
      type: String as PropType<"info" | "success" | "warning" | "danger">,
      required: false,
      default: "info",
    },
  },
});
</script>
