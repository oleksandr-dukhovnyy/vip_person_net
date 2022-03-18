import fs from './fs.js';

const setupFiles = () => {
	for (let key in localStorage) {
		if (/root\/utils\/.*/.test(key)) {
			fs.read(key).then(eval);
		}
	}
};

export default setupFiles;
