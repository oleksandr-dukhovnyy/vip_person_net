// const SUPABASE_URL = process.env.SUPABASE_URL;
// const SUPABASE_KEY = process.env.SUPABASE_KEY;

const getNoSSRList = (list: string[]) =>
  Object.fromEntries(list.map((r) => [r, { ssr: false }]));

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
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
  routeRules: {
    '/': { swr: true },
    ...getNoSSRList(['404', 'cabinet', 'email-verify', 'master']),
  },
  vite: {
    // @ts-ignore
    plugins: [{ src: '~/plugins/clickOutside.ts' }],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/scss/imports.scss";',
        },
      },
    },
    define: {
      SUPABASE_URL: `'${process.env.SUPABASE_URL}'`,
      SUPABASE_KEY: `'${process.env.SUPABASE_KEY}'`,
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
