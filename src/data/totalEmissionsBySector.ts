// Quelle: https://www.schleswig-holstein.de/DE/landesregierung/themen/energie/energiewende/Daten/pdf/monitoringbericht_2023_excel.html?nn=a7a1f501-0dcb-4ec3-b611-62605f645397
// Gesamte CO2-Emissionen (Quellenbilanz) nach Sektoren 1990 - 2021

interface Data {
  Jahr: number;
  insgesamt: number;
  Verkehr: number;
  Gebäude: number;
  'private Haushalte': number;
  'Gewerbe, Handel, Dienstleistungen': number;
  Industrie: number;
  'Energiewirtschaft / Umwandlungsbereich': number;
  Landwirtschaft: number;
}

export const getSumInsgesamt = (
  data: Data[],
  year_range: [number, number],
): number => {
  const [startYear, endYear] = year_range;
  return data
    .filter((d) => d.Jahr >= startYear && d.Jahr <= endYear)
    .reduce((sum, d) => sum + d.insgesamt, 0);
};

export const getInsgeamtByYear = (
  data: Data[],
  yearRange: [number, number],
): [number[], number[]] => {
  const insgesamtArray: number[] = [];
  const yearArray: number[] = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].Jahr >= yearRange[0] && data[i].Jahr <= yearRange[1]) {
      insgesamtArray.push(data[i].insgesamt);
      yearArray.push(data[i].Jahr);
    }
  }
  return [insgesamtArray, yearArray];
};

export const totalEmissionsBySectorData = [
  {
    Jahr: 1990,
    insgesamt: 26457,
    Verkehr: 6113,
    Gebäude: 7137,
    'private Haushalte': 5117,
    'Gewerbe, Handel, Dienstleistungen': 2020,
    Industrie: 5691,
    'Energiewirtschaft / Umwandlungsbereich': 6635,
    Landwirtschaft: 881,
  },
  {
    Jahr: 1995,
    insgesamt: 25608,
    Verkehr: 6249,
    Gebäude: 7129,
    'private Haushalte': 5026,
    'Gewerbe, Handel, Dienstleistungen': 2102,
    Industrie: 5578,
    'Energiewirtschaft / Umwandlungsbereich': 5960,
    Landwirtschaft: 692,
  },
  {
    Jahr: 2000,
    insgesamt: 24250,
    Verkehr: 6304,
    Gebäude: 6111,
    'private Haushalte': 4369,
    'Gewerbe, Handel, Dienstleistungen': 1743,
    Industrie: 5258,
    'Energiewirtschaft / Umwandlungsbereich': 5940,
    Landwirtschaft: 636,
  },
  {
    Jahr: 2005,
    insgesamt: 22169,
    Verkehr: 5541,
    Gebäude: 5429,
    'private Haushalte': 4051,
    'Gewerbe, Handel, Dienstleistungen': 1378,
    Industrie: 4199,
    'Energiewirtschaft / Umwandlungsbereich': 6425,
    Landwirtschaft: 575,
  },
  {
    Jahr: 2010,
    insgesamt: 21415,
    Verkehr: 5163,
    Gebäude: 5104,
    'private Haushalte': 3959,
    'Gewerbe, Handel, Dienstleistungen': 1145,
    Industrie: 3680,
    'Energiewirtschaft / Umwandlungsbereich': 6850,
    Landwirtschaft: 618,
  },
  {
    Jahr: 2015,
    insgesamt: 19996,
    Verkehr: 5418,
    Gebäude: 5237,
    'private Haushalte': 3282,
    'Gewerbe, Handel, Dienstleistungen': 1955,
    Industrie: 3043,
    'Energiewirtschaft / Umwandlungsbereich': 5584,
    Landwirtschaft: 713,
  },
  {
    Jahr: 2016,
    insgesamt: 19914,
    Verkehr: 5535,
    Gebäude: 5288,
    'private Haushalte': 3420,
    'Gewerbe, Handel, Dienstleistungen': 1868,
    Industrie: 3128,
    'Energiewirtschaft / Umwandlungsbereich': 5239,
    Landwirtschaft: 724,
  },
  {
    Jahr: 2017,
    insgesamt: 20017,
    Verkehr: 5582,
    Gebäude: 5466,
    'private Haushalte': 3413,
    'Gewerbe, Handel, Dienstleistungen': 2053,
    Industrie: 3248,
    'Energiewirtschaft / Umwandlungsbereich': 5028,
    Landwirtschaft: 693,
  },
  {
    Jahr: 2018,
    insgesamt: 19777,
    Verkehr: 5406,
    Gebäude: 5176,
    'private Haushalte': 3403,
    'Gewerbe, Handel, Dienstleistungen': 1772,
    Industrie: 3275,
    'Energiewirtschaft / Umwandlungsbereich': 5242,
    Landwirtschaft: 679,
  },
  {
    Jahr: 2019,
    insgesamt: 18494,
    Verkehr: 5433,
    Gebäude: 4640,
    'private Haushalte': 3374,
    'Gewerbe, Handel, Dienstleistungen': 1267,
    Industrie: 3348,
    'Energiewirtschaft / Umwandlungsbereich': 4427,
    Landwirtschaft: 646,
  },
  {
    Jahr: 2020,
    insgesamt: 18187,
    Verkehr: 5220,
    Gebäude: 4841,
    'private Haushalte': 3495,
    'Gewerbe, Handel, Dienstleistungen': 1346,
    Industrie: 3350,
    'Energiewirtschaft / Umwandlungsbereich': 4135,
    Landwirtschaft: 641,
  },
  {
    Jahr: 2021,
    insgesamt: 18358,
    Verkehr: 5022,
    Gebäude: 5268,
    'private Haushalte': 3510,
    'Gewerbe, Handel, Dienstleistungen': 1758,
    Industrie: 3212,
    'Energiewirtschaft / Umwandlungsbereich': 4212,
    Landwirtschaft: 643,
  },
];
