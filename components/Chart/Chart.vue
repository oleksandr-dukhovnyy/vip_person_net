<template>
  <div
    ref="chart"
    class="chart"
  ></div>
</template>

<script lang="ts" setup>
  import draw from './draw';

  const props = defineProps<{
    actions: Client.Info['actions'];
    ratio: number;
  }>();

  const actions = computed(() => props.actions);
  const chart = ref<Element | null>(null);
  const ctx = ref<CanvasRenderingContext2D | null>(null);

  watch(actions, () => _draw(), { deep: true });

  onMounted(() => {
    window
      .matchMedia('(orientation: portrait)')
      .addEventListener('change', () => _draw());

    _draw();
  });

  function _draw() {
    if (!chart.value) return;

    const canvas = document.createElement('canvas');
    const width = chart.value.clientWidth;

    canvas.width = width - 10;
    canvas.height = width * props.ratio;

    ctx.value = canvas.getContext('2d');

    if (!ctx.value) return;

    chart.value.innerHTML = '';
    chart.value.appendChild(canvas);

    draw(ctx.value, actions.value);
  }
</script>

<style lang="scss" scoped>
  .chart {
    display: flex;
    width: 100%;
    padding: 10px 10px 0 0;
    transition: 0.5s;

    canvas {
      width: 100%;
    }
  }
</style>
