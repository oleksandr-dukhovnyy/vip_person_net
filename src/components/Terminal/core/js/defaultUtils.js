function clear({ flags, commandLine }) {
	if (flags.hasFlag('c')) {
		const count = +flags.getFlag('c').value || Infinity;

		[...commandLine.output.children].forEach((el, i) =>
			i < count ? el.remove() : null
		);
	} else {
		commandLine.output.innerHTML = null;
	}
}

function help({ log, commandLine }) {
	log({
		text: `commands: ${Object.keys(commandLine.commands)
			.filter((c) => c !== 'help')
			.join(', ')}`,
	});
}

export { clear as defaultClear, help as defaultHelp };
