// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    port: 3001
  },
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