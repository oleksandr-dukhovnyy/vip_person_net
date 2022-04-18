export default (max, min = 0, toFixed = 0) =>
	(Math.random() * (max - min) + min).toFixed(toFixed);
