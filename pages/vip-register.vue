<template>
  <NuxtLayout>
    <section class="page">
      <div class="register__form">
        <div>
          <h1 class="register__form-title">Регистрация для резидентов</h1>
        </div>
        <!-- <div class="dropdown-divider"></div> -->
        <div class="register__row">
          <div class="register__title register__title--required">
            Код регистрации
          </div>
          <input
            ref="code"
            v-model="code"
            type="text"
            :class="{
              error: errors.code.value,
            }"
            @keydown.enter="$refs.name.focus()"
          />
        </div>
        <div class="register__row">
          <div class="register__title register__title--required">
            Логин
            <span class="register__title--muted">
              &nbsp;&nbsp;&nbsp;(имя, ник)
            </span>
          </div>
          <input
            ref="name"
            v-model="name"
            type="text"
            :class="{
              error: errors.name.value,
            }"
            @keydown.enter="$refs.email.focus()"
          />
        </div>
        <div class="register__row">
          <div class="register__title register__title--required">Email</div>
          <input
            ref="email"
            v-model="email"
            type="text"
            :class="{
              error: errors.email.value,
            }"
            @keydown.enter="$refs.phone.focus()"
          />
        </div>
        <div class="register__row">
          <div class="register__title">Телефон</div>
          <input
            ref="phone"
            v-model="phone"
            type="text"
            :class="{
              error: errors.phone.value,
            }"
            @keydown.enter="$refs.pass1.focus()"
          />
        </div>
        <div class="register__row">
          <div class="register__title register__title--required">Пароль</div>
          <input
            ref="pass1"
            v-model="pass1"
            type="password"
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
            ref="pass2"
            v-model="pass2"
            type="password"
            :class="{
              error: errors.pass2.value || errors.passessIsSame.value,
            }"
            @keydown.enter="$refs.code.focus()"
          />
        </div>
        <!-- <div class="dropdown-divider"></div> -->
        <div class="register__controlls">
          <div
            class="register__controlls-policy"
            :class="{
              error: errors.policy.value,
            }"
          >
            <label>
              <input
                v-model="policy"
                type="checkbox"
                :checked="policy"
              />
              <span>согласие на обработку данных формы</span>
            </label>
          </div>
          <div>
            <button
              v-if="!REGISTER_LOADING"
              class="btn btn-success register__enter"
              :disabled="!formIsValide"
              @click="register"
            >
              Зарегистрироваться
            </button>
            <Loader v-else />
          </div>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import notify from '@/utils/notification.js';

  const vuexActions = ['REGISTER'];
  const vuexGetters = ['REGISTER_LOADING'];

  // 99-57
  // test1
  // some@some.com
  // +380634221588
  // 123456
  // 123456

  export default {
    name: 'Register',
    data() {
      return {
        code: '',
        name: '',
        email: '',
        phone: '',
        pass1: '',
        pass2: '',
        formIsValide: true,
        policy: false,
        errors: {
          code: {
            value: false,
            text: 'Неверный формат кода регистрации',
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
    computed: { ...mapGetters(vuexGetters) },
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

    methods: {
      ...mapActions(vuexActions),
      register() {
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

        this.formIsValide = true;
      },
      clearErrors() {
        for (const fieldName in this.errors) {
          this.errors[fieldName] = false;
        }
      },
      validate() {
        const isValide = [
          {
            name: 'code',
            valide: /^\d{2}-\d{2}$/.test(this.code),
          },
          {
            //valide: /([а-яё]|[a-z]|[а-ящьюяїієґ]){3,100}/i.test(this.name),
            valide: /.{3,100}/.test(this.name),
            name: 'name',
          },
          {
            valide: /^[^@]+@[^@.]+\..+$/i.test(this.email),
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
            valide: /.{1,300}/.test(this.pass1),
            name: 'pass1',
          },
          {
            valide: /.{1,300}/.test(this.pass2),
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
        padding: padding(3.5);
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
        padding: padding() 0 padding(0.5);
        display: flex;

        @include media-down(m) {
          flex-direction: column;
        }

        input {
          @include input;
          font-size: 13px;
          transition: 0.3s;

          width: 190px;
          height: 40px;

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

        // &--required::after {
        //   content: '*';
        //   padding-left: 2px;
        //   color: #f00;
        // }

        &--muted {
          opacity: 0.5;
          font-style: italic;
        }
      }

      &__form-title {
        font-size: 20px;
        text-align: center;
        margin-top: 0;
        margin-bottom: padding(2.5);
      }

      &__controlls {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: padding();
        padding: padding(3) 0 0;

        // padding: 0;

        @include media-down(m) {
          grid-template-columns: 1fr;
          grid-template-rows: 1fr 1fr;
        }

        // padding: padding() 0 0;

        button {
          // width: 100%;
          @include scaleble(1.02);
          cursor: pointer;
        }
      }

      &__enter {
        font-size: 15px;
        width: 190px;
        height: 40px;
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
            font-style: italic;
          }

          input {
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
