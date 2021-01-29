<template>
  <div :id="id" />
</template>

<script>
import { tsParticles } from "tsparticles";

import cloud1 from "~/assets/graphics/cloud-1.svg?url";
import cloud2 from "~/assets/graphics/cloud-2.svg?url";
import cloud3 from "~/assets/graphics/cloud-3.svg?url";
import cloud4 from "~/assets/graphics/cloud-4.svg?url";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      particlesContainer: undefined,
    };
  },

  watch: {
    "$colorMode.value"() {
      this.destroyParticles();
      this.loadParticles();
    },
  },

  mounted() {
    this.loadParticles();
  },

  beforeDestroy() {
    this.destroyParticles();
  },

  methods: {
    async loadParticles() {
      this.particlesContainer = await tsParticles.load(this.id, {
        detectRetina: true,
        particles: {
          number: { density: { enable: true, area: 1024, factor: 4096 } },
          move: { enable: true, direction: "bottom", straight: true, speed: 4 },
          size: { value: 192, random: { enable: true, minimumValue: 32 } },
          color: { value: this.$colorMode.value === "dark" ? "#000" : "#fff" },
          shape: {
            type: "image",
            options: {
              image: [
                { src: cloud1, replaceColor: true },
                { src: cloud2, replaceColor: true },
                { src: cloud3, replaceColor: true },
                { src: cloud4, replaceColor: true },
              ],
            },
          },
        },
      });
    },

    destroyParticles() {
      this.particlesContainer?.destroy();
    },
  },
};
</script>
