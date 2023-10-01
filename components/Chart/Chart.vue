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

    window.matchMedia('(orientation: portrait)').addListener(() => {
      this.draw();
    });

    this.draw();
  },
  watch: {
    actions: {
      handler() {
        this.draw();
      },
      deep: true,
    },
  },
  methods: {
    clear() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    },
    draw() {
      const canvas = document.createElement('canvas');

      const width = this.$refs.chart.clientWidth;
      // const pRatio = window.devicePixelRatio || 1;

      canvas.width = width - 10;
      canvas.height = width * this.raito;

      // if (pRatio) {
      // canvas.width = width / pRatio;
      // canvas.height = width * (this.raito / pRatio);
      // } else {
      // canvas.width = width;
      // canvas.width = width / this.raito;
      // }

      // console.log({ width: canvas.width, height: canvas.height, pRatio });

      // canvas.setAttribute('style', 'outline: 1px dotted coral;');
      this.ctx = canvas.getContext('2d');
      // this.ctx.scale(this.raito, this.raito);

      this.$refs.chart.innerHTML = null;
      this.$refs.chart.appendChild(canvas);

      draw(this.ctx, this.actions);
    },
  },
};
</script>

<style lang="scss" scoped>
.chart {
  padding: 10px 10px 0 0;
  display: flex;
  // justify-content: center;
  width: 100%;
  transition: 0.5s;

  canvas {
    width: 100%;
  }
}
</style>
