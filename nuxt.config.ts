// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindTypography from '@tailwindcss/typography'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  build: {
    transpile: ['vuetify'],
  },

  modules: ['nuxt-lodash','@nuxtjs/tailwindcss', "@vueuse/nuxt", (_options, nuxt) => {
    nuxt.hooks.hook('vite:extendConfig', (config) => {
      // @ts-expect-error
      config.plugins.push(vuetify({ autoImport: true }))
    })
  },],
  devtools: { enabled: true },
  ssr: false,
  typescript: {
    shim: false
  }, runtimeConfig: {
    public:
      { apiBase: process.env.LOCAL_API }
  },
  tailwindcss: {
    config: {
      plugins: [tailwindTypography]
    }
  },
  vite: {
    vue: {
      script: {
        defineModel: true
      }
      , template: {
        transformAssetUrls
      }
    },
    server: {
      proxy: {
        '/v1': {
          target: "http://127.0.0.1:8000/",
          changeOrigin: true
        },
        '/token': {
          target: "http://127.0.0.1:8000/",
          changeOrigin: true
        },
        "/static": "http://127.0.0.1:8000/"
      }
    }
  }
})
