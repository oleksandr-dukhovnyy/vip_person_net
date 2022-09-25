import Vue from 'vue';
import VueRouter from 'vue-router';

import Main from '../views/Main.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import ErrorPage from '../views/ErrorPage.vue';
import Cabinet from '../views/Cabinet.vue';
import Master from '../views/Master.vue';

import store from '../store/index.js';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
  },
  {
    path: '/login',
    name: 'login',
    redirect: { name: 'vip-login' },
    //component: Login,
    meta: {
      isVipLogin: false,
    },
  },
  {
    path: '/vip-login',
    name: 'vip-login',
    component: Login,
    meta: {
      isVipLogin: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      isVipRegister: false,
    },
  },
  {
    path: '/vip-register',
    name: 'vip-register',
    component: Register,
    meta: {
      isVipRegister: true,
    },
  },
  {
    path: '/cabinet',
    name: 'cabinet',
    component: Cabinet,
    meta: { requiresAuth: true, dontLogout: true },
  },
  {
    path: '/master',
    name: 'master',
    // redirect: { name: '404' },
    component: Master,
    meta: { requiresAuth: true, dontLogout: true },
  },
  {
    path: '/404',
    name: '404',
    component: ErrorPage,
    params: {
      errorCode: 404,
    },
  },
  {
    path: '*',
    redirect: { name: '404' },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});

router.beforeResolve((to, from, next) => {
  // console.log('to %o;', JSON.parse(JSON.stringify(to)));
  // console.log('client', store.getters);

  // if (to.meta.requiresAuth && !store.getters.USER_AUTHED) {
  //   if (to.meta.admin === true && !store.getters.IS_ADMIN) {
  //     return next({ name: '404' });
  //   }

  //   return next({
  //     name: 'Login',
  //     query: {
  //       next: to.name,
  //     },
  //   });
  // }

  if (!to.meta.dontLogout && store.getters.USER_AUTHED) {
    store.dispatch('LOGOUT');

    if (to.name !== 'main') {
      return next({ name: 'main' });
    }
  }

  next();
});

export default router;
