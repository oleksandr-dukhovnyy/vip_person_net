// from ISO 8601 to format

const normalize = (n: number) => (n < 10 ? `0${n}` : '' + n);

const methodsAliases: { [key: string]: keyof Date } = {
  year: 'getFullYear',
  month: 'getMonth',
  day: 'getDate',
  hour: 'getHours',
  minutes: 'getMinutes',
};

const parse = (time: string, methods: string[]) => {
  const date = new Date(time);

  const rez = methods.reduce(
    (a, m) => ((a[m] = normalize((date[methodsAliases[m]] as Function)())), a),
    {} as { [key: string]: string }
  );

  rez.month = normalize(+rez.month + 1);

  return rez;
};

function DDMMYYYY_ttmm(time: string) {
  const { year, month, day, hour, minutes } = parse(time, [
    'year',
    'month',
    'day',
    'hour',
    'minutes',
  ]);

  return `${day}.${month}.${year} ${hour}:${minutes}`;
}

function DDMMYY(time: string) {
  const { year, month, day } = parse(time, ['day', 'year', 'month']);

  return `${day}.${month}.${+year - 2000}`;
}

function YYYY(time: string) {
  const { year } = parse(time, ['year']);

  return `${year}`;
}

function MM(time: string) {
  const { month } = parse(time, ['month']);

  return `${month}`;
}

export { DDMMYYYY_ttmm, DDMMYY, YYYY, MM, normalize };

export default {
  DDMMYYYY_ttmm,
  DDMMYY,
  YYYY,
  MM,
};
