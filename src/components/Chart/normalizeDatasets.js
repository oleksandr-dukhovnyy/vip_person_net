import { YYYY, MM, normalize } from '@/utils/timeParser.js';

const colors = ['#ff3333', '#ff3333', '#ff3333'];
const colorsGenerator = (n, lastYear) => {
	console.log('colorsGenerator', n);
	return n === lastYear ? '#ffb800' : colors[n];
};

const normalizeDatasets = (actions) => {
	actions = JSON.parse(JSON.stringify(actions));
	/*
		labels: calculeDates.call(this).reverse(),
		datasets: [{
			label: '',
			data: calculePoints.call(this).reverse(),
			backgroundColor: [this.config.ui.colors.cta],
			borderColor: [
				'#ffb800'
			],
			borderWidth: 3
		}]
	*/

	const years = {};
	const datasets = [];

	// actions
	// 	.reduce((a, c) => {
	// 		a[YYYY(c.date)] = [];
	// 		return a;
	// 	}, {})
	// 	.keys();

	actions.forEach((a) => {
		const year = YYYY(a.date);
		const month = MM(a.date);

		if (years[year] !== undefined) {
			years[year].data[month] = a.value;
		} else {
			years[year] = {
				label: year,
				data: Array(12).fill(NaN),
				borderWidth: 3,
			};

			years[year].data[month] = a.value;
		}
	});

	for (let year in years) {
		datasets.push(years[year]);
	}

	console.log(datasets);

	datasets.forEach(
		(d, i, arr) =>
			(d.backgroundColor = d.borderColor =
				colorsGenerator(arr.length - i, datasets.length))
	);

	return {
		labels: Array(12)
			.fill('')
			.map((_, i) => normalize(i + 1)),
		datasets,
	};
};

export default normalizeDatasets;
