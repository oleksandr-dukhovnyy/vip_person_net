function getUniqueCode(codes, r) {
	if (r >= 1e3) throw 'cannot generate code';

	const code = Math.floor(Math.random() * 89999999 + 1e7);

	if (codes.some((c) => c === code)) {
		return getUniqueCode(codes, r + 1);
	} else {
		return code;
	}
}

export default getUniqueCode;
