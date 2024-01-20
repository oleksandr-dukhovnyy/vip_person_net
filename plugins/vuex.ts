// @ts-expect-error
import store from '~/store';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store);
});
