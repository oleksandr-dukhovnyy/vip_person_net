<template>
  <section class="page">
    <div class="register__form">
      <div>
        <h1 class="register__form-title">Регистрация резидентов</h1>
      </div>
      <div class="dropdown-divider"></div>
      <div class="register__row">
        <div class="register__title register__title--required">
          Пригласительный код
        </div>
        <input
          type="text"
          v-model="code"
          ref="code"
          :class="{
            error: errors.code.value,
          }"
          @keydown.enter="$refs.name.focus()"
        />
      </div>
      <div class="register__row">
        <div class="register__title register__title--required">
          Имя пользователя
        </div>
        <input
          type="text"
          v-model="name"
          ref="name"
          :class="{
            error: errors.name.value,
          }"
          @keydown.enter="$refs.email.focus()"
        />
      </div>
      <div class="register__row">
        <div class="register__title register__title--required">Email</div>
        <input
          type="text"
          v-model="email"
          ref="email"
          :class="{
            error: errors.email.value,
          }"
          @keydown.enter="$refs.phone.focus()"
        />
      </div>
      <div class="register__row">
        <div class="register__title">Телефон</div>
        <input
          type="text"
          v-model="phone"
          ref="phone"
          :class="{
            error: errors.phone.value,
          }"
          @keydown.enter="$refs.pass1.focus()"
        />
      </div>
      <div class="register__row">
        <div class="register__title register__title--required">Пароль</div>
        <input
          type="text"
          v-model="pass1"
          ref="pass1"
          :class="{
            error: errors.pass1.value || errors.passessIsSame.value,
          }"
          @keydown.enter="$refs.pass2.focus()"
        />
      </div>
      <div class="register__row">
        <div class="register__title register__title--required">
          Пароль повторно
        </div>
        <input
          type="text"
          v-model="pass2"
          ref="pass2"
          :class="{
            error: errors.pass2.value || errors.passessIsSame.value,
          }"
          @keydown.enter="$refs.code.focus()"
        />
      </div>
      <div class="dropdown-divider"></div>
      <div class="register__controlls">
        <div
          class="register__controlls-policy"
          :class="{
            error: errors.policy.value,
          }"
        >
          <label>
            <input type="checkbox" :checked="policy" v-model="policy" />
            <span> Даю согласие на обработку своих персональных данных </span>
          </label>
        </div>
        <div>
          <button
            class="btn btn-success"
            :disabled="formIsValide"
            @click="register"
            v-if="!REGISTER_LOADING"
          >
            Зарегистрироваться
          </button>
          <Loader v-else />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import notify from '@/utils/notification.js';

const vuexActions = ['REGISTER'];
const vuexGetters = ['REGISTER_LOADING'];

// 89752784
// 99-57

export default {
  name: 'Register',
  data() {
    return {
      code: '99-57',
      name: 'test1',
      email: 'some@some.com',
      phone: '+380634221588',
      pass1: '123456',
      pass2: '123456',
      formIsValide: false,
      policy: true,
      errors: {
        code: {
          value: false,
          text: 'Неверный формат пригласительного кода',
        },
        name: {
          value: false,
          text: 'Введите имя пользователя',
        },
        email: {
          value: false,
          text: 'Неверный адрес электронной почты',
        },
        phone: {
          value: false,
          text: 'Неверный формат номера телефона',
        },
        pass1: {
          value: false,
          text: 'Слишком короткий пароль',
        },
        pass2: {
          value: false,
          text: 'Слишком короткий пароль',
        },
        passessIsSame: {
          value: false,
          text: 'Пароли не совпадают',
        },
        policy: {
          value: false,
          text: 'Без вашего явного согласия на обработку персональных данных мы не сможем завершить регистрацию. Мы не передаём ваши данные третьей стороне!',
        },
      },
    };
  },
  created() {
    const fields = [
      'code',
      'name',
      'email',
      'phone',
      'pass1',
      'pass2',
      'policy',
    ];

    fields.forEach((f) => {
      this.$watch(f, () => {
        this.errors[f].value = false;

        if (['pass1', 'pass2'].includes(f)) {
          this.errors.passessIsSame.value = false;
        }
      });
    });
  },
  computed: { ...mapGetters(vuexGetters) },
  methods: {
    ...mapActions(vuexActions),
    register() {
      console.log('register');

      this.validate();

      if (this.formIsValide) {
        this.REGISTER({
          email: this.email,
          password: this.pass1,
          role: 'resident',
          name: this.name,
          phone: this.phone,
          inviteCode: this.code,
        });
      }
    },
    clearErrors() {
      for (let fieldName in this.errors) {
        this.errors[fieldName] = false;
      }
    },
    validate() {
      const isValide = [
        {
          name: 'code',
          valide: /^\d{2}\-\d{2}$/.test(this.code),
        },
        {
          //valide: /([а-яё]|[a-z]|[а-ящьюяїієґ]){3,100}/i.test(this.name),
          valide: /.{3,100}/.test(this.name),
          name: 'name',
        },
        {
          valide:
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i.test(
              this.email
            ),
          name: 'email',
        },
        {
          valide:
            /^\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?$/.test(
              this.phone.replace(/\s/, '')
            ) || this.phone === '',
          name: 'phone',
        },
        {
          valide: /.{6,100}/.test(this.pass1),
          name: 'pass1',
        },
        {
          valide: /.{6,100}/.test(this.pass2),
          name: 'pass2',
        },
        {
          valide: this.pass1 === this.pass2,
          name: 'passessIsSame',
        },
        {
          valide: this.policy,
          name: 'policy',
        },
      ].every((field) => {
        if (!field.valide) {
          this.errors[field.name].value = true;
          notify(this.errors[field.name].text, '', 'error');
        }

        return field.valide;
      });

      this.formIsValide = isValide;
    },
  },
};
</script>

<style lang="scss">
.page {
  @include page();

  display: flex;
  justify-content: center;
  align-items: center;

  .register {
    &__form {
      width: 450px;
      padding: padding();
      background-color: #fff;
      border-radius: $border-radius;

      @include shadow;

      @include media-down(m) {
        width: 100%;
      }

      .dropdown-divider {
        margin: padding() 0;
      }
    }

    &__row {
      padding: padding();
      display: flex;

      @include media-down(m) {
        flex-direction: column;
      }

      input {
        @include input;
        transition: 0.3s;

        @include scaleble(1.04);

        &:focus {
          border: 1px solid #838383;
          transition: 0.3s;

          transform: none;
        }
      }
    }

    &__title {
      width: 500px;
      font-size: 14px;
      align-items: center;
      display: flex;

      @include media-down(m) {
        width: 100%;
      }

      &--required::after {
        content: '*';
        padding-left: 2px;
        color: #f00;
      }
    }

    &__form-title {
      font-size: 18px;
      text-align: center;
    }

    &__controlls {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: padding();

      @include media-down(m) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
      }

      padding: 0 padding();

      button {
        width: 100%;
        @include scaleble(1.02);
        cursor: pointer;
      }
    }

    &__controlls-policy {
      font-size: 13px;
      display: flex;

      &.error {
        color: $color-error;
      }

      label {
        display: flex;
        align-items: center;
        cursor: pointer;

        span {
          padding-left: padding();
        }

        input {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
