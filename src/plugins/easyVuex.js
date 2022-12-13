const plugin = {
  install(Vue) {
    Vue.mixin({
      created() {
        const items = {
          getters: this.$options.vuexGetters || [],
          actions: this.$options.vuexActions || [],
        };

        for (let itemType in items) {
          items[itemType].forEach((propName) => {
            this[propName] = this.$store[itemType][propName];
          });
        }
      },
    });
  },
};

export default plugin;
