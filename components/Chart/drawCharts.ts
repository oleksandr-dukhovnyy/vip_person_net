import { drawPoint } from './drawPoint';
import drawLine from './drawLine';

const clearDataset = (points: Chart.PointData[]) =>
  points.filter(
    (item, i, arr) => !arr.map((n) => n.id).includes(item.id, i + 1)
  );

const drawCharts = (data: Chart.DataToRender) => {
  const { columns } = data;

  // draw points and calculate lines
  const lines: Record<number, Chart.PointData[]> = {};

  columns.forEach((column, i) => {
    clearDataset(column.points.map((i) => ({ ...i, value: +i.value }))).forEach(
      (point) => {
        const coords = [column.x, Number(point.value)] as Chart.Point;
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
      }
    );
  });

  // draw lines
  for (const pints in lines) {
    let before: Chart.Point | null = null;

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
