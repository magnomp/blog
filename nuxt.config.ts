// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    ['unplugin-icons/nuxt', { autoInstall: true }]],
  googleFonts: {
    familes: {
      karla: true
    }
  },
})