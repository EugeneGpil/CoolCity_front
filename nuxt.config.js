export default {

  server: {
    port: 3000, // default: 3000
    host: process.env.HOST, // default: localhost,
    timing: false
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'CoolCity',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~layouts/global.css',
    '~assets/scss/global.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {src: '~/plugins/vue-simple-spinner', mode: 'client'}
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    [
      'nuxt-i18n',
      {
        lazy: true,
        seo: false,
        detectBrowserLanguage: false,
        defaultLocale: 'th',
        vueI18n: {
          fallbackLocale: 'en',
        },
        locales: [
          {
            name: 'Thai',
            code: 'th',
            iso: 'th-TH',
            file: 'th-TH.js',
          },
          {
            name: 'English',
            code: 'en',
            iso: 'en-EN',
            file: 'en-EN.js',
          },
          {
            name: 'Russian',
            code: 'ru',
            iso: 'ru-RU',
            file: 'ru-RU.js',
          },
        ],
        langDir: 'lang/',
        defaultLocale: 'th',
      },
    ],
    '@nuxtjs/style-resources',
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
    baseUrl: process.env.BASE_URL
  },
}
