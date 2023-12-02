import state from './state';

/*
	state.canvasSizes = {
    width,
    height,
  }

	{
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
  };
*/

const calculatePositions = (data: Chart.DataToRender) => {
  const step = state.canvasSizes.width / data.columns.length;

  let shift = step * -1;

  return {
    ...(JSON.parse(JSON.stringify(data)) as Chart.DataToRender),
    columns: data.columns.map((item) => {
      shift += step;

      return {
        ...item,
        x: (~~shift / state.canvasSizes.width) * 100,
      };
    }),
  };
};

export default calculatePositions;
