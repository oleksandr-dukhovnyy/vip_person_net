export default (() => {
	const _cache = {};

	return {
		getData(id) {
			console.log(
				_cache[id] !== undefined
					? performance.now() - _cache[id].stamp < _cache[id].time
					: undefined
			);

			return null;

			return _cache[id] &&
				performance.now() - _cache[id].stamp < _cache[id].time
				? _cache[id].data
				: (_cache[id] = null);
		},
		write(id, data, time = 1000) {
			_cache[id] = {
				data: JSON.parse(JSON.stringify(data)),
				stamp: performance.now(),
				time,
			};

			return 1;
		},
		clear(id) {
			return delete _cache[id];
		},
	};
})();
