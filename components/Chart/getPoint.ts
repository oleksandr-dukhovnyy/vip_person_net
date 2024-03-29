import state from './state.js';

const getPercent = (a: number, b: number) => ~~((a / b) * 100);
const getXPercents = (x: number, percents: number) => (x / 100) * percents;

const getPoint = (point: Chart.Point) => {
  const [x, y] = point;

  const width = getPercent(
    state.canvasSizes.width,
    state.canvasSizes.width - getXPercents(state.canvasSizes.width, 5)
  );

  const height = getPercent(
    state.canvasSizes.height,
    state.canvasSizes.height - getXPercents(state.canvasSizes.height, 8)
  );

  const coords = [
    (x / width) * (state.canvasSizes.width - state.offset[0]),
    ((height - y) / height) * (state.canvasSizes.height - state.offset[1]),
  ] as Chart.Point;

  coords[0] += state.offset[0];
  coords[1] -= state.offset[1];

  coords[0] = ~~coords[0] + 0.5;
  coords[1] = ~~coords[1] + 0.5;

  return coords;
};

export default getPoint;
