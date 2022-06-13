<script>
export default {
  name: 'Tabs',
  render(vnode) {
    /* generate it:
			.tabs__top
				.tabs__top--item
				.tabs__top--item.tabs__top--active
				...
				.tabs__top--item
			.tabs__bottom
				.tabs__bottom--item
					(active slot)
		*/

    const tabsBottom = [];

    const tabsTop = vnode(
      'div',
      {
        class: 'tabs__top',
      },
      this.tabs.reduce((acc, tab) => {
        const active = this.activeTab === tab.key;

        acc.push(
          vnode(
            'div',
            {
              class: {
                'tabs__top--active': active,
                'tabs__top--item': true,
              },
              on: {
                click: () => (this.activeTab = tab.key),
              },
            },
            [tab.title]
          )
        );

        if (active) {
          const hasSlot = !!this.$slots[tab.key];
          const tabsBottomChilds = hasSlot
            ? this.$slots[tab.key]
            : `${tab.title} (пока в разработке)`;

          tabsBottom.push(
            vnode(
              'div',
              {
                class: {
                  'tabs__bottom--item': true,
                  empty: !hasSlot,
                },
              },
              tabsBottomChilds
            )
          );
        }

        return acc;
      }, [])
    );

    return vnode(
      'div',
      {
        class: 'tabs',
      },
      [
        tabsTop,
        vnode(
          'div',
          {
            class: 'tabs__bottom',
          },
          tabsBottom
        ),
      ]
    );
  },
  props: {
    tabs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeTab: localStorage.getItem('tabs-activeTab') || this.tabs[0].key,
    };
  },
  watch: {
    activeTab(n) {
      localStorage.setItem('tabs-activeTab', n);
    },
  },
};
</script>

<style lang="scss" scoped>
$tabs-top-height: 40px;

.tabs {
  &__top {
    display: grid;
    // grid-auto-flow: column;
    grid-template-columns: repeat(5, 190px);
    justify-content: center;
    grid-template-rows: $tabs-top-height;
    align-items: center;

    grid-column-gap: padding(0.5);
    padding: 0 padding();

    border-bottom: 1px solid #fff;

    @include media-down('m-s') {
      overflow-x: scroll;
    }

    &--item {
      width: 100%;
      height: $tabs-top-height;

      padding: padding();
      font-size: 12px;

      display: flex;
      justify-content: center;
      align-items: center;

      border-radius: $border-radius $border-radius 0 0;

      $border: 1px solid $cta-color;
      border-top: $border;
      border-left: $border;
      border-right: $border;
      font-weight: 600;

      // letter-spacing: 2px;
      transition: 0.3s;
      cursor: pointer;
    }

    &--active {
      background-color: $cta-color;
      // color: #fff;

      transition: 0.3s;
    }
  }

  &__bottom {
    border-radius: $border-radius;
    background-color: #fff;
    @include shadow;

    @include container(1);

    @include media-down('m') {
      border-radius: $border-radius $border-radius 0 0;
    }

    &--item {
      @include container(1);

      @include media-down('m') {
        padding: 0;
      }
    }
  }
}
</style>
