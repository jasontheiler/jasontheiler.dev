import { defineNuxtPlugin } from "@nuxtjs/composition-api";
import Vue from "vue";
import anime from "animejs";

declare module "vue/types/vue" {
  interface Vue {
    $anime: typeof anime;
  }
}

Vue.prototype.$anime = anime;

declare module "@nuxt/types" {
  interface Context {
    $anime: typeof anime;
  }
}

export default defineNuxtPlugin((ctx) => {
  ctx.$anime = anime;
});
