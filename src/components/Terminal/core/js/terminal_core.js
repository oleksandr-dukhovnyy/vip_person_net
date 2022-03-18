/* EOSTerm v1.0.0, all right reserved. Development "Scridev" Studio for "EOS Operation System"

TODO: api.log({
	table: Object
})
Входящий объект выводится в виде таблицы.
При logConfig.table !== undefined поле logConfig.text игнорируется.

TODO: api.log({
	html: String | Node
})
Поле html предназначено для вывода html. Сторокой или как Node-элемент.
Это значительно засширяет возможности по отображению вывода и взаимодействию с пользователем.
Так-же, чтобы все элементы в консоли имели одинаковый вид - заданы стили по-умолчанию и разрботана небольшая
библиотека базовых классов, похожая на Bootstrap, но значительно легковеснее.
При logConfig.html !== undefined поле logConfig.table игнорируется.

TODO: api.log({
	dialog: String | Node,
	callback: function (userInput:string = '', closeDialog:function) {...}
})
Поле dialog предназначено для вывода диалога. Сторокой или как Node-элемент.
Далее, пользователь делает ввод, который, без обработки, попадает в callback.
Callback, в свою очередь, принимает ввод и функцию, для закрытия диалога.
При logConfig.html !== undefined поле logConfig.text игнорируется.

*/

import commandParser from './commandParser.js';
import createTemplate from './createTemplate.js';
import flagController from './flagController.js';
import { defaultClear, defaultHelp } from './defaultUtils.js';

const terms = {};
let id = 0;
const getFreeTermId = () => id++;

function Terminal(node, commands = {}, userName = '') {
	const config = {
		output: {
			defaultFontSize: '1em',
			defaultFontFamily: 'sans-serif',
			defaultColor: '#fff',
			showArrowByDefault: false,
			maxAliveLogRows: 150,
		},
		input: {
			showInput: false,
			flagMask: ['^--[a-z]+[:a-z0-9]{0,}?$', 'i'],
			getFlagName: ['--|:[a-z0-9]*$', 'gi'],
			getFlagValue: ['--[a-z]*:?', 'i'],
		},
	};

	const commandsHistory = [];
	const currentCommand = {
		value: 0,
	};

	const logToConsole = (
		output,
		config,
		{ text = '', styles = {} } = {},
		drawArrow = config.output.showArrowByDefault
	) => {
		const div = document.createElement('div');

		const span = document.createElement('span');

		span.style.color = config.output.defaultColor;
		span.style.fontSize = config.output.defaultFontSize;
		span.style.fontFamily = config.output.defaultFontFamily;

		for (const styleName in styles) {
			span.style[styleName] = styles[styleName];
		}

		span.innerText = drawArrow ? `> ${text}` : text;
		div.appendChild(span);

		if (output.children.length + 1 > config.output.maxAliveLogRows) {
			output.children[0].remove();
		}

		output.appendChild(div);
		output.scroll(0, output.scrollHeight);
	};

	if (commands.help === undefined) {
		commands.help = defaultHelp;
	}

	if (commands.clear === undefined) {
		commands.clear = defaultClear;
	}

	const exec = (command, showRez) => {
		if (config.input.showInput) {
			showRez(
				{
					text: `< ${command}`,
				},
				false
			);
		}

		commandsHistory.push(command);
		currentCommand.value = commandsHistory.length - 1;
		const parsed = commandParser(command, config);

		if (commands[parsed.command] !== undefined) {
			const api = {
				log: showRez,
				closeProcess: null,
				flags: flagController(parsed.flags),
				exec: (c) => exec(c, showRez),
				source: command,
				commandLine: this,
			};

			try {
				commands[parsed.command](api, parsed.params);
			} catch (err) {
				showRez({
					text: `[command error]: "${err}"`,
					styles: { color: '#f00' },
				});
			}
		} else {
			try {
				const styles = {};
				showRez({ text: eval(command) }, styles);
			} catch (err) {
				showRez({ text: `[eval err]: "${err}"`, styles: { color: '#f00' } });
			}
		}
	};

	this.node = node;

	createTemplate({
		node: this.node,
		callback: exec,
		commandsHistory,
		currentCommand,
		userName,
		config,
		logToConsole,
	});

	this.output = this.node.querySelector('.eos-commandline-output');
	this.input = this.node.querySelector('.eos-commandline-input-input');
	this.log = (...p) => {
		logToConsole(this.output, config, ...p);
	};
	this.config = config;
	this.commands = commands;
	this.exec = (c) =>
		exec(c, (...p) => {
			logToConsole(this.output, config, ...p);
		});

	this.id = getFreeTermId();

	terms[this.id] = this;
}

export default Terminal;
