import tailwindcss from "@tailwindcss/vite";
import svgLoader from "vite-svg-loader";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss(), svgLoader()],
  },
  modules: [
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/icon",
    "@nuxt/fonts",
    "shadcn-nuxt",
    "@hebilicious/vue-query-nuxt",
    "@vueuse/nuxt",
    "nuxt-lodash",
  ],
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  vueQuery: {
    stateKey: "vue-query-nuxt",
    queryClientOptions: {
      defaultOptions: { queries: { staleTime: 60 * 60 * 1000 } }, // 1 hour
    },
    vueQueryPluginOptions: { enableDevtoolsV6Plugin: true },
  },
});
