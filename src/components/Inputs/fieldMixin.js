import { supportedTypes, errorList } from './index.js';
import validate from '@/utils/validations/validations.js';

export default {
	data() {
		return {
			model: '',
			value: '',
			isValide: false,
			errorText: errorList[this.inputType].default,
		};
	},
	props: {
		inputType: {
			type: String,
			validate: (v) => supportedTypes.includes(v),
			required: true,
		},
		required: {
			type: Boolean,
			default: false,
		},
		id: {
			type: Number,
			default: 0,
		},
	},
	computed: {
		error() {
			return !this.isValide && this.value.length > 0;
		},
	},
	methods: {
		validate() {
			this.value = this.model;

			const validationRes = validate({
				type: this.inputType,
				data: this.value,
			});

			this.isValide = validationRes.ok;

			if (!validationRes.ok) {
				this.errorText =
					errorList[this.inputType][validationRes.type] !== undefined
						? errorList[this.inputType][validationRes.type]
						: errorList[this.inputType].default;
			}
		},
		removeError() {
			this.value = '';
		},
	},
};
