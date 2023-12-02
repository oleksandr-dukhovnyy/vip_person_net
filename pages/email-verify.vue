<template>
  <NuxtLayout>
    <section class="page">
      <div>
        <p>
          На вашу почту <b>{{ route.query.email }}</b> отправлено письмо с
          подтверждением.
        </p>
        <p> Перейдите по ссылке в письме для завершения регистрации </p>
        <p>
          После перехода по ссылке в письме, перейдите на
          <nuxt-link to="/login"> страницу авторизации </nuxt-link>
        </p>
      </div>
    </section>
  </NuxtLayout>
</template>

<script lang="ts" setup>
  const route = useRoute();
</script>

<style lang="scss" scoped>
  .page {
    @include page();

    display: flex;
    justify-content: center;
    align-items: center;

    p {
      margin: 0;
    }

    a {
      @include link;
    }

    div {
      @include shadow;

      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 500px;
      padding: 30px;
      border-radius: 15px;
      background-color: #fff;
    }
  }
</style>
