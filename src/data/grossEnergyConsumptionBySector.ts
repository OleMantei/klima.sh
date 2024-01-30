// Quelle: https://www.schleswig-holstein.de/DE/landesregierung/themen/energie/energiewende/Daten/pdf/monitoringbericht_2023_excel.html?nn=a7a1f501-0dcb-4ec3-b611-62605f645397
// angegeben in GWh
type energyConsumptionBySectorType = {
  year: number;
  data: {
    sumValue: number;
    traffic: number;
    industry: number;
    privateHomes: number;
    tradeCommerceAndServices: number;
    ownConsumptionPowerPlants: number;
    conversionUse: number;
    gridLosses: number;
    electricityForDirectHeatGeneration: number;
    energyConsumptionHeatPumps: number;
  };
}[];

//sort gross energy consumption data to display 3 biggest consumers on dashboard widget
export const getHighestEnergySectors = (
  data: energyConsumptionBySectorType,
  yearRange: [number, number],
): [string, number][] => {
  const res: [string, number][] = [
    ['Verkehr', 0],
    ['Industrie', 0],
    ['Privat Haushalt', 0],
    ['Handel und Dienstleistungen', 0],
    ['Eigenversorgung Kraftwerke', 0],
    ['Umwandlungsverlust', 0],
    ['Netzverlust', 0],
    ['Wärmegenerierung', 0],
    ['Wärmepumpen', 0],
  ];

  data.forEach((entry) => {
    if (entry.year >= yearRange[0] && entry.year <= yearRange[1]) {
      res[0][1] += entry.data.traffic;
      res[1][1] += entry.data.industry;
      res[2][1] += entry.data.privateHomes;
      res[3][1] += entry.data.tradeCommerceAndServices;
      res[4][1] += entry.data.ownConsumptionPowerPlants;
      res[5][1] += entry.data.conversionUse;
      res[6][1] += entry.data.gridLosses;
      res[7][1] += entry.data.electricityForDirectHeatGeneration;
      res[8][1] += entry.data.energyConsumptionHeatPumps;
    }
  });

  return res.sort((a, b) => b[1] - a[1]);
};

// sum up total gross energy consumption in the selected year range
export const getSum = (
  data: energyConsumptionBySectorType,
  yearRange: [number, number],
) => {
  let sum = 0;
  for (const item of data) {
    if (item.year >= yearRange[0] && item.year <= yearRange[1]) {
      const dataObj = item.data;
      sum += dataObj.sumValue;
    }
  }
  return parseFloat((sum / 1000).toFixed(1));
};

//calculate delta of total energy consumption between the selected years
export const getPercentage = (
  data: energyConsumptionBySectorType,
  yearRange: [number, number],
) => {
  let from: number;
  if (yearRange[0] == yearRange[1]) {
    from = yearRange[0] - 1;
  } else {
    from = yearRange[0];
  }
  const value0: number | undefined = data.find(
    (element) => element.year == from,
  )?.data.sumValue;
  const value1: number | undefined = data.find(
    (element) => element.year == yearRange[1],
  )?.data.sumValue;
  if (value0 && value1) {
    const percentage = (value1 / value0) * 100 - 100;
    const fixedPercentage = percentage.toFixed(1);
    const percentageRounded = parseFloat(fixedPercentage);
    return percentageRounded;
  }
  return 0;
};

export const grossEnergyConsumptionData: energyConsumptionBySectorType = [
  {
    year: 2015,
    data: {
      sumValue: 16407,
      traffic: 199,
      industry: 2906,
      privateHomes: 2728,
      tradeCommerceAndServices: 3605,
      ownConsumptionPowerPlants: 1620,
      conversionUse: 85,
      gridLosses: 1426,
      electricityForDirectHeatGeneration: 3720,
      energyConsumptionHeatPumps: 118,
    },
  },
  {
    year: 2016,
    data: {
      sumValue: 16065,
      traffic: 223,
      industry: 2870,
      privateHomes: 2436,
      tradeCommerceAndServices: 3393,
      ownConsumptionPowerPlants: 1928,
      conversionUse: 60,
      gridLosses: 1499,
      electricityForDirectHeatGeneration: 3529,
      energyConsumptionHeatPumps: 127,
    },
  },
  {
    year: 2017,
    data: {
      sumValue: 15479,
      traffic: 187,
      industry: 2908,
      privateHomes: 2413,
      tradeCommerceAndServices: 3184,
      ownConsumptionPowerPlants: 1635,
      conversionUse: 23,
      gridLosses: 1477,
      electricityForDirectHeatGeneration: 3516,
      energyConsumptionHeatPumps: 138,
    },
  },
  {
    year: 2018,
    data: {
      sumValue: 16673,
      traffic: 218,
      industry: 2960,
      privateHomes: 2327,
      tradeCommerceAndServices: 3534,
      ownConsumptionPowerPlants: 2286,
      conversionUse: 20,
      gridLosses: 1678,
      electricityForDirectHeatGeneration: 3502,
      energyConsumptionHeatPumps: 148,
    },
  },
  {
    year: 2019,
    data: {
      sumValue: 16027,
      traffic: 178,
      industry: 2872,
      privateHomes: 2231,
      tradeCommerceAndServices: 3562,
      ownConsumptionPowerPlants: 1730,
      conversionUse: 29,
      gridLosses: 1842,
      electricityForDirectHeatGeneration: 3422,
      energyConsumptionHeatPumps: 160,
    },
  },
  {
    year: 2020,
    data: {
      sumValue: 15927,
      traffic: 182,
      industry: 2853,
      privateHomes: 2243,
      tradeCommerceAndServices: 3282,
      ownConsumptionPowerPlants: 1715,
      conversionUse: 35,
      gridLosses: 1973,
      electricityForDirectHeatGeneration: 3470,
      energyConsumptionHeatPumps: 174,
    },
  },
  {
    year: 2021,
    data: {
      sumValue: 16316,
      traffic: 229,
      industry: 2884,
      privateHomes: 2479,
      tradeCommerceAndServices: 3148,
      ownConsumptionPowerPlants: 1788,
      conversionUse: 52,
      gridLosses: 1882,
      electricityForDirectHeatGeneration: 3661,
      energyConsumptionHeatPumps: 194,
    },
  },
];
