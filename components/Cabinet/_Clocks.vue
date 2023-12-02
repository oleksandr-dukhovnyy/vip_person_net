<template>
  <div class="clocks">
    <div
      v-for="(n, key) in times"
      :key="key"
    >
      <div
        class="clocks__clock"
        :style="`--h:${n.h}; --m:${n.m}`"
      >
        <div class="clocks__hour"></div>
        <div class="clocks__minutes"></div>
      </div>
      <p class="clocks__title">
        {{ n.title }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import timeZones from './timeZones';

  const props = withDefaults(
    defineProps<{
      cities: string[];
    }>(),
    {
      cities: () => ['London', 'New York', 'Kyiv', 'Tokyo'],
    }
  );

  const time = ref(new Date());

  const times = computed(() => {
    return props.cities.map((c) => {
      const cityTimeZone = timeZones[c.toLowerCase().replace(/\s/, '')];
      const currentHours = time.value.getHours() + cityTimeZone;
      const minutes = time.value.getMinutes();

      const hourDegrees = (currentHours * 60 + minutes) * (360 / 24 / 60);
      const minutesDegrees = (minutes + 15) * (360 / 60);

      return {
        h: hourDegrees,
        m: minutesDegrees,
        title: c,
      };
    });
  });

  onMounted(() => {
    setInterval(() => {
      time.value = new Date();
    });
  });
</script>

<style lang="scss" scoped>
  // $clocks-count: 5;
  // $clocks-size: 150px;

  // .clocks {
  // 	@include container;
  // 	margin-bottom: padding(4);

  // 	display: flex;
  // 	flex-direction: row;
  // 	justify-content: space-between;
  // 	height: ($clocks-size + padding(4));

  // 	&__clock {
  // 		border: 1px solid black;
  // 		border-radius: 50%;
  // 		width: $clocks-size;
  // 		height: $clocks-size;
  // 		position: relative;

  // 		&::after {
  // 			content: '';
  // 			$size: 8px;
  // 			width: $size;
  // 			height: $size;
  // 			display: block;
  // 			position: absolute;
  // 			top: ($clocks-size / 2) - ($size / 2);
  // 			left: ($clocks-size / 2) - ($size / 2);
  // 			background-color: #000;
  // 			border-radius: 50%;
  // 		}

  // 		// @include scalable(1.05);
  // 	}

  // 	&__hour, &__minutes {
  // 		position: absolute;
  // 		width: 100%;
  // 		top: ($clocks-size / 2);
  // 		left: 0;
  // 	}

  // 	&__hour {
  // 		transform: rotate(calc(1deg * var(--h)));

  // 		&:after {
  // 			$size: 31%;
  // 			content: '';
  // 			display: block;
  // 			width: $size;
  // 			height: 3px;
  // 			margin-left: (50% - $size);
  // 			background-color: #000;
  // 		}
  // 	}

  // 	&__minutes {
  // 		transform: rotate(calc(1deg * var(--m)));
  // 		&:after {
  // 			$size: 44%;
  // 			content: '';
  // 			display: block;
  // 			margin-left: (50% - $size);
  // 			width: $size;
  // 			height: 1px;
  // 			background-color: #000;
  // 		}
  // 	}

  // 	&__title {
  // 		padding: padding();
  // 		text-align: center;
  // 	}
  // }
</style>
