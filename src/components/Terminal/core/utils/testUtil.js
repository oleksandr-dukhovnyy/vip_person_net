const util = {
	name: 't',
	function: ({ log }) => {
		log({
			text: '123',
		});
	},
};

window.EOSTerm.use(0, util);
