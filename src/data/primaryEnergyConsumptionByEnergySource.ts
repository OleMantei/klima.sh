// Quelle: https://www.schleswig-holstein.de/DE/landesregierung/themen/energie/energiewende/Daten/pdf/monitoringbericht_2023_excel.html?nn=a7a1f501-0dcb-4ec3-b611-62605f645397

import { createDeltaArrayPrimaryEnergy } from './mathDataHelper';

// angegeben in GWh
export type primaryEnergyByEnergySourceType = {
  year: number;
  data: {
    sumValue: number;
    fossilFuels: number; // coal, mineralOil, naturalGas combined
    coal: number;
    mineralOils: number;
    naturalGas: number;
    nuclearEnergy: number;
    renewableEnergies: number; // combined renewables
    windOnshore: number;
    windOffshore: number;
    hydropower: number;
    solarEnergy: number;
    environmentalHeat: number;
    biofuels: number;
    solidLiquidBiomass: number;
    biogasBiomethane: number;
    sewageGasLandfillGas: number;
    biogenicWasteSewageSludge: number;
    nonBiogenicWaste: number;
    otherSources: number;
    electricityExchangeBalance: number;
    districtHeatingExchangeBalance: number;
  };
}[];
export const getPrimaryEnergySum = (
  data: primaryEnergyByEnergySourceType,
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

export const getPrimaryEnergyPercentage = (
  data: primaryEnergyByEnergySourceType,
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

export const getPrimaryEnergyRenewables = (
  data: primaryEnergyByEnergySourceType,
  yearRange: [number, number],
) => {
  const counter = yearRange[1] - yearRange[0];
  const dataArray: primaryEnergyByEnergySourceType =
    createDeltaArrayPrimaryEnergy(counter, data, yearRange);

  let renewableSum = 0;
  let totalSum = 0;
  for (let i = 0; i <= counter; i++) {
    renewableSum += dataArray[i].data.renewableEnergies;
    totalSum += dataArray[i].data.sumValue;
  }
  const retVal: number = parseFloat(
    ((renewableSum / totalSum) * 100).toFixed(1),
  );
  return retVal;
};

export const primaryEnergyData: primaryEnergyByEnergySourceType = [
  {
    year: 2015,
    data: {
      sumValue: 121859,
      fossilFuels: 75531,
      coal: 11158,
      mineralOils: 33307,
      naturalGas: 31066,
      nuclearEnergy: 33883,
      renewableEnergies: 28644,
      windOnshore: 9791,
      windOffshore: 4106,
      hydropower: 8,
      solarEnergy: 1460,
      environmentalHeat: 353,
      biofuels: 1077,
      solidLiquidBiomass: 3329,
      biogasBiomethane: 6394,
      sewageGasLandfillGas: 231,
      biogenicWasteSewageSludge: 1896,
      nonBiogenicWaste: 2793,
      otherSources: 1,
      electricityExchangeBalance: -17518,
      districtHeatingExchangeBalance: -1475,
    },
  },
  {
    year: 2016,
    data: {
      sumValue: 124206,
      fossilFuels: 76626,
      coal: 10056,
      mineralOils: 32872,
      naturalGas: 33699,
      nuclearEnergy: 34857,
      renewableEnergies: 30743,
      windOnshore: 9307,
      windOffshore: 5882,
      hydropower: 7,
      solarEnergy: 1453,
      environmentalHeat: 380,
      biofuels: 1077,
      solidLiquidBiomass: 3236,
      biogasBiomethane: 7313,
      sewageGasLandfillGas: 231,
      biogenicWasteSewageSludge: 1857,
      nonBiogenicWaste: 2760,
      otherSources: 1,
      electricityExchangeBalance: -19278,
      districtHeatingExchangeBalance: -1503,
    },
  },
  {
    year: 2017,
    data: {
      sumValue: 111687,
      fossilFuels: 76611,
      coal: 9018,
      mineralOils: 32301,
      naturalGas: 35292,
      nuclearEnergy: 17509,
      renewableEnergies: 33821,
      windOnshore: 11539,
      windOffshore: 7014,
      hydropower: 9,
      solarEnergy: 1402,
      environmentalHeat: 414,
      biofuels: 1090,
      solidLiquidBiomass: 3248,
      biogasBiomethane: 7050,
      sewageGasLandfillGas: 238,
      biogenicWasteSewageSludge: 1817,
      nonBiogenicWaste: 2675,
      otherSources: 0,
      electricityExchangeBalance: -17438,
      districtHeatingExchangeBalance: -1493,
    },
  },
  {
    year: 2018,
    data: {
      sumValue: 122895,
      fossilFuels: 76905,
      coal: 9837,
      mineralOils: 32516,
      naturalGas: 34552,
      nuclearEnergy: 31442,
      renewableEnergies: 34363,
      windOnshore: 11535,
      windOffshore: 6987,
      hydropower: 7,
      solarEnergy: 1544,
      environmentalHeat: 444,
      biofuels: 1139,
      solidLiquidBiomass: 3368,
      biogasBiomethane: 7261,
      sewageGasLandfillGas: 232,
      biogenicWasteSewageSludge: 1845,
      nonBiogenicWaste: 2746,
      otherSources: 1,
      electricityExchangeBalance: -21130,
      districtHeatingExchangeBalance: -1430,
    },
  },
  {
    year: 2019,
    data: {
      sumValue: 117439,
      fossilFuels: 72967,
      coal: 7023,
      mineralOils: 32420,
      naturalGas: 33523,
      nuclearEnergy: 30767,
      renewableEnergies: 34653,
      windOnshore: 12515,
      windOffshore: 7224,
      hydropower: 4,
      solarEnergy: 1498,
      environmentalHeat: 481,
      biofuels: 1114,
      solidLiquidBiomass: 3289,
      biogasBiomethane: 6640,
      sewageGasLandfillGas: 234,
      biogenicWasteSewageSludge: 1653,
      nonBiogenicWaste: 2499,
      otherSources: 0,
      electricityExchangeBalance: -21933,
      districtHeatingExchangeBalance: -1514,
    },
  },
  {
    year: 2020,
    data: {
      sumValue: 119376,
      fossilFuels: 73750,
      coal: 5313,
      mineralOils: 32958,
      naturalGas: 35479,
      nuclearEnergy: 31977,
      renewableEnergies: 35881,
      windOnshore: 13200,
      windOffshore: 7033,
      hydropower: 6,
      solarEnergy: 1691,
      environmentalHeat: 523,
      biofuels: 1388,
      solidLiquidBiomass: 3229,
      biogasBiomethane: 6810,
      sewageGasLandfillGas: 236,
      biogenicWasteSewageSludge: 1765,
      nonBiogenicWaste: 2581,
      otherSources: 0,
      electricityExchangeBalance: -23336,
      districtHeatingExchangeBalance: -1475,
    },
  },
  {
    year: 2021,
    data: {
      sumValue: 122724,
      fossilFuels: 74135,
      coal: 5413,
      mineralOils: 32224,
      naturalGas: 36498,
      nuclearEnergy: 36462,
      renewableEnergies: 34212,
      windOnshore: 12547,
      windOffshore: 6069,
      hydropower: 5,
      solarEnergy: 1663,
      environmentalHeat: 583,
      biofuels: 1226,
      solidLiquidBiomass: 3341,
      biogasBiomethane: 6887,
      sewageGasLandfillGas: 234,
      biogenicWasteSewageSludge: 1657,
      nonBiogenicWaste: 2455,
      otherSources: 0,
      electricityExchangeBalance: -22988,
      districtHeatingExchangeBalance: -1550,
    },
  },
];
