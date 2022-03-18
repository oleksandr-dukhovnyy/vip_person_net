import getFlags from './getFlags.js';

const commandParser = (str, config) => {
  const splitted = str.split(' ');
  const { params, flags } = getFlags(splitted.slice(1), config);

  return {
    command: splitted[0],
    params,
    flags,
  };
};

export default commandParser;
