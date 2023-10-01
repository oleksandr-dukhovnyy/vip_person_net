<template>
  <div>
    <TheHeader />
    <main>
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
  // import { mapActions } from 'vuex';
  // import Terminal from '~/components/Terminal/Terminal.vue';
  import TheHeader from '~/components/Header/Header.vue';
  import TheFooter from '~/components/Footer/Footer.vue';

  // const vuexActions = ['AUTO_AUTH'];

  // export default {
  //   components: {
  //     TheHeader: Header,
  //     TheFooter: Footer,
  //     // Terminal,
  //   },
  //   // mounted() {
  //   //   console.log('------------------');
  //   //   this.AUTO_AUTH();

  //   //   // this.$notify({
  //   //   //   title: 'created',
  //   //   //   message: 'This is a success message',
  //   //   //   type: 'success'
  //   //   // });
  //   // },
  //   methods: {
  //     // ...mapActions(vuexActions),
  //   },
  // };
</script>
