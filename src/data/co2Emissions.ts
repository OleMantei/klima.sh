type emission = {
  year: number;
  emissionTotal: number;
}[];

export const getLatestYearDelta = (
  data: emission,
  year_range: [number, number],
): number => {
  const startValue = data.find((e) => e.year == 1990)?.emissionTotal;
  const currValue = data.find((e) => e.year == year_range[1])?.emissionTotal;

  return startValue && currValue
    ? parseFloat(((1 - currValue / startValue) * 100).toFixed(2))
    : 0;
};

export const getDeltaAsPercentage = (
  data: emission,
  year_range: [number, number],
): number => {
  const [startYear, endYear] = year_range;

  let from: number;

  if (startYear == endYear) {
    from = startYear - 1;
  } else {
    from = startYear;
  }

  const startValue = data.find((e) => e.year == from)?.emissionTotal;
  const currValue = data.find((e) => e.year == endYear)?.emissionTotal;

  return startValue && currValue
    ? parseFloat(((1 - currValue / startValue) * 100).toFixed(2))
    : 0;
};

export const co2Emissions: emission = [
  {
    year: 1990,
    emissionTotal: 24412,
  },
  {
    year: 2014,
    emissionTotal: 18283,
  },
  {
    year: 2015,
    emissionTotal: 18322,
  },
  {
    year: 2016,
    emissionTotal: 18131,
  },
  {
    year: 2017,
    emissionTotal: 18109,
  },
  {
    year: 2018,
    emissionTotal: 18028,
  },
  {
    year: 2019,
    emissionTotal: 16688,
  },
  {
    year: 2020,
    emissionTotal: 16352,
  },
  {
    year: 2021,
    emissionTotal: 16705,
  },
];
