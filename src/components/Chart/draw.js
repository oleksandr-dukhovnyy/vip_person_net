import getPoints from './getPoints.js';

const state = {
  canvasSizes: {
    width: 0,
    height: 0,
  },
  ctx: null,
};

const getPoint = ([valueX, valueY]) => [
  (valueX / 100) * state.canvasSizes.width,
  ((100 - valueY) / 100) * state.canvasSizes.height,
];

const drawPoint = ({
  xy,
  title = '',
  pointSize = 2,
  type = 'point',
  titleOffset = [10, 20],
  fontSize = '1em',
  fontFamily = 'serif',
  color = '#000',
}) => {
  state.ctx.beginPath();
  const point = getPoint(xy);
  const offsetPX = [-1, -1];

  state.ctx.font = `${fontSize} ${fontFamily}`;
  state.ctx.strokeStyle = '#000';
  state.ctx.fillStyle = '#000';
  state.ctx.fillText(
    title,
    point[0] + titleOffset[0],
    point[1] + titleOffset[1]
  );

  const x = offsetPX[0] + (point[0] + pointSize / 2);
  const y = offsetPX[1] + (point[1] + pointSize / 2);

  state.ctx.strokeStyle = color;
  state.ctx.fillStyle = color;

  switch (type) {
    case 'point':
      state.ctx.arc(x, y, pointSize, 0, 2 * Math.PI, false);
      break;

    case 'y-point':
      state.ctx.rect(x, y, pointSize, pointSize / 2);
      break;

    case 'x-point':
      state.ctx.rect(x, y, pointSize / 2, pointSize);
      break;

    default:
      throw new Error(`unknow point type -> "${type}"`);
  }

  state.ctx.fill();
};

function drawLine(from, to, width = 1, color = '#000') {
  state.ctx.strokeStyle = color;
  state.ctx.lineWidth = width;
  state.ctx.moveTo(...getPoint(from));
  state.ctx.lineTo(...getPoint(to));
  state.ctx.stroke();
}

function drawBaseMarkup() {
  const offset = 4;
  drawLine([offset, 100], [offset, offset]);
  drawLine([offset, offset], [100, offset]);
}

function addYPoint(y, title) {
  const xOffsets = [0, -10, -15, -20, -30];
  const offsetX = xOffsets[`${title}`.length];

  drawPoint({
    xy: [3.5, y],
    title,
    pointSize: 4,
    type: 'y-point',
    titleOffset: [offsetX, 6],
    fontSize: '0.8em',
  });
}

function drawXPoint(x, title) {
  drawPoint({
    xy: [x, 4.2],
    title,
    pointSize: 4,
    type: 'x-point',
    titleOffset: [0, 18],
    fontSize: '0.8em',
  });
}

export default function draw(ctx, sizes, data) {
  state.ctx = ctx;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const { width, height } = sizes;
  const points = getPoints(data, width);

  state.canvasSizes.width = width - 40;
  state.canvasSizes.height = height - 40;

  drawBaseMarkup();

  console.log('------');

  let lastPoint = null;

  points.points.forEach((point, i) => {
    const x = (i + 1) * points.widthPoints;
    const y = point.pointY - 3;

    if (point.pointY !== undefined) {
      addYPoint(y, point.title);
      drawPoint({
        xy: [x, y],
        title: `${point.title}`,
        color: '#ffb800',
      });

      if (lastPoint !== null) {
        drawLine(
          lastPoint,
          [x, y],
          point.month !== undefined ? 1 : 2,
          '#ffb800'
        );
      }

      lastPoint = [x, y];
    }

    drawXPoint(x, point.yName);
  });
}
