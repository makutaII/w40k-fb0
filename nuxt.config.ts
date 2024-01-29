// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  // обработка на сервере выключена. Устраняет ошибку в браузере
  ssr: false,
  devtools: { enabled: true },
  //...
  build: {
    transpile: ["vuetify"],
  },
  supabase: {
    // перенаправление выключено
    redirect: false,
    // перенаправление супабазы по умолчанию
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: [],
    },
  },
  modules: [
    "@nuxtjs/supabase",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    //...
    //  минималистичный auth
    //  "nuxt-auth-utils",
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
