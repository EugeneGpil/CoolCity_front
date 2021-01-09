export default {
  lazy: true,
  seo: false,
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
  strategy: 'prefix',
}
