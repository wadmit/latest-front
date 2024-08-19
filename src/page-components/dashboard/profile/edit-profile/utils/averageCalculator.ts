export const averageCalculator = (
  listening: number,
  reading: number,
  writing: number,
  speaking: number
) => {
  const avgValue =
    (Number(listening) + Number(reading) + Number(writing) + Number(speaking)) /
    4;
  return avgValue;
};
