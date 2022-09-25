import state from './state.js';
import drawBaseMarkup from './drawBaseMarkup.js';
import clearCanvas from './clearCanvas.js';
import prepareData from './prepareData.js';
import calculePositions from './calculePositions.js';
import drawCharts from './drawCharts.js';

const draw = (ctx, data) => {
  state.ctx = ctx;
  const width = ctx.canvas.width + state.offset[0];
  const height = ctx.canvas.height - state.offset[1];

  state.canvasSizes = {
    width,
    height,
  };

  const chain = [
    prepareData,
    calculePositions,
    (...d) => (clearCanvas(), drawBaseMarkup(...d)),
    drawCharts,
  ];

  chain.reduce((a, c) => c(a), data);

  // const parsedPoints = prepareData(data);
  // const calculedPositions = calculePositions(parsedPoints);

  // drawBaseMarkup(calculedPositions);
  // console.log(calculedPositions);

  /*{
    base: {
      maxValue: 100,
      minValue: 0,
    },
    columns: [
      // {
      //   points: [
      //     { id: 1, color: '#f00', value: 5 },
      //     { id: 2, color: '#0f0', value: 3 },
      //   ],
      //   yName: '2019',
      // },
      // ...
    ],
  };*/

  // const points = getPoints(data, width);

  // console.log(data);
  // const secondPoints = getPoints(
  //   [
  //     { date: '2022-06-05T19:59:24.000Z', name: 'put', value: 5 },
  //     { date: '2022-07-05T19:59:24.000Z', name: 'put', value: 10 },
  //     { date: '2022-08-05T19:59:24.000Z', name: 'put', value: 15 },
  //     { date: '2022-09-05T19:59:24.000Z', name: 'put', value: 20 },
  //     { date: '2022-10-05T19:59:24.000Z', name: 'put', value: 25 },
  //     { date: '2014-11-05T19:59:24.000Z', name: 'put', value: 30 },
  //     { date: '2022-12-05T19:59:24.000Z', name: 'put', value: 40 },
  //   ].map((action) => {
  //     return {
  //       ...action,
  //       value: action.value.toFixed(2),
  //     };
  //   }),
  //   width
  // );

  // if (points.length > secondPoints.length) {
  // drawBaseMarkup([points.points, secondPoints]);
  // } else {
  //   drawBaseMarkup(
  //     secondPoints.points.length,
  //     secondPoints.points.map((p) => p.yName)
  //   );
  // }

  // drawChart(
  //   points.points.map((point) => {
  //     return {
  //       y: point.pointY,
  //       title: point.value,
  //       xName: point.yName,
  //     };
  //   })
  // );

  // drawChart(
  //   secondPoints.points.map((point) => {
  //     return {
  //       y: point.pointY,
  //       title: point.value,
  //       xName: point.yName,
  //     };
  //   }),
  //   '#3838ff'
  // );
  // console.log(points);
};

export default draw;
