import { drawPoint } from './drawPoint';
import drawLine from './drawLine';

const drawChart = (
  points: { y: number; title: string; xName: string }[],
  start: Chart.Point,
  color = '#ffb800'
) => {
  const step = ~~(100 / (points.length + 1));
  const lastPoint = start || [0, points[0].y];

  for (let i = 0; i <= 100; i += step) {
    const point = points.shift() || { y: 0, title: '', xName: '' };

    if (point.title && points.length) {
      drawLine(lastPoint, [i, point.y], {
        color,
        width: Number(point.xName) > 12 ? 2 : 1,
      });

      drawPoint([i, point.y], {
        type: 'round',
        size: 2,
        title: i === 0 ? '' : `${point.title}%`,
        color,
      });

      lastPoint[0] = i;
      lastPoint[1] = point.y;
    }
  }
};

export default drawChart;
