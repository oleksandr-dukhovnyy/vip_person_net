const state = {
	stats: {
		requests: {},
	},
	stoped: false,
};

const testStop = (log) => {
	state.stoped = true;
	log({
		text: 'testing was stopped',
	});
};
const testContinue = () => (state.stoped = false);

const request = (url, callback, errCallback) => {
	fetch(url, {
		mode: 'no-cors',
	})
		.then(callback)
		.catch(errCallback)
		.finally(() => {
			state.stats.requests[url]++;
		});
};

function test(config, log, urls) {
	if (state.stoped) return;

	urls.forEach((url) => {
		if (state.stats.requests[url] === undefined) state.stats.requests[url] = 1;

		request(
			url,
			(res) => {
				if (state.stoped) return;
				log({
					text: `[${state.stats.requests[url]}] ${url} -> ok - ${res.ok}, status: ${res.status}`,
				});

				setTimeout(() => {
					test(config, log, [url]);
				}, config.delay || 0);
			},
			() => {
				if (state.stoped) return;

				log({
					text: `[${state.stats.requests[url]}] ${url} -> down!`,
					styles: {
						color: '#0f0',
					},
				});

				setTimeout(() => {
					test(config, log, [url]);
				}, 10000);
			}
		);
	});
}

function testForce(config, log, urls) {
	if (state.stoped) return;

	urls.forEach((url) => {
		if (state.stats.requests[url] === undefined) state.stats.requests[url] = 1;

		const id = setInterval(() => {
			request(
				url,
				(res) => {
					if (state.stoped) return clearInterval(id);

					log({
						text: `[${state.stats.requests[url]}] ${url} -> ok - ${res.ok}, status: ${res.status}`,
					});
				},
				() => {
					if (state.stoped) return clearInterval(id);

					log({
						text: `[${state.stats.requests[url]}] ${url} -> down!`,
						styles: {
							color: '#0f0',
						},
					});
				}
			);
		}, config.delay);
	});

	log({
		text: 'testForce',
	});
}

export default ({ log, flags }, urls) => {
	if (flags.hasFlag('stop')) {
		return testStop(log);
	} else {
		testContinue();
	}

	if (!urls.length) {
		return log({
			text: `please, enter urls`,
		});
	}

	const config = {
		delay: +flags.getFlag('delay')?.value || 0,
	};

	const flagsMsg = flags.flags.length
		? `with flags: [${flags.flags.map((f) =>
				f.value ? `${f.name}: ${f.value}` : f.name
		  )}]`
		: 'without flags';

	log({
		text: `test for ${urls.length} urls is started ${flagsMsg}`,
		styles: {
			color: '#00e000',
		},
	});

	if (flags.hasFlag('force')) {
		log({
			text: 'test mode: wait timeout (--delay:[delay] flag) -> request',
			styles: {
				color: '#4040ff',
			},
		});
		testForce(config, log, urls);
	} else {
		log({
			text: 'test mode: request -> wait response -> wait timeout (--delay:[delay] flag) -> request',
			styles: {
				color: '#4040ff',
			},
		});
		test(config, log, urls);
	}
};
