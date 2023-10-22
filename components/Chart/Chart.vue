<template>
  <div
    ref="chart"
    class="chart"
  ></div>
</template>

<script>
  import draw from './draw.js';

  export default {
    name: 'Chart',
    props: {
      actions: {
        type: Array,
        default: () => [],
      },
      ratio: {
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
    watch: {
      actions: {
        handler() {
          this.draw();
        },
        deep: true,
      },
    },
    mounted() {
      // const width = this.$refs.chart.clientWidth;
      // console.log(width);

      // this.width = width;
      // this.height = width * this.ratio;

      window
        .matchMedia('(orientation: portrait)')
        .addEventListener('change', () => this.draw());

      this.draw();
    },

    methods: {
      clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
      },
      draw() {
        const canvas = document.createElement('canvas');

        const width = this.$refs.chart.clientWidth;

        canvas.width = width - 10;
        canvas.height = width * this.ratio;

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
