<template>
  <div class="chart">
	  <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/dist/chart.js';
import { DDMMYY } from '@/utils/timeParser.js';

export default {
	name: 'Chart',
	props: {
		actions: {
			type: Array
		}
	},
	data: {},
	computed: {
		ctx(){
			return this.$refs?.canvas?.getContext('2d');
		}
	},
	watch: {
		actions(){
			console.log('actions')
			
		}
	},
	mounted(){
		const values = this.actions.map(a => a.value);
		const dates = this.actions.map(a => DDMMYY(a.date));

		this.chart = new Chart(this.ctx, {
			type: 'line',
			data: {
				labels: dates,
				datasets: [{
					label: '',
					data: values,
					backgroundColor: [this.config.ui.colors.cta],
					borderColor: [
						'#ffb800'
					],
					borderWidth: 3
				}]
			},
			options: {
				animations: {
					y: {
						easing: 'easeInOutElastic',
						from: (ctx) => {
							if (ctx.type === 'data') {
								if (ctx.mode === 'default' && !ctx.dropped) {
									ctx.dropped = true;
									return 0;
								}
							}
						}
					}
				},
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});
	}
}

</script>

<style lang="scss" scoped>
	.chart {
		margin: auto;
		width: 480px;
		height: 290px;
	}
</style>