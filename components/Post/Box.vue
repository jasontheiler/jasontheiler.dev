<template>
  <div
    :class="{
      info: variant === 'info',
      success: variant === 'success',
      warning: variant === 'warning',
      danger: variant === 'danger',
    }"
    class="box"
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

<style scoped>
.box {
  @apply p-4 rounded-2xl bg-gradient-to-br shadow-lg;
  text-shadow: 0 1px 3px rgb(0 0 0 / 10%), 0 1px 2px rgb(0 0 0 / 6%);
}

.box code {
  @apply border-trueGray-800 border-opacity-10 dark:border-opacity-10 bg-trueGray-1000 bg-opacity-10 dark:bg-opacity-10 text-white;
}

.info {
  @apply from-purple-500 to-indigo-500 text-violet-100;
}

.info ::selection {
  @apply text-violet-500 bg-white;
}

.success {
  @apply from-teal-500 to-green-500 text-emerald-100;
}

.success ::selection {
  @apply text-emerald-500 bg-white;
}

.warning {
  @apply from-yellow-500 to-orange-500 text-amber-100;
}

.warning ::selection {
  @apply text-amber-500 bg-white;
}

.danger {
  @apply from-pink-500 to-red-500 text-rose-100;
}

.danger ::selection {
  @apply text-rose-500 bg-white;
}
</style>
