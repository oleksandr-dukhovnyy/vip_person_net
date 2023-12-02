export default (max: number, min = 0, toFixed = 0): number =>
  +(Math.random() * (max - min) + min).toFixed(toFixed);
