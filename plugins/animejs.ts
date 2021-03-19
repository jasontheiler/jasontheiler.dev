import { defineNuxtPlugin } from "@nuxtjs/composition-api";
import anime from "animejs";
import Vue from "vue";

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
