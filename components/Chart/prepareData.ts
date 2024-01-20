import { YYYY, MM } from '~/helpers/timeParser';

const normalizeNum = (n: number) => `${n < 10 ? '0' : ''}${n}`;

const prepareData = (data: Client.Info['actions']): Chart.DataToRender => {
  if (typeof data !== 'object') {
    console.error('[prepareData ERROR]: invalid data', data);

    return {
      base: {
        maxValue: 100,
        minValue: 0,
      },
      columns: [] as Chart.YearColumn[],
    };
  }

  data = JSON.parse(JSON.stringify(data));

  const rez = {
    base: {
      maxValue: 100,
      minValue: 0,
    },
    columns: [] as Chart.YearColumn[],
  };

  const currentYear = new Date().getFullYear();
  const columns: {
    [key: string]: Client.Action[];
  } = {};

  for (let i = 0; i < 12; i++) {
    columns[normalizeNum(i + 1)] = [];
  }

  // sorting points of years and months
  data.forEach((dataset) => {
    const { data, id, color } = dataset;
    // console.log('dataset', dataset);

    const addToColumn = (key: string, data: Client.Action) => {
      if (columns[key] !== undefined) {
        columns[key].push(data);
      } else {
        columns[key] = [data];
      }
    };

    data.forEach((item) => {
      const year = +YYYY(item.date);
      item.id = id;
      item.color = color;

      addToColumn(year === currentYear ? MM(item.date) : '' + year, item);
    });
  });

  // compile into draw ready structure
  for (const yName in columns) {
    const points =
      columns[yName]
        .map((item) => ({
          id: item.id,
          color: item.color,
          name: item.name,
          value: item.value,
          date: item.date,
        }))
        .sort((a, b) => (a.date > b.date ? -1 : a.date === b.date ? 0 : 1)) ||
      [];

    rez.columns.push({
      points,
      yName,
      x: 0,
    });
  }

  rez.columns.sort((...args) => {
    const [a, b] = args
      .map((item) =>
        item.yName.length === 2 ? `9999${item.yName}` : item.yName
      )
      .map(Number);

    return a - b;
  });

  return rez;
};

export default prepareData;

// console.log(data);
// data = [
//   {
//     id: 1,
//     color: '#5e59ff',
//     data: [
//       { date: '2022-05-04T20:44:36.000Z', value: '26.00', name: 'put' },
//       { date: '2022-03-02T20:01:21.000Z', value: '22.00', name: 'put' },
//       { date: '2022-02-02T20:07:11.000Z', value: '20.00', name: 'put' },
//       { date: '2022-01-02T20:02:01.000Z', value: '18.00', name: 'put' },
//       { date: '2021-01-02T20:03:01.000Z', value: '10.00', name: 'put' },
//       { date: '2020-01-02T20:07:01.000Z', value: '3.00', name: 'put' },
//     ],
//   },
//   {
//     id: 2,
//     color: '#ffb800',
//     data: [
//       { date: '2022-09-01T17:42:27.000Z', name: 'put', value: '88.34' },
//       { date: '2022-06-05T19:59:24.000Z', name: 'put', value: '80.00' },
//       { date: '2022-05-01T19:59:24.000Z', name: 'put', value: '73.10' },
//       { date: '2022-04-20T19:59:24.000Z', name: 'put', value: '60.30' },
//       { date: '2022-03-15T20:59:24.000Z', name: 'put', value: '55.00' },
//       { date: '2022-01-25T20:59:24.000Z', name: 'put', value: '55.00' },
//       { date: '2021-10-13T19:59:24.000Z', name: 'put', value: '51.30' },
//       { date: '2021-07-14T19:59:24.000Z', name: 'put', value: '44.20' },
//       { date: '2021-05-27T19:59:24.000Z', name: 'put', value: '40.20' },
//       { date: '2020-09-17T19:59:24.000Z', name: 'put', value: '33.20' },
//       { date: '2020-04-09T19:58:47.000Z', name: 'put', value: '27.30' },
//       { date: '2019-11-06T20:58:47.000Z', name: 'put', value: '24.40' },
//       { date: '2019-06-14T08:20:00.000Z', name: 'put', value: '20.72' },
//       { date: '2019-05-14T08:20:00.000Z', name: 'put', value: '15.16' },
//       { date: '2014-05-14T08:20:00.000Z', name: 'put', value: '10.16' },
//       { date: '2013-05-14T08:20:00.000Z', name: 'put', value: '8.16' },
//       { date: '2012-05-14T08:20:00.000Z', name: 'put', value: '5.16' },
//       { date: '2011-05-14T08:20:00.000Z', name: 'put', value: '3.16' },
//     ],
//   },
// ];
