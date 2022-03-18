<template>
	<div
		class="terminal"
		:class="{fullscreen: fullscreen}"
		:style="style"
		ref="terminal"
		v-show="show"
	></div>
</template>

<script>
import Terminal from './core/js/terminal_core.js';
import api from '@/utils/API/API';
import { mapGetters } from 'vuex';

const vuexGetters = ['USER_NAME'];

const API = new api();

const sides = [
	function() { this.style = 'top: 10px; left: 10px; bottom: unset; right: unset;' },
	function() { this.style = 'top: 10px; right: 10px; bottom: unset; left: unset;' },
	function() { this.style = 'bottom: 10px; left: 10px; top: unset; right: unset;' },
	function() { this.style = 'bottom: 10px; right: 10px; top: unset; left: unset;' },
	function() {
		this.style = 'top: 10px; left: 10px; bottom: unset; right: unset;';
		this.fullscreen = true;
		this.$refs.terminal
			.querySelector('.eos-commandline')
			.setAttribute('style', 'height: 100%; width: 100%;');
	}
];

const needSlashesToActive = 2;

function move({ log }, [side = localStorage.getItem('terminal-side')]) {
	this.fullscreen = false;
	this.$refs.terminal
		.querySelector('.eos-commandline').setAttribute('style', '');

	const foo = sides[side];

	if (foo !== undefined) {
		foo.call(this);
		this.side = side;
	} else {
		log({
			text: `unknow side: ${side}`
		});
	}
}

export default {
	name: 'Terminal',
	data: () => ({
		show: false,
		terminal: null,
		style: '',
		fullscreen: false,
		side: localStorage.getItem('terminal-side')
			? localStorage.getItem('terminal-side')
			: 0
	}),
	watch: {
		show(n){
			if (n) {
				setTimeout(() => {
					this.terminal.input.focus();
				}, 40)
			}
		},
		side(s){
			localStorage.setItem('terminal-side', s);
		}
	},
	mounted(){
		this.terminal = new Terminal(this.$refs.terminal, {
			API: ({ log }, params) => {
				const [method, ...args] = params;

				if (method === '--help') {
					log({
						text: API.apiList
					});
					return;
				}

				API[method](...args)
					.then(res => {
						log({
							text: JSON.stringify(res)
						});
					}).catch(err => {
						log({
							text: err,
							styles: {
								color: '#f00'
							}
						});
					})
			},
			'API-json': ({ log }, params) => {
				const [method, ...args] = params;

				API[method](...args.map(JSON.parse))
					.then(res => {
						log({
							text: JSON.stringify(res)
						});
					}).catch(err => {
						log({
							text: err,
							styles: {
								color: '#f00'
							}
						});
					})
			},
			close: () => {
				this.show = false;
			},
			move: move.bind(this),
			reload(){
				location.reload();
			}
		}, this.USER_NAME === 'Гость' ? 'guest' : this.USER_NAME);

		let presses = 0;

		document.addEventListener('keydown', e => {
			if (e.key === '/') {
				presses++;

				if (presses >= needSlashesToActive) {
					this.show = true;
					presses = 0;
				}
			} else {
				presses = 0;
			}
		});

		move.call(this, {log: () => {}}, [this.siide]);
	},
	computed: {
		...mapGetters(vuexGetters)
	}
}

</script>

<style src="./terminal.scss" lang="scss"></style>