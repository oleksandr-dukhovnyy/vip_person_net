import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import AppRouter from './router';
import store from './store';

import 'animate.css';

import { mapGetters } from 'vuex';

import config from '@/config.js';

import Logo from '@/components/global/Logo.vue';
import Loader from '@/components/global/Loader.vue';
// import Sprite from '@/components/global/Sprite.vue';
import clickOutside from './directives/click-outside.js';

// element-ui
import { Button, Select } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
// animate.css
import 'animate.css';

locale.use(lang);

Vue.component('eui-button', Button);
Vue.component('eui-select', Select);

Vue.component('Logo', Logo);
Vue.component('Loader', Loader);
// Vue.component('Sprite', Sprite);

Vue.config.productionTip = false;

const normalize = (n) => (n < 10 ? `0${n}` : n);

Vue.mixin({
	data() {
		return {
			config,
		};
	},
	computed: mapGetters([
		'CLIENT',
		'USER_AUTHED',
		'AUTH_LOGIN_LOADING',
		'IS_ADMIN',
	]),
	created() {
		if (
			config.needAuth.includes(this.$route.name) &&
			!this.USER_AUTHED &&
			!this.AUTH_LOGIN_LOADING
		) {
			this.$router.push({
				name: 'login',
				query: {
					next: this.$route.name,
				},
			});
		}
	},
	filters: {
		time(time) {
			const date = new Date(time);

			const year = date.getFullYear();
			const month = normalize(date.getMonth() + 1);
			const day = normalize(date.getDate());
			const hour = normalize(date.getHours());
			const minutes = normalize(date.getMinutes());

			return `${day}.${month}.${year} ${hour}:${minutes}`;
		},
	},
});

Vue.directive('click-outside', clickOutside);

new Vue({
	router: AppRouter,
	store,
	render: (h) => h(App),
}).$mount('#app');

export { AppRouter };
