import Text from './fields/PlainText.vue';
import Phone from './fields/Phone.vue';
import Email from './fields/Email.vue';
import Password from './fields/Password.vue';
import UserName from './fields/UserName.vue';
import InviteCode from './fields/InviteCode.vue';

export const supportedTypes = [
  'text',
  'phone',
  'email',
  'password',
  'user-name',
  'invite-code',
];

export const supportedTypeAlias = {
  text: 'PlainText',
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

export const Fields = {
  Text,
  Phone,
  Email,
  Password,
  UserName,
  InviteCode,
};
