import state from './state';
import getPoint from './getPoint.js';

const drawLine = (start, end, { color = '#000', width = 1 } = {}) => {
  state.ctx.strokeStyle = color;
  state.ctx.lineWidth = width;

  state.ctx.beginPath();
  state.ctx.moveTo(...getPoint(start));
  state.ctx.lineTo(...getPoint(end));
  state.ctx.strokeStyle = color;
  state.ctx.stroke();
};

export default drawLine;
