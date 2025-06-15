import tailwindcss from "@tailwindcss/vite";
import svgLoader from "vite-svg-loader";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  app: {
    head: {
      title: "Pokélab",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
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
    "@vueuse/nuxt",
    "nuxt-lodash",
  ],
  scripts: {
    registry: {
      googleTagManager: {
        id: "G-NK7Y35Y04T",
      },
    },
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
});
