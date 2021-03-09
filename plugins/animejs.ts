import Vue from "vue";
import type { AnimeParams, AnimeInstance } from "animejs";
import anime from "animejs";

declare module "vue/types/vue" {
  interface Vue {
    $anime(params: AnimeParams): AnimeInstance;
  }
}

Vue.prototype.$anime = anime;
