// Quelle: https://www.schleswig-holstein.de/DE/landesregierung/themen/energie/energiewende/Daten/pdf/monitoringbericht_2023_excel.html?nn=a7a1f501-0dcb-4ec3-b611-62605f645397
// Verschiedene Stromverbräuche 1990 - 2021 insgesamt und nach Sektoren
//angegeben in GWh

type energyConsumptionByFormType = {
  year: number;
  data: {
    primary: number;
    endEnergy: number;
    grossUsage: number;
    endEnergyHeating: number;
    endEnergyTraffic: number;
  };
}[];

export const getSum = (
  data: energyConsumptionByFormType,
  yearRange: [number, number],
) => {
  let sum = 0;
  for (const item of data) {
    if (item.year >= yearRange[0] && item.year <= yearRange[1]) {
      const dataObj = item.data;
      sum += dataObj.grossUsage;
    }
  }
  return sum;
};
export const getPercentage = (
  data: energyConsumptionByFormType,
  yearRange: [number, number],
) => {
  const value0: number | undefined = data.find(
    (element) => element.year == yearRange[0],
  )?.data.grossUsage;
  const value1: number | undefined = data.find(
    (element) => element.year == yearRange[1],
  )?.data.grossUsage;
  if (value0 && value1) {
    return (value1 / value0) * 100 - 100;
  }
  return 0;
};
export const greenHouseGasBySector: energyConsumptionByFormType = [
  {
    year: 2015,
    data: {
      primary: 121859,
      endEnergy: 76765,
      grossUsage: 16407,
      endEnergyHeating: 44511,
      endEnergyTraffic: 21649,
    },
  },
  {
    year: 2016,
    data: {
      primary: 124206,
      endEnergy: 77006,
      grossUsage: 16065,
      endEnergyHeating: 44861,
      endEnergyTraffic: 22114,
    },
  },
  {
    year: 2017,
    data: {
      primary: 111687,
      endEnergy: 77711,
      grossUsage: 15479,
      endEnergyHeating: 45624,
      endEnergyTraffic: 22263,
    },
  },
  {
    year: 2018,
    data: {
      primary: 122895,
      endEnergy: 77026,
      grossUsage: 16673,
      endEnergyHeating: 45131,
      endEnergyTraffic: 21678,
    },
  },
  {
    year: 2019,
    data: {
      primary: 117439,
      endEnergy: 74122,
      grossUsage: 16027,
      endEnergyHeating: 42319,
      endEnergyTraffic: 21714,
    },
  },
  {
    year: 2020,
    data: {
      primary: 119376,
      endEnergy: 74212,
      grossUsage: 15927,
      endEnergyHeating: 44414,
      endEnergyTraffic: 20074,
    },
  },
  {
    year: 2021,
    data: {
      primary: 122724,
      endEnergy: 76779,
      grossUsage: 16316,
      endEnergyHeating: 46547,
      endEnergyTraffic: 20341,
    },
  },
];
