import drawPoint from './drawPoint.js';
import drawLine from './drawLine.js';

const clearDataset = (points) =>
  points.filter(
    (item, i, arr) => !arr.map((n) => n.id).includes(item.id, i + 1)
  );

const drawCharts = (data) => {
  // console.log('data', data);

  const { columns } = data;

  // console.log('clearDataset', clearDataset());
  // console.log(columns);

  // draw points + caclule lines
  const lines = {};
  columns.forEach((column, i) => {
    // if (!i) return;

    // console.group(`${column.yName} x: ${~~column.x}`);

    clearDataset(column.points).forEach((point) => {
      const coords = [column.x, Number(point.value)];
      const pointToPush = { ...point, x: column.x, y: point.value };

      if (lines[point.id] === undefined) {
        lines[point.id] = [pointToPush];
      } else {
        lines[point.id].push(pointToPush);
      }

      drawPoint(coords, {
        title: !i ? '' : `${point.value}%`,
        size: 2,
        color: point.color,
      });
    });

    // console.groupEnd();
  });

  // draw lines
  for (const pints in lines) {
    let before = null;
    lines[pints].forEach((item) => {
      if (before !== null) {
        drawLine(before, [item.x, item.y], {
          color: item.color,
        });
      }

      before = [item.x, item.y];
    });
  }

  return null;
};

export default drawCharts;
