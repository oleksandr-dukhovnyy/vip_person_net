import Vue from 'vue';
import VueRouter from 'vue-router';

import Main from '../views/Main.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import ErrorPage from '../views/ErrorPage.vue';
import Cabinet from '../views/Cabinet.vue';
import Master from '../views/Master.vue';

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
	},
	{
		path: '/master',
		name: 'master',
		// redirect: { name: '404' },
		component: Master,
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
	routes,
});

export default router;
