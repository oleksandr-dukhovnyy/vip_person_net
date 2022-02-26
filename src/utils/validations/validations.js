const validator = (value, regExpr, minLength = 1) => {
	if (value.length < minLength) {
		return {
			ok: false,
			type: 'toShort',
		};
	} else if (regExpr.test(value)) {
		return {
			ok: true,
		};
	} else {
		return {
			ok: false,
			type: 'default',
		};
	}
};

const rules = {
	email: (v) => validator(v, /^[a-z0-9]{3,}@[a-z0-9]{2,}\.[a-z0-9]{2,6}.*$/i),
	phone: (v) =>
		validator(/^\+[0-9]{1,3}\s?[0-9]{3}\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}$/),
	'invite-code': (v) => validator(v, /^[0-9]{6}$/i),
	text: (v) => validator(v, /.*/, 0),
	password: (v) => validator(v, new RegExp('*'), 5),
};

function validate({ type, data }) {
	if (rules[type] === undefined) {
		throw new Error('[validations]: unknow validation type');
	}

	return rules[type](data);
}

export default validate;
