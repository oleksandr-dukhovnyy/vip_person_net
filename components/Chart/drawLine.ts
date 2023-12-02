import state from './state';
import getPoint from './getPoint';

const drawLine = (
  start: Chart.Point,
  end: Chart.Point,
  { color = '#000', width = 1 } = {}
) => {
  if (!state.ctx) return;

  state.ctx.strokeStyle = color;
  state.ctx.lineWidth = width;

  state.ctx.beginPath();

  const startPoint = getPoint(start);
  state.ctx.moveTo(startPoint[0], startPoint[1]);

  const endPoint = getPoint(end);
  state.ctx.lineTo(endPoint[0], endPoint[1]);

  state.ctx.strokeStyle = color;
  state.ctx.stroke();
};

export default drawLine;
