// Quelle: https://www.schleswig-holstein.de/DE/landesregierung/themen/energie/energiewende/Daten/pdf/monitoringbericht_2023_excel.html?nn=a7a1f501-0dcb-4ec3-b611-62605f645397
// Gesamte Treibhausgas-Emissionen 1990 - 2021 nach Sektoren
//angegeben in 1000 Tonnen CO2-Äquivalente

type greenHouseGasBySectorType = {
  year: number;
  data: {
    sumValue: number;
    energyEconomy: number;
    industry: number;
    tradeAndServices: number;
    households: number;
    buildingsCombined: number;
    traffic: number;
    wasteBurning: number;
    agriculture: number;
  };
}[];

export const getGreenHouseGasSum = (
  data: greenHouseGasBySectorType,
  yearRange: [number, number],
) => {
  let sum = 0;
  for (const item of data) {
    if (item.year >= yearRange[0] && item.year <= yearRange[1]) {
      const dataObj = item.data;
      sum += dataObj.sumValue;
    }
  }
  //* 1000 because greenHouseGases are given in 1000 Tons CO2 equivalent
  return sum * 1000;
};

export const getGreenHouseGasPercentage = (
  data: greenHouseGasBySectorType,
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
export const greenHouseGasBySectorData: greenHouseGasBySectorType = [
  {
    year: 2015,
    data: {
      sumValue: 26161,
      energyEconomy: 6065,
      industry: 3602,
      tradeAndServices: 1964,
      households: 3324,
      buildingsCombined: 5288,
      traffic: 5469,
      wasteBurning: 175,
      agriculture: 5562,
    },
  },
  {
    year: 2016,
    data: {
      sumValue: 26066,
      energyEconomy: 5758,
      industry: 3689,
      tradeAndServices: 1876,
      households: 3462,
      buildingsCombined: 5338,
      traffic: 5589,
      wasteBurning: 167,
      agriculture: 5525,
    },
  },
  {
    year: 2017,
    data: {
      sumValue: 26120,
      energyEconomy: 5535,
      industry: 3812,
      tradeAndServices: 2062,
      households: 3454,
      buildingsCombined: 5516,
      traffic: 5639,
      wasteBurning: 165,
      agriculture: 5453,
    },
  },
  {
    year: 2018,
    data: {
      sumValue: 25688,
      energyEconomy: 5754,
      industry: 3812,
      tradeAndServices: 1780,
      households: 3444,
      buildingsCombined: 5224,
      traffic: 5464,
      wasteBurning: 147,
      agriculture: 5287,
    },
  },
  {
    year: 2019,
    data: {
      sumValue: 24302,
      energyEconomy: 4914,
      industry: 3858,
      tradeAndServices: 1273,
      households: 3413,
      buildingsCombined: 4687,
      traffic: 5493,
      wasteBurning: 137,
      agriculture: 5214,
    },
  },
  {
    year: 2020,
    data: {
      sumValue: 23886,
      energyEconomy: 4631,
      industry: 3806,
      tradeAndServices: 1353,
      households: 3534,
      buildingsCombined: 4888,
      traffic: 5275,
      wasteBurning: 132,
      agriculture: 5154,
    },
  },
  {
    year: 2021,
    data: {
      sumValue: 23916,
      energyEconomy: 4712,
      industry: 3634,
      tradeAndServices: 1766,
      households: 3550,
      buildingsCombined: 5316,
      traffic: 5077,
      wasteBurning: 134,
      agriculture: 5043,
    },
  },
];
