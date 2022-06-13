import drawPoint from './drawPoint.js';
import drawLine from './drawLine.js';

const drawChart = (points) => {
  // points.forEach((point) => {
  // 	drawPoint(point);
  // });

  // const lastPoint = [points[0].x, points[0].y];
  // points.forEach((point, i) => {
  //   drawPoint([point.x, point.y], {
  //     title: point.title,
  //     size: 2,
  //     position: i % 2 ? 'top' : 'bottom',
  //   });
  // });

  // console.log('points', JSON.parse(JSON.stringify(points)));

  const step = 100 / (points.length + 1);
  const lastPoint = [0, points[0].y];

  for (let i = 0; i <= 100; i += step) {
    const point = points.shift() || { y: 0, title: '' };

    if (point.title && points.length) {
      drawLine(lastPoint, [i, point.y], {
        color: '#ffb800',
        width: Number(point.xName) > 12 ? 2 : 1,
      });
      drawPoint([i, point.y], {
        type: 'round',
        size: 2,
        title: i === 0 ? '' : point.title,
        color: '#ffb800',
      });

      lastPoint[0] = i;
      lastPoint[1] = point.y;
    }
  }
};

export default drawChart;
