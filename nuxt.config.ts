const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  devtools: { enabled: false },
  pages: true,
  css: ['~/assets/scss/app.scss'],
  telemetry: false,
  webpack: {
    extractCSS: true,
  },
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg', href: '/favicon.svg' }],
    },
  },
  ssr: false,
  vite: {
    plugins: [{ src: '~/plugins/clickOutside.ts' }],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/scss/imports.scss";',
        },
      },
    },
    define: {
      SUPABASE_URL: `'${SUPABASE_URL}'`,
      SUPABASE_KEY: `'${SUPABASE_KEY}'`,
    },
  },
  router: {
    // @ts-ignore
    scrollBehavior() {
      window.scrollTo({
        top: 0,
      });
    },
  },
});
