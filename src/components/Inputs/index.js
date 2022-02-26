import Text from './Text.vue';
import Phone from './Phone.vue';
import Email from './Email.vue';
import Password from './Password.vue';
import UserName from './UserName.vue';
import InviteCode from './InviteCode.vue';

export const supportedTypes = [
	'text',
	'phone',
	'email',
	'password',
	'user-name',
	'invite-code',
];

export const supportedTypeAlias = {
	text: 'Text',
	phone: 'Phone',
	email: 'Email',
	password: 'Password',
	'user-name': 'UserName',
	'invite-code': 'InviteCode',
};

export const errorList = {
	email: {
		default: 'Пожалуйста, введите корректный email',
		required: 'Пожалуйста, введите email',
	},
	phone: {
		default: 'Пожалуйста, введите корректный номер телефона',
		required: 'Пожалуйста, введите номер телефона',
	},
	password: {
		default: 'Пожалуйста, введите корректный пароль',
		required: 'Пожалуйста, введите пароль',
		toShort: 'Пароль должен быть длиннее 4 символов',
	},
	'user-name': {
		default: 'Пожалуйста, введите корректное имя пользователя',
		required: 'Пожалуйста, введите имя пользователя',
		toShort: 'Имя пользователя слишком короткое',
	},
	'invite-code': {
		default: 'Пожалуйста, введите корректный пригласительный код',
		required: 'Пожалуйста, введите пригласительный код',
		forfidden: 'Такой пригласительный код не найден!',
	},
};

export const placeholders = {};

export const Modules = {
	Text,
	Phone,
	Email,
	Password,
	UserName,
	InviteCode,
};
