import state from './state';
import prepareData from './prepareData';
import drawBaseMarkup from './drawBaseMarkup';
import clearCanvas from './clearCanvas';
import calculatePositions from './calculatePositions';
import drawCharts from './drawCharts';

const draw = (ctx: CanvasRenderingContext2D, data: Client.Info['actions']) => {
  state.ctx = ctx;

  const width = ctx.canvas.width + state.offset[0];
  const height = ctx.canvas.height - state.offset[1];

  state.canvasSizes = {
    width,
    height,
  };

  const pipe = [
    () => {
      return prepareData(data);
    },

    (positions: ReturnType<typeof prepareData>) => {
      return calculatePositions(positions);
    },

    (positions: ReturnType<typeof calculatePositions>) => {
      clearCanvas();

      return drawBaseMarkup(positions);
    },

    (charts: ReturnType<typeof drawBaseMarkup>) => {
      drawCharts(charts);
    },
  ];

  // TODO: remove any
  pipe.reduce((a: any, c) => c(a), null);
};

export default draw;
