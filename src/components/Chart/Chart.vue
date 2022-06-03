<template>
  <div class="chart">
    <canvas ref="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
import draw from './draw.js';

export default {
  name: 'Chart',
  props: {
    actions: {
      type: Array,
    },
    raito: {
      type: Number,
      default: 2,
    },
  },
  data: () => ({
    width: 1000,
    height: 500,
  }),
  computed: {
    ctx() {
      return this.$refs.canvas.getContext('2d');
    },
  },
  mounted() {
    this.draw();
  },
  watch: {
    actions() {
      this.draw();
    },
  },
  methods: {
    clear() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    },
    draw() {
      draw(
        this.ctx,
        {
          width: this.width,
          height: this.height,
        },
        this.actions
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.chart {
  padding: padding(2);
  display: flex;
  justify-content: center;
}
</style>
