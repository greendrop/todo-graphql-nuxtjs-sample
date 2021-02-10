import colors from 'vuetify/es5/util/colors'
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import pkg from './package'
require('dotenv').config()

export default {
  srcDir: 'src',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - todo-graphql-nuxtjs-sample',
    title: 'todo-graphql-nuxtjs-sample',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/vee-validate'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',
    // https://github.com/nuxt-community/community-modules/tree/master/packages/toast
    '@nuxtjs/toast',
    // https://i18n.nuxtjs.org/
    'nuxt-i18n',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ja',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      icons: 'fa',
    },
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // dotenv configuration
  dotenv: {
    path: './',
  },

  // Auth configuration
  auth: {
    redirect: {
      login: '/users/sign_in',
      logout: '/users/sign_out',
      callback: '/users/auth/callback',
      home: '/',
    },
    strategies: {
      oauth2: {
        scheme: 'oauth2',
        endpoints: {
          authorization: `${process.env.AUTH_API_BASE_URL}/auth/oauth/authorize`,
          token: `${process.env.AUTH_API_BASE_URL}/auth/oauth/token`,
          userInfo: `${process.env.AUTH_API_BASE_URL}/api/v1/me`,
        },
        responseType: 'code',
        grantType: 'authorization_code',
        clientId: process.env.AUTH_API_OAUTH2_CLIENT_ID,
      },
    },
  },

  // Toast configuration
  toast: {
    position: 'top-right',
    duration: 5000,
  },

  // i18n configuration
  i18n: {
    locales: [
      {
        code: 'ja',
        iso: 'ja',
        file: 'ja.js',
      },
    ],
    defaultLocale: 'ja',
    lazy: true,
    langDir: 'locales/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate/dist/rules'],
  },
}
