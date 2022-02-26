<script>
export default {
	name: 'Tabs',
	render(vnode){
		const tabsBottom = [];

		const tabsTop = vnode(
			'div',
			{
				class: 'tabs__top'
			},
			this.tabs.reduce((acc, tab) => {
				const active = this.activeTab === tab.key;

				acc.push(vnode(
					'div',
					{
						class: {
							'tabs__top--active': active,
							'tabs__top--item': true
						},
						on: {
							click: () => this.activeTab = tab.key
						},
					},
					[tab.title]
				));

				const tabsBottomChilds = this.$slots[tab.key]
					? this.$slots[tab.key]
					: `${tab.title} (пока в разработке)`;

				tabsBottom.push(vnode(
					'div',
					{
						style: {
							display: active ? 'block' : 'none',
						},
						class: 'tabs__bottom--item'
					},
					tabsBottomChilds
				));

				return acc;
			}, [])
		);
		
		return vnode(
			'div',
			{
				class: 'tabs'
			},
			[
				tabsTop,
				vnode(
					'div',
					{
						class: 'tabs__bottom'
					},
					tabsBottom
				)
			]
		);
	},
	props: {
		tabs: {
			type: Array,
			required: true
		},
  	},
	data(){
		return {
			activeTab: localStorage.getItem('tabs-activeTab') || this.tabs[0].key
		}
	},
	watch: {
		activeTab(n){
			localStorage.setItem('tabs-activeTab', n);
		}
	}
}
</script>

<style lang="scss" scoped>
	$tabs-top-height: 40px;

	.tabs {
		&__top {
			
			display: grid;
			grid-auto-flow: column;
			grid-template-rows: $tabs-top-height;
			align-items: center;

			grid-column-gap: 3px;
			padding: 0 padding();

			border-bottom: 1px solid #fff;

			&--item {
				width: 100%;
				height: $tabs-top-height;

				font-size: 12px;

				display: flex;
				justify-content: center;
				align-items: center;

				border-radius: $border-radius $border-radius 0 0;
				
				$border: 1px solid $cta-color;
				border-top: $border;
				border-left: $border;
				border-right: $border;

				opacity: 0.6;
				letter-spacing: 2px;
				transition: 0.3s;
				cursor: pointer;
			}

			&--active {
				opacity: 1;
				background-color: $cta-color;
				color: #fff;

				transition: 0.3s;
			}
		}

		&__bottom {
			border-radius: $border-radius;
			background-color: #fff;
			@include shadow;

			@include container(1);

			&--item {
				@include container(1);
			}
		}
	}
</style>