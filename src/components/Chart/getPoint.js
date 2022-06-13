import state from './state.js';

const getPoint = ([x, y]) => {
  const coords = [
    (x / 100) * (state.canvasSizes.width + state.offset[0]),
    ((100 - y) / 100) * (state.canvasSizes.height - state.offset[1]),
  ];

  coords[0] += state.offset[0];
  coords[1] -= state.offset[1];

  return coords;
};

export default getPoint;
