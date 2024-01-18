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
  return sum;
};

export const getPercentage = (
  data: energyConsumptionBySectorType,
  yearRange: [number, number],
) => {
  const value0: number | undefined = data.find(
    (element) => element.year == yearRange[0],
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
