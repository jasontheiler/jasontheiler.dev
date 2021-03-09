<template>
  <section class="relative w-full -mt-36 mb-16 pt-36 pb-16">
    <div
      class="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row"
    >
      <div class="lg:w-1/2"></div>
      <div class="lg:w-1/2 flex justify-center items-center">
        <div
          class="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600"
          ref="box"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  mounted() {
    this.$anime({
      targets: this.$refs.box,
      translateX: ["-20vw", "20vw"],
      rotate: 360,
      borderRadius: ["0%", "50%"],
      easing: "easeInOutElastic",
      duration: 2000,
      loop: true,
      direction: "alternate",
    });
  },
};
</script>
