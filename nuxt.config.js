import i18mSettings from './settings/i18n'
import sitemapSettings from './settings/sitemap'

export default {

  server: {
    port: 3000, // default: 3000
    host: process.env.HOST, // default: localhost,
    timing: false,
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'CoolCity',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'fb:app_id', property: 'fb:app_id', content: process.env.FACEBOOK_APP_ID },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`,
        async: true,
      },
      {
        src: '/js/fb_sdk.js',
        async: true,
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~layouts/global.css',
    '~assets/scss/global.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {src: '~/plugins/vueSimpleSpinner', mode: 'client'},
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/fontawesome',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    [
      'nuxt-i18n',
      i18mSettings,
    ],
    '@nuxtjs/style-resources',
    '@nuxtjs/sitemap',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  styleResources: {
    scss: ['./assets/scss/*.scss']
  },

  env: {
    apiUrl: process.env.API_URL,
    baseUrl: process.env.BASE_URL,
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
  },

  fontawesome: {
    icons: {
      solid: [
        'faCaretLeft',
        'faCaretRight'
      ],
    },
  },

  sitemap: sitemapSettings,

  router: {
    middleware: [
      'rememberPage',
      'googleAnalytics',
    ],
  },

}
