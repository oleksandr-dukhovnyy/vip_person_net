<template>
  <div class="chart" ref="chart"></div>
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
    width: 0,
    height: 0,
    ctx: null,
  }),
  // computed: {
  //   // ctx() {
  //   //   return this.$refs.canvas.getContext('2d');
  //   // },
  // },
  mounted() {
    // const width = this.$refs.chart.clientWidth;
    // console.log(width);

    // this.width = width;
    // this.height = width * this.raito;

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
      const canvas = document.createElement('canvas');

      const width = this.$refs.chart.clientWidth; // 36 - padding

      canvas.width = width;
      canvas.height = width * this.raito;
      // canvas.setAttribute('style', 'outline: 1px dotted coral;');
      this.ctx = canvas.getContext('2d');

      this.$refs.chart.innerHTML = null;
      this.$refs.chart.appendChild(canvas);

      draw(this.ctx, this.actions);
    },
  },
};
</script>

<style lang="scss" scoped>
.chart {
  padding: 0;
  display: flex;
  // justify-content: center;
  width: 100%;

  canvas {
    width: 100%;
  }
}
</style>
