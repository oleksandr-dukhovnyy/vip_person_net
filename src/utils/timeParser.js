// from ISO 8601 to format

const normalize = (n) => (n < 10 ? `0${n}` : n);
const metdosAliases = {
	year: 'getFullYear',
	month: 'getMonth',
	day: 'getDate',
	hour: 'getHours',
	minutes: 'getMinutes',
};
const parse = (time, methods) => {
	const date = new Date(time);
	const rez = methods.reduce(
		(a, m) => ((a[m] = normalize(date[metdosAliases[m]]())), a),
		{}
	);

	rez.month !== undefined ? normalize(rez.month++) : null;

	return rez;
};

function DDMMYYYY_ttmm(time) {
	const { year, month, day, hour, minutes } = parse(time, [
		'year',
		'month',
		'day',
		'hour',
		'minutes',
	]);

	return `${day}.${month}.${year} ${hour}:${minutes}`;
}

function DDMMYY(time) {
	const { year, month, day } = parse(time, ['day', 'year', 'month']);

	return `${day}.${month}.${year - 2000}`;
}

function YYYY(time) {
	const { year } = parse(time, ['year']);

	return `${year}`;
}

function MM(time) {
	const { month } = parse(time, ['month']);

	return `${month}`;
}

export { DDMMYYYY_ttmm, DDMMYY, YYYY, MM, normalize };

export default {
	DDMMYYYY_ttmm,
	DDMMYY,
	YYYY,
	MM,
};
