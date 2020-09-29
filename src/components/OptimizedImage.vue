<template>
  <div
    v-observe-visibility="{
      callback: setIsVisible,
      once: true,
      intersection: {
        rootMargin: '512px',
      },
    }"
    class="optimized-image"
  >
    <!-- <div :style="{ paddingBottom: `${aspectRatio}%` }" class="w-full"></div> -->

    <img :src="srcPlaceholder" :alt="alt" class="placeholder" />

    <picture v-if="isVisible" class="optimized">
      <source :srcset="srcWebp" :alt="alt" />

      <source :srcset="src" :alt="alt" />

      <img :src="src" :alt="alt" />
    </picture>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    srcWebp: {
      type: String as () => string,
      required: true,
    },

    src: {
      type: String as () => string,
      required: true,
    },

    srcPlaceholder: {
      type: String as () => string,
      required: true,
    },

    alt: {
      type: String as () => string,
      required: true,
    },
  },

  data() {
    return {
      isVisible: false,
    }
  },

  // computed: {
  //   aspectRatio() {
  //     return (height / width) * 100
  //   },
  // },

  methods: {
    setIsVisible(isVisible: boolean) {
      this.isVisible = isVisible
    },
  },
})
</script>

<style scoped>
.optimized-image {
  position: relative;
  width: 100%;
  height: 100%;
}

.placeholder,
.optimized {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left top;
}

.optimized {
  position: absolute;
  left: 0;
  top: 0;
  color: transparent;
  animation: 1s fade-in;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
