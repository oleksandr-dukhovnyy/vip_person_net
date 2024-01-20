// @ts-nocheck
import { YYYY, MM } from '~/helpers/timeParser';

interface ModifiedAction extends Client.Action {
  title: string;
  pointY: number;
  month: number;
  yName: string;
}

const getPoints = (data: Client.Action[], canvasWidth: number) => {
  const rez = {
    years: {} as { [key: string]: ModifiedAction[] },
    lastYear: null as number | null,
    currentYear: null as ModifiedAction[] | null,
    maxValue: 100,
    minValue: 0,
    points: [],
  };

  data.forEach((item) => {
    const year = YYYY(item.date);

    if (rez.years[year] === undefined) {
      rez.years[year] = [];
    }

    rez.years[year].push({
      value: item.value,
      pointY: (100 * +item.value) / rez.maxValue,
      month: +MM(item.date),
    } as ModifiedAction);
  });

  // rez.height = rez.maxValue - rez.minValue;
  rez.lastYear = Math.max(...Object.keys(rez.years).map(Number));

  const currentYear = new Date().getFullYear();

  for (const year in rez.years) {
    if (currentYear === +year) {
      rez.currentYear = rez.years[year].sort((a, b) => a.month - b.month);
    } else {
      const last = rez.years[year].at(-1);

      if (last) {
        rez.years[year] = [last];
      }
    }
  }

  delete rez.years[currentYear];

  const months = Array(12)
    .fill(undefined)
    .map((_, i) => {
      const month = i + 1;

      const currentYearMonth = rez.currentYear?.find((i) => i.month === month);

      return currentYearMonth
        ? {
            ...currentYearMonth,
            title: currentYearMonth.value,
            yName: String(currentYearMonth.month),
          }
        : {
            value: null,
            yName: String(month),
          };
    });

  rez.currentYear = months;

  rez.years = Object.keys(rez.years).reduce((acc, curr) => {
    acc.push({
      title: rez.years[curr].value,
      yName: curr,
      pointY: rez.years[curr].pointY,
      value: rez.years[curr].value,
    } as ModifiedAction);

    return acc;
  }, []);

  rez.points = [...rez.years, ...rez.currentYear].map((item) => ({
    ...item,
    yName: item.yName < 10 ? `0${item.yName}` : item.yName,
  }));

  rez.widthPoints = (canvasWidth / rez.points.length / canvasWidth) * 100;

  return rez;
};

export default getPoints;
