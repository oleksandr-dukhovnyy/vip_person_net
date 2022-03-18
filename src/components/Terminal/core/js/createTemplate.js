export default ({
	node,
	callback,
	commandsHistory = [],
	currentCommand = { value: 0 },
	userName = '',
	logToConsole = () => {},
	config,
}) => {
	const wrapper = document.createElement('div');
	wrapper.classList.add('eos-commandline');

	wrapper.innerHTML = `
		  <div class="eos-commandline-output"></div>
		  <div class="eos-commandline-input">
			<div class="eos-commandline-input-user"></div>
			<input class="eos-commandline-input-input" />
		  </div>
		<div class="eos-commandline-background">
			███████╗░█████╗░░██████╗████████╗███████╗██████╗░███╗░░░███╗
			██╔════╝██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗████╗░████║
			█████╗░░██║░░██║╚█████╗░░░░██║░░░█████╗░░██████╔╝██╔████╔██║
			██╔══╝░░██║░░██║░╚═══██╗░░░██║░░░██╔══╝░░██╔══██╗██║╚██╔╝██║
			███████╗╚█████╔╝██████╔╝░░░██║░░░███████╗██║░░██║██║░╚═╝░██║
			╚══════╝░╚════╝░╚═════╝░░░░╚═╝░░░╚══════╝╚═╝░░╚═╝╚═╝░░░░░╚═╝
		</div>
	`;

	const input = wrapper.querySelector('input');
	const output = wrapper.querySelector('.eos-commandline-output');
	const user = wrapper.querySelector('.eos-commandline-input-user');

	user.innerText = userName;

	const dollar = document.createElement('span');
	dollar.innerText = '$';
	dollar.classList.add('eos-commandline-input-user-dollar');
	user.appendChild(dollar);

	input.addEventListener('keydown', (e) => {
		const key = e.key.toLowerCase();
		if (key === 'enter') {
			callback(input.value, (...p) => {
				logToConsole(output, config, ...p);
			});
			input.value = '';
		} else if (key === 'arrowup') {
			if (commandsHistory[currentCommand.value] !== undefined) {
				input.value = commandsHistory[currentCommand.value--];
				input.selectionStart = input.value.length;
			}
		}
	});
	node.innerHTML = null;
	node.appendChild(wrapper);
};
