export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/icon", "@nuxt/ui", "@nuxt/image"],
  css: ["~/assets/css/main.css"],
  ui: {
    colorMode: false,
  },
  image: {
    format: ['webp'],
    domains: ['dummyjson.com']
  },
  typescript: {
    typeCheck: true
  }
});
