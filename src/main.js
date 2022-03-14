import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import AppRouter from './router';
import store from './store';

import 'animate.css';

import { mapGetters } from 'vuex';

import config from '@/config.js';
import notificate from '@/utils/notification.js';
import { DDMMYYYY_ttmm as dateParser } from '@/utils/timeParser';

import Logo from '@/components/global/Logo.vue';
import Loader from '@/components/global/Loader.vue';
// import Sprite from '@/components/global/Sprite.vue';
import clickOutside from './directives/click-outside.js';

// element-ui
import DatePicker from 'element-ui/lib/date-picker';

import 'element-ui/lib/theme-chalk/date-picker.css';
import 'element-ui/lib/theme-chalk/icon.css';
import 'element-ui/lib/theme-chalk/button.css';
import 'element-ui/lib/theme-chalk/notification.css';

import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

import 'animate.css';

locale.use(lang);

// Vue.component('eui-button', Button);
// Vue.component('eui-select', Select);
Vue.component('eui-date', DatePicker);

Vue.component('Logo', Logo);
Vue.component('Loader', Loader);
// Vue.component('Sprite', Sprite);

Vue.config.productionTip = false;

const rolesTranslate = {
	resident: 'Резидент',
	admin: 'Администратор',
	user: 'Пользователь',
};

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
		'IS_RESIDENT',
		'CLIENT_DATA',
		'USER_NAME',
	]),
	created() {
		if (
			config.needAuth.includes(this.$route?.name) &&
			!this.USER_AUTHED &&
			!this.AUTH_LOGIN_LOADING
		) {
			this.$router.push({
				name: 'login',
				query: {
					next: this.$route?.name,
				},
			});
		}
	},
	filters: {
		timeFromISO8601: (t) => dateParser(t),
		text: (v) => (v !== undefined ? v : '-'),
		role: (v) => (rolesTranslate[v] ? rolesTranslate[v] : v),
		number0: (v) => (+v).toFixed(0),
		number2: (v) => (+v).toFixed(2),
		number4: (v) => (+v).toFixed(4),
	},
	methods: {
		notificate,
	},
});

Vue.directive('click-outside', clickOutside);

new Vue({
	router: AppRouter,
	store,
	render: (h) => h(App),
}).$mount('#app');

export { AppRouter };
