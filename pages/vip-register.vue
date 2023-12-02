<template>
  <NuxtLayout>
    <section class="page">
      <div class="register__form">
        <div>
          <h1 class="register__form-title">Регистрация для резидентов</h1>
        </div>
        <div class="register__row">
          <CodeWrapper v-slot="{ hasErrors, error }">
            <div class="register__title register__title--required">
              Код регистрации
            </div>
            <input
              ref="code"
              v-model="form.code.value"
              placeholder="Код регистрации"
              type="text"
              :class="{
                error: hasErrors,
              }"
              :title="error?.join(', ')"
              @keydown.enter="name?.focus()"
            />
          </CodeWrapper>
        </div>
        <div class="register__row">
          <div class="register__title register__title--required">
            Логин
            <span class="register__title--muted">
              &nbsp;&nbsp;&nbsp;(имя, ник)
            </span>
          </div>
          <NameWrapper v-slot="{ hasErrors, error }">
            <input
              ref="name"
              v-model="form.name.value"
              placeholder="Логин"
              type="text"
              :class="{
                error: hasErrors,
              }"
              :title="error?.join(', ')"
              @keydown.enter="email?.focus()"
            />
          </NameWrapper>
        </div>
        <div class="register__row">
          <div class="register__title register__title--required">Email</div>
          <EmailWrapper v-slot="{ hasErrors, error }">
            <input
              ref="email"
              v-model="form.email.value"
              placeholder="Email"
              type="text"
              :class="{
                error: hasErrors,
              }"
              :title="error?.join(', ')"
              @keydown.enter="phone?.focus()"
            />
          </EmailWrapper>
        </div>
        <div class="register__row">
          <div class="register__title">Телефон</div>
          <PhoneWrapper v-slot="{ hasErrors, error }">
            <input
              ref="phone"
              v-model="form.phone.value"
              placeholder="Телефон"
              type="text"
              :class="{
                error: hasErrors,
              }"
              :title="error?.join(', ')"
              @keydown.enter="pass1?.focus()"
            />
          </PhoneWrapper>
        </div>
        <div class="register__row">
          <div class="register__title register__title--required">Пароль</div>
          <Pass1Wrapper v-slot="{ hasErrors, error }">
            <input
              ref="pass1"
              v-model="form.pass1.value"
              type="password"
              :class="{
                error: hasErrors,
              }"
              :title="error?.join(', ')"
              @keydown.enter="pass2?.focus()"
            />
          </Pass1Wrapper>
        </div>
        <div class="register__row">
          <div class="register__title register__title--required">
            Пароль повторно
          </div>
          <Pass2Wrapper v-slot="{ hasErrors, error }">
            <input
              ref="pass2"
              v-model="form.pass2.value"
              type="password"
              :class="{
                error: hasErrors,
              }"
              :title="error?.join(', ')"
              @keydown.enter="code?.focus()"
            />
          </Pass2Wrapper>
        </div>
        <div class="register__controls">
          <PolicyWrapper v-slot="{ hasErrors, error }">
            <div
              class="register__controls-policy"
              :title="error?.join(', ')"
              :class="{
                error: hasErrors,
              }"
            >
              <label>
                <input
                  v-model="form.policy.value"
                  type="checkbox"
                />
                <span>согласие на обработку данных формы</span>
              </label>
            </div>
          </PolicyWrapper>

          <div>
            <button
              v-if="!store.getters.REGISTER_LOADING"
              class="btn btn-success register__enter"
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

<script lang="ts" setup>
  import { useStore } from 'vuex';
  // @ts-ignore
  import notify from '@/utils/notification.js';
  import { useFieldFactory } from '~/composables/useValidator';
  import type { AuthSession, AuthError } from '@supabase/supabase-js';

  const store = useStore();

  const loading = ref(false);

  const code = ref<HTMLInputElement | null>(null);
  const name = ref<HTMLInputElement | null>(null);
  const email = ref<HTMLInputElement | null>(null);
  const phone = ref<HTMLInputElement | null>(null);
  const pass1 = ref<HTMLInputElement | null>(null);
  const pass2 = ref<HTMLInputElement | null>(null);

  const form = {
    code: ref(''),
    name: ref(''),
    email: ref(''),
    phone: ref(''),
    pass1: ref(''),
    pass2: ref(''),
    policy: ref(true),
  };

  const validator = useValidator({
    resetErrorByFieldChange: true,
    fields: [
      {
        name: 'code',
        error: 'Неверный формат кода регистрации',
        validate: (v) => /^\d{2}-?\d{2}$/.test('' + v),
        refedValue: form.code,
      },
      {
        name: 'name',
        error: 'Введите имя пользователя',
        validate: 'required',
        refedValue: form.name,
      },
      {
        name: 'email',
        error: 'Неверный адрес электронной почты',
        validate: 'email',
        refedValue: form.email,
      },
      {
        name: 'phone',
        error: 'Неверный формат номера телефона',
        validate: 'phone',
        refedValue: form.phone,
        'non-required': true,
      },
      {
        name: 'pass1',
        validate: (val) => {
          val = '' + val;

          switch (true) {
            case !val.length:
              return 'Введите пароль';

            case val.length < 3:
              return 'Минимальная длина пароля 3';

            default:
              return true;
          }
        },
        refedValue: form.pass1,
      },
      {
        name: 'pass2',
        validate: (val) => {
          val = '' + val;

          switch (true) {
            case !val.length:
              return 'Введите пароль повторно';

            case val.length < 3:
              return 'Минимальная длина пароля 3';

            case val !== form.pass1.value:
              return 'Пароли не совпадают';

            default:
              return true;
          }
        },
        refedValue: form.pass2,
      },
      {
        name: 'policy',
        error:
          'Без вашего явного согласия на обработку персональных данных мы не сможем завершить регистрацию. Мы не передаём ваши данные третьей стороне!',
        validate: 'required',
        refedValue: form.policy,
      },
    ],
  });

  const useField = useFieldFactory(validator);
  const CodeWrapper = useField('code');
  const NameWrapper = useField('name');
  const EmailWrapper = useField('email');
  const PhoneWrapper = useField('phone');
  const Pass1Wrapper = useField('pass1');
  const Pass2Wrapper = useField('pass2');
  const PolicyWrapper = useField('policy');

  const register = async () => {
    validator.validate();

    console.log('has errors', validator.hasErrors.value);

    if (!validator.hasErrors.value) {
      loading.value = true;

      store
        .dispatch('REGISTER', {
          email: form.email.value,
          password: form.pass1.value,
          role: 'resident',
          name: form.name.value,
          phone: form.phone.value,
          inviteCode: form.code.value,
        })
        .then(async (res: AuthSession | AuthError) => {
          console.log('dispatch REGISTER res', res);

          // if (res?.error) {
          //   notify(res?.error?.message);
          // } else {
          //   notify('Регистрация прошла успешно');
          //   await navigateTo(`/email-verify?email=${form.email.value}`);
          // }
        })
        .catch((err) => {
          console.log('dispatch REGISTER err', err);
        });

      loading.value = false;
    }
  };

  watch(validator.errors, (list) => {
    Object.keys(list).forEach((errKey) => {
      const err = list[errKey];

      err.forEach((err) => typeof err === 'string' && notify(err));
    });
  });
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

          @include scalable(1.04);

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

      &__controls {
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
          @include scalable(1.02);
          cursor: pointer;
        }
      }

      &__enter {
        font-size: 15px;
        width: 190px;
        height: 40px;
      }

      &__controls-policy {
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
