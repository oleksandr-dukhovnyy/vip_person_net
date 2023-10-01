import fs from './fs.js';
import setupFiles from './setupFiles.js';

const setup = () => {
  setupFiles();
};

const install = (log, nameFlag) => {
  if (!nameFlag)
    return log({
      text: 'set a "--name:[UTILNAME]" flag',
      styles: {
        color: '#f00',
      },
    });

  log({
    text: 'install start...',
  });

  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.style.opacity = 0;
  input.style.position = 'absolute';

  input.addEventListener('change', () => {
    fs.write(`root/utils/${nameFlag.value}.js`, input.files[0])
      .then(() => {
        log({
          text: `instalation "${nameFlag.value}" was finished!`,
          styles: {
            color: '#0f0',
          },
        });
      })
      .catch((err) => {
        log({
          text: `install error: "${err}"`,
          styles: {
            color: '#0f0',
          },
        });
      })
      .finally(() => {
        input.remove();
        setupFiles();
      });
  });

  document.querySelector('body').appendChild(input);
  input.click();
};

const uninstall = () => {
  //...
};

const app = ({ log, flags, commandLine }) => {
  if (flags.hasFlag('setup')) return setup();

  if (flags.hasFlag('install')) return install(log, flags.getFlag('name'));

  if (flags.hasFlag('uninstall') || flags.hasFlag('rm'))
    return uninstall(log, flags.getFlag('name'), commandLine);
};

export default app;
