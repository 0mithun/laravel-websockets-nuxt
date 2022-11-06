require('dotenv').config()

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'websocket-api',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [

  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/dotenv',
    [
      '@nuxtjs/laravel-echo',
      {
        broadcaster: 'pusher',
        key: process.env.PUSHER_APP_KEY,
        cluster: process.env.PUSHER_APP_CLUSTER,
        encrypted: false,
        wsHost: process.env.WEBSOCKET_BASE_URL,
        authEndpoint: process.env.API_URL + '/broadcasting/auth',
        wsPort: 6001,
        wssPort: 6001,
        disableStats: true,
        forceTLS: false,
        enabledTransports: ['ws', 'wss']
        // authModule: true,
        // auth: {
        //   headers: {
        //     Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTYzNDYzOTU4NiwiZXhwIjoxNjM1MjQ0Mzg2LCJuYmYiOjE2MzQ2Mzk1ODYsImp0aSI6IlBLODFTSTVwWVVtVTlFN1QiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.wq9JplKSU9v1w9_k-ZB_jBBLnVLyT3EabC1hNJ7K_p4',
        //   }
        // },
      }
    ]
  ],
  echo: {
    authModule: true,
    connectOnLogin: true,
    disconnectOnLogout: true
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_URL,
    credentials: true,
    headers: { Accept: 'application/json' }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  // proxy: {
  //   '/laravel': {
  //     target: 'https://laravel-auth.nuxtjs.app',
  //     pathRewrite: { '^/laravel': '/' }
  //   }
  // },

  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/'
    },
    strategies: {
      local: {
        token: {
          property: 'data.token.access_token',
          global: true,
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: 'data',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/login', method: 'post' },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/me', method: 'get',  }
        }
      }
    },
    plugins: [{
      src: '~/plugins/nuxtauth.js',
      ssr: false
    }]
  }
}
