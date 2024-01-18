// Quelle: https://www.schleswig-holstein.de/DE/landesregierung/themen/energie/energiewende/Daten/pdf/monitoringbericht_2023_excel.html?nn=a7a1f501-0dcb-4ec3-b611-62605f645397
// Gesamte CO2-Emissionen (Quellenbilanz) nach Sektoren 1990 - 2021

interface Data {
  year: number;
  sumValue: number;
  traffic: number;
  buildings: number;
  'private Haushalte': number;
  'Gewerbe, Handel, Dienstleistungen': number;
  industry: number;
  'Energiewirtschaft / Umwandlungsbereich': number;
  agriculture: number;
}

export const getSumInsgesamt = (
  data: Data[],
  year_range: [number, number],
): number => {
  const [startYear, endYear] = year_range;
  return data
    .filter((d) => d.year >= startYear && d.year <= endYear)
    .reduce((sum, d) => sum + d.sumValue, 0);
};

export const getInsgeamtByYear = (
  data: Data[],
  yearRange: [number, number],
): [number[], number[]] => {
  const sumArray: number[] = [];
  const yearArray: number[] = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].year >= yearRange[0] && data[i].year <= yearRange[1]) {
      sumArray.push(data[i].sumValue);
      yearArray.push(data[i].year);
    }
  }
  return [sumArray, yearArray];
};

export const totalEmissionsBySectorData = [
  {
    year: 2015,
    sumValue: 19996,
    traffic: 5418,
    buildings: 5237,
    'private Haushalte': 3282,
    'Gewerbe, Handel, Dienstleistungen': 1955,
    industry: 3043,
    'Energiewirtschaft / Umwandlungsbereich': 5584,
    agriculture: 713,
  },
  {
    year: 2016,
    sumValue: 19914,
    traffic: 5535,
    buildings: 5288,
    'private Haushalte': 3420,
    'Gewerbe, Handel, Dienstleistungen': 1868,
    industry: 3128,
    'Energiewirtschaft / Umwandlungsbereich': 5239,
    agriculture: 724,
  },
  {
    year: 2017,
    sumValue: 20017,
    traffic: 5582,
    buildings: 5466,
    'private Haushalte': 3413,
    'Gewerbe, Handel, Dienstleistungen': 2053,
    industry: 3248,
    'Energiewirtschaft / Umwandlungsbereich': 5028,
    agriculture: 693,
  },
  {
    year: 2018,
    sumValue: 19777,
    traffic: 5406,
    buildings: 5176,
    'private Haushalte': 3403,
    'Gewerbe, Handel, Dienstleistungen': 1772,
    industry: 3275,
    'Energiewirtschaft / Umwandlungsbereich': 5242,
    agriculture: 679,
  },
  {
    year: 2019,
    sumValue: 18494,
    traffic: 5433,
    buildings: 4640,
    'private Haushalte': 3374,
    'Gewerbe, Handel, Dienstleistungen': 1267,
    industry: 3348,
    'Energiewirtschaft / Umwandlungsbereich': 4427,
    agriculture: 646,
  },
  {
    year: 2020,
    sumValue: 18187,
    traffic: 5220,
    buildings: 4841,
    'private Haushalte': 3495,
    'Gewerbe, Handel, Dienstleistungen': 1346,
    industry: 3350,
    'Energiewirtschaft / Umwandlungsbereich': 4135,
    agriculture: 641,
  },
  {
    year: 2021,
    sumValue: 18358,
    traffic: 5022,
    buildings: 5268,
    'private Haushalte': 3510,
    'Gewerbe, Handel, Dienstleistungen': 1758,
    industry: 3212,
    'Energiewirtschaft / Umwandlungsbereich': 4212,
    agriculture: 643,
  },
];
