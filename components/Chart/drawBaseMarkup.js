// import state from './state';
import drawPoint from './drawPoint';
import drawLine from './drawLine';

/***
	state.canvasSizes = {
		ctx
  }

	{
    base: {
      maxValue: 100,
      minValue: 0,
    },
    columns: [
      {
      	points: [
        	{ id: 1, color: '#f00', value: 5 },
          { id: 2, color: '#0f0', value: 3 },
        ],
				x: 66,
      	yName: '2019',
      },
      ...
    ],
  };
***/

const drawBaseMarkup = (data) => {
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
};

export default drawBaseMarkup;
