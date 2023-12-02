import state from './state';
import getPoint from './getPoint';

export const drawPoint = (
  pointToDraw: Chart.Point,
  {
    color = '#000',
    size = state.pointSize,
    title = '',
    type = 'round',
    position = 'bottom',
    textColor = '#000',
  }
) => {
  if (!state.ctx) return;

  state.ctx.beginPath();
  const point = getPoint(pointToDraw);

  state.ctx.strokeStyle = color;
  state.ctx.fillStyle = color;

  switch (type) {
    case 'round':
      drawRound(point, size);
      break;

    case 'x-point':
      drawRectX(point, size);
      break;

    case 'y-point':
      drawRectY(point, size);
      break;

    default:
      throw new Error(`unknown point type -> "${type}"`);
  }

  const textCords = [...point];
  const offsetByType = {
    round: [10, 0],
    'y-point': [40, 4],
    'x-point': [7, 17],
  }[type];

  textCords[0] -= offsetByType[0];
  textCords[1] += offsetByType[1];

  if (position && type === 'round') {
    const shift = 11;

    textCords[0] += -1;
    textCords[1] += position === 'top' ? shift : -shift;
  }

  state.ctx.strokeStyle = textColor;
  state.ctx.fillStyle = textColor;

  state.ctx.font = 'normal normal 400 13px Roboto';
  state.ctx.fillText(title, textCords[0], textCords[1]);
};

function drawRound(point: Chart.Point, size: number) {
  if (!state.ctx) return;

  state.ctx.arc(
    point[0] - size / 100,
    point[1] - size / 100,
    size,
    0,
    2 * Math.PI,
    false
  );
  state.ctx.stroke();
  state.ctx.fill();
}

function drawRectX(point: Chart.Point, size: number) {
  if (!state.ctx) return;

  state.ctx.rect(point[0] - size / 6, point[1] - size / 2, size / 4, size);
  state.ctx.stroke();
  state.ctx.fill();
}

function drawRectY(point: Chart.Point, size: number) {
  if (!state.ctx) return;

  state.ctx.rect(point[0] - size / 2, point[1] - size / 6, size, size / 4);
  state.ctx.stroke();
  state.ctx.fill();
}
