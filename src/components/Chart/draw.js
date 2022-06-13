import getPoints from './getPoints.js';
import state from './state.js';
// import drawLine from './drawLine.js';
import drawBaseMarkup from './drawBase.js';
import drawChart from './drawChart.js';
import clearCanvas from './clearCanvas.js';

const draw = (ctx, data) => {
  state.ctx = ctx;
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  state.canvasSizes = {
    width,
    height,
  };

  const points = getPoints(data, width);

  clearCanvas();

  drawBaseMarkup(
    points.points.length,
    points.points.map((p) => p.yName)
  );

  drawChart(
    points.points.map((point) => {
      return {
        y: point.pointY,
        title: point.value,
        xName: point.yName,
      };
    })
  );
  // console.log(points);
};

export default draw;
