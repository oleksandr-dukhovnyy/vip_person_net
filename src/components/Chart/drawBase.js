import drawLine from './drawLine.js';
import drawPoint from './drawPoint.js';
import getPoint from './getPoint.js';
import state from './state.js';

const drawBaseMarkup = (XCount = 13, titles = []) => {
  const top = [0, 100];
  const zero = [0, 0];
  const left = [100, 0];

  drawLine(top, zero);
  drawLine(zero, left);

  /* draw y points */
  // bold
  drawPoint([0, 0], { type: 'y-point', size: 2, title: '0%' });
  let counter = 0;
  const YStep = 100 / 11;
  for (let i = 0; i <= 100; i += YStep) {
    if (i) {
      drawPoint([0, i], {
        type: 'y-point',
        size: 5,
        title: `${(counter += 10)}%`,
      });
    }
  }

  // light
  for (let i = 0; i <= 100 - YStep; i += YStep / 2) {
    if (i) {
      drawPoint([0, i], { type: 'y-point', size: 3 });
    }
  }

  // draw x points
  const step = 100 / (XCount + 1);

  // drawPoint([0, 0], { type: 'x-point', size: 5, title: titles.shift() });
  for (let i = 0; i <= 100; i += step) {
    drawPoint([i, 0], { type: 'x-point', size: 5, title: titles.shift() });
  }
};

export default drawBaseMarkup;
