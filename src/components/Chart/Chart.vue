<template>
  <div class="chart">
	  <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/dist/chart.js';
import { DDMMYY } from '@/utils/timeParser.js';

function calculePoints() {
	return JSON.parse(JSON.stringify(
		this.actions.map(a => +a.value)
	));
}

function calculeDates() {
	return JSON.parse(JSON.stringify(
		this.actions.map(a => DDMMYY(a.date))
	));
}

export default {
	name: 'Chart',
	props: {
		actions: {
			type: Array
		}
	},
	computed: {
		ctx(){
			return this.$refs?.canvas?.getContext('2d');
		}
	},
	watch: {
		actions(){
			const points = calculePoints.call(this);
			const dates = calculeDates.call(this);

			this.chart.data.labels = points;

			this.chart.update();

			this.chart.data.datasets[0] = {
				label: '',
				data: calculePoints.call(this),
				backgroundColor: [this.config.ui.colors.cta],
				borderColor: ['#ffb800'],
				borderWidth: 3
			};

			this.chart.options = {
				tooltips: {
					enabled: false
				}
			}

			this.chart.update();
		}
	},
	mounted(){
		this.chart = new Chart(this.ctx, {
			type: 'line',
			data: {
				labels: calculeDates.call(this),
				datasets: [{
					label: '',
					data: calculePoints.call(this),
					backgroundColor: [this.config.ui.colors.cta],
					borderColor: [
						'#ffb800'
					],
					borderWidth: 3
				}]
			},
			options: {
				tooltips: {
         			enabled: false,
				},
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
				},
			}
		});
	}
}

</script>