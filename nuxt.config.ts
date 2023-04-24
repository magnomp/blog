// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],
  googleFonts: {
    familes: {
      karla: true
    }
  }
})