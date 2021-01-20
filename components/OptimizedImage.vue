<template>
  <div
    v-observe-visibility="{
      callback: setIsVisible,
      once: true,
      intersection: {
        rootMargin: '256px',
      },
    }"
    class="relative w-full overflow-hidden"
  >
    <img
      :src="require(`~/assets/images/${image}?lqip`)"
      :alt="alt"
      class="w-full h-full object-cover object-center text-transparent"
    />

    <picture
      v-if="isVisible"
      :class="['absolute inset-0', { 'xyz-in': isLoaded }]"
      xyz="fade"
    >
      <source
        :srcset="require(`~/assets/images/${image}?webp`)"
        :alt="alt"
        class="w-full h-full object-cover object-center text-transparent"
      />

      <source
        :srcset="require(`~/assets/images/${image}`)"
        :alt="alt"
        class="w-full h-full object-cover object-center text-transparent"
      />

      <img
        @load.once="setIsLoaded(true)"
        :src="require(`~/assets/images/${image}`)"
        :alt="alt"
        class="w-full h-full object-cover object-center text-transparent"
      />
    </picture>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true,
    },

    alt: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      isVisible: false,
      isLoaded: false,
    };
  },

  methods: {
    setIsVisible(isVisible) {
      this.isVisible = isVisible;
    },

    setIsLoaded(isLoaded) {
      this.isLoaded = isLoaded;
    },
  },
};
</script>
