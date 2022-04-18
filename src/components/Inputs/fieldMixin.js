import { supportedTypes, errorList } from './index.js';
import validate from '@/utils/validations/validations.js';

export default {
	data() {
		return {
			focused: false,
			value: '',
			isValide: false,
			errorText:
				errorList[this.inputType].default || 'Неправильно заполненное поле!',
		};
	},
	props: {
		required: {
			type: Boolean,
			default: false,
		},
		id: {
			type: Number,
			default: 0,
		},
		label: {
			type: String,
			default: '',
		},
	},
	created() {
		if (!this.type || !supportedTypes.includes(this.type)) {
			console.log(`inputType error!`, this.type);
		}
	},
	computed: {
		error() {
			return !this.isValide;
		},
	},
	watch: {
		value() {
			this.validate();
		},
	},
	methods: {
		validate() {
			const validationRes = validate({
				type: this.type,
				data: this.value,
			});

			this.isValide = validationRes.ok;

			if (!validationRes.ok) {
				this.errorText =
					errorList[this.type][validationRes.type] !== undefined
						? errorList[this.type][validationRes.type]
						: errorList[this.type].default;
			}
		},
	},
};
