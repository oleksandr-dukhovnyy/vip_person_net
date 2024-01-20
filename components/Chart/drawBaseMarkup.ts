import { drawPoint } from './drawPoint';
import drawLine from './drawLine';

export default function drawBaseMarkup(data: Chart.DataToRender) {
  // x y lines
  drawLine([0, 110], [0, 0]);
  drawLine([0, 0], [100, 0]);

  // y
  for (let i = data.base.minValue; i <= data.base.maxValue; i++) {
    if (i % 10 === 0) {
      drawPoint([0, i], {
        type: 'y-point',
        size: i === 0 ? 0 : 4,
        title: `${i}%`,
      });
    } else if (i % 5 === 0) {
      drawPoint([0, i], { type: 'y-point', size: 2 });
    }
  }

  // x
  data.columns.forEach(({ x, yName }) => {
    drawPoint([x, 0], {
      type: 'x-point',
      size: 5,
      title: yName,
    });
  });

  return data;
}
