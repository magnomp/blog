// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    port: 3001
  },
  css: [
    '@/assets/css/main.css'
  ],
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
  content: {
    highlight: {
      // OR
      theme: {
        // Default theme (same as single string)
        default: 'github-light',
        // Theme used if `html.dark`
        dark: 'github-dark',
        // Theme used if `html.sepia`
        sepia: 'monokai'
      },
    }
  }
})