// const SUPABASE_URL = process.env.SUPABASE_URL;
// const SUPABASE_KEY = process.env.SUPABASE_KEY;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  pages: true,
  css: ['~/assets/scss/app.scss'],
  telemetry: false,
  webpack: {
    extractCSS: true,
  },
  ssr: false,
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
    // define: {
    //   SUPABASE_URL: `'${SUPABASE_URL}'`,
    //   SUPABASE_KEY: `'${SUPABASE_KEY}'`,
    // },
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
