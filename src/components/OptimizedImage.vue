<template>
  <div
    v-observe-visibility="{
      callback: visibilityChanged,
      once: true,
      intersection: {
        rootMargin: '512px',
      },
    }"
    class="optimized-image"
  >
    <div :style="{ paddingBottom: `${aspectRatio}%` }" class="w-full"></div>

    <img :src="image.placeholder" :alt="alt" class="placeholder" />

    <picture v-if="isVisible">
      <img
        :srcSet="image.srcSet"
        :src="image.src"
        :alt="alt"
        class="optimized"
      />
    </picture>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    image: {
      type: Object as () => {
        placeholder: string
        srcSet: string
        src: string
        width: number
        height: number
      },
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

  computed: {
    aspectRatio() {
      return (this.image.height / this.image.width) * 100
    },
  },

  methods: {
    visibilityChanged(isVisible: boolean) {
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
  overflow: hidden;
}

.placeholder,
.optimized {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left top;
}

.optimized {
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
