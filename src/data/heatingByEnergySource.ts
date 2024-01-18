// Quelle: https://www.schleswig-holstein.de/DE/landesregierung/themen/energie/energiewende/Daten/pdf/monitoringbericht_2023_excel.html?nn=a7a1f501-0dcb-4ec3-b611-62605f645397
// Wärmeversorgung nach Energieträgern - 2021 nach Sektoren
//angegeben in GWh

type heatingByEnergySourceType = {
  year: number;
  data: {
    sumValue: number;
    coal: number;
    mineralOil: number;
    gas: number;
    districtHeatingFossil: number; // Fernwärme aus fossil
    renewables: number;
    districtHeatingFromRenewables: number; //Fernwärme aus EE
    biomass: number;
    solarpower: number;
  };
}[];

export const getHeatingSum = (
  data: heatingByEnergySourceType,
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

export const getHeatingPercentage = (
  data: heatingByEnergySourceType,
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
export const heatingByEnergySourceData: heatingByEnergySourceType = [
  {
    year: 2015,
    data: {
      sumValue: 44511,
      coal: 721,
      mineralOil: 6918,
      gas: 22758,
      districtHeatingFossil: 3208,
      renewables: 7169,
      districtHeatingFromRenewables: 1628,
      biomass: 3205,
      solarpower: 170,
    },
  },
  {
    year: 2016,
    data: {
      sumValue: 44861,
      coal: 553,
      mineralOil: 6813,
      gas: 23485,
      districtHeatingFossil: 3423,
      renewables: 7018,
      districtHeatingFromRenewables: 1605,
      biomass: 3151,
      solarpower: 160,
    },
  },
  {
    year: 2017,
    data: {
      sumValue: 45624,
      coal: 564,
      mineralOil: 7102,
      gas: 23859,
      districtHeatingFossil: 3488,
      renewables: 7231,
      districtHeatingFromRenewables: 1620,
      biomass: 3167,
      solarpower: 160,
    },
  },
  {
    year: 2018,
    data: {
      sumValue: 45131,
      coal: 976,
      mineralOil: 6885,
      gas: 22787,
      districtHeatingFossil: 3590,
      renewables: 7545,
      districtHeatingFromRenewables: 1902,
      biomass: 3208,
      solarpower: 180,
    },
  },
  {
    year: 2019,
    data: {
      sumValue: 42319,
      coal: 1056,
      mineralOil: 6360,
      gas: 20586,
      districtHeatingFossil: 3426,
      renewables: 7776,
      districtHeatingFromRenewables: 1998,
      biomass: 3173,
      solarpower: 170,
    },
  },
  {
    year: 2020,
    data: {
      sumValue: 44414,
      coal: 919,
      mineralOil: 7670,
      gas: 21419,
      districtHeatingFossil: 3326,
      renewables: 8023,
      districtHeatingFromRenewables: 2056,
      biomass: 3132,
      solarpower: 175,
    },
  },
  {
    year: 2021,
    data: {
      sumValue: 46547,
      coal: 853,
      mineralOil: 6714,
      gas: 23934,
      districtHeatingFossil: 3529,
      renewables: 8259,
      districtHeatingFromRenewables: 2238,
      biomass: 3231,
      solarpower: 170,
    },
  },
];
