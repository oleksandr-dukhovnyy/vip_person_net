export default function Terminal(contain, commands = {}) {
  const usedIDBefore = {};

  const config = {
    output: {
      defaultFontSize: '1em',
      defaultFontFamily: 'sans-serif',
      defaultColor: '#fff',
      showArrowByDefault: false,
    },
    input: {
      showInput: false,
    },
  };

  const newFlowID = () => {
    const id = Math.floor(Math.random() * 1e8);

    if (usedIDBefore[id] !== undefined) {
      return newFlowID();
    }

    return id;
  };

  const commandsHistory = [];
  let currentCommand = 0;
  const flows = {};

  const commandParser = (str) => {
    const splitted = str.split(' ');
    return {
      command: splitted[0],
      params: splitted.slice(1),
    };
  };

  const logToConsole = (
    output,
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

    output.appendChild(div);
    output.scroll(0, output.scrollHeight);
  };

  const createTemplate = (node, callback) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('eos-commandline');

    wrapper.innerHTML = `
      		<div class="eos-commandline-output"></div>
      		<div class="eos-commandline-input">
        		<div class="eos-commandline-input-dollar">$</div>
        		<input class="eos-commandline-input-input" />
      		</div>
    	`;

    const input = wrapper.querySelector('input');
    const output = wrapper.querySelector('.eos-commandline-output');

    input.addEventListener('keydown', (e) => {
      const key = e.key.toLowerCase();
      if (key === 'enter') {
        callback(input.value, (...p) => {
          logToConsole(output, ...p);
        });
        input.value = '';
      } else if (key === 'arrowup') {
        if (commandsHistory[currentCommand] !== undefined) {
          input.value = commandsHistory[currentCommand--];
          input.selectionStart = input.value.length;
        }
      }
    });
    node.innerHTML = null;
    node.appendChild(wrapper);
    this.commandLineNode = wrapper;
  };

  this.node =
    typeof contain === 'string' ? document.querySelector(contain) : contain;

  if (commands['--help'] === undefined) {
    commands['--help'] = ({ log }) => {
      log({
        text: `commands: ${Object.keys(commands)
          .filter((c) => c !== '--help')
          .join(', ')}`,
      });
    };
  }

  if (commands.clear === undefined) {
    commands.clear = ({ log }, p) => {
      const clearOutput = p.includes('*') || p.includes('-o');
      const clearFlows = p.includes('*') || p.includes('-f');

      if (clearOutput) {
        this.output.innerHTML = null;
      }

      if (clearFlows) {
        for (let processID in this.flows) {
          this.flows[processID].stop();
        }
      }
    };
  }

  createTemplate(this.node, (command, showRez) => {
    if (config.input.showInput) {
      showRez(
        {
          text: `< ${command}`,
        },
        false
      );
    }

    commandsHistory.push(command);
    currentCommand = commandsHistory.length - 1;
    const parsed = commandParser(command);

    if (commands[parsed.command] !== undefined) {
      const api = {
        log: showRez,
        closeProcess: null,
      };

      const commandConfig = commands[parsed.command](api, parsed.params);

      if (
        commandConfig !== undefined &&
        commandConfig.isProcess !== undefined
      ) {
        const id = newFlowID();
        flows[id] = {
          processName: commandConfig.name,
          command: parsed.command,
          stop: () => {
            commandConfig.stop();
            delete flows[id];
          },
          id,
        };
        api.closeProcess = flows[id].stop;
      } else {
        api.log = null;
      }
    } else {
      const styles = {};
      try {
        showRez({ text: eval(command), styles });
      } catch (err) {
        showRez({ text: err, styles: { color: '#f00' } });
      }
    }
  });

  this.output = this.node.querySelector('.eos-commandline-output');
  this.input = this.node.querySelector('.eos-commandline-input-input');
  this.flows = flows;
  this.log = (...p) => {
    logToConsole(this.output, ...p);
  };
  this.config = config;
  this.commands = commands;
}
