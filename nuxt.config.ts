// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      OPENWEATHERMAP_API_URL: process.env.OPENWEATHERMAP_API_URL,
      OPENWEATHERMAP_API_KEY: process.env.OPENWEATHERMAP_API_KEY,
      OPENWEATHERMAP_ICON_URL: process.env.OPENWEATHERMAP_ICON_URL,
      GEOAPIFY_API_KEY: process.env.GEOAPIFY_API_KEY,
      GEOAPIFY_API_URL: process.env.GEOAPIFY_API_URL,
    },
  },
})
