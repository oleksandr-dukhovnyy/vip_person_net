const fs = {
	read(path) {
		return new Promise((r) => {
			r(localStorage.getItem(path));
		});
	},
	write(path, file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.onload = () => {
				resolve(localStorage.setItem(path, reader.result));
			};
			reader.onerror = reject;

			reader.readAsText(file);
		});
	},
};

export default fs;
