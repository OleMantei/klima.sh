const relevantMgtg = ['01', '03', '04'];

export type HouseholdDataType = {
  identifier: string;
  purpose: string;
  planning: boolean;
  entirePeriod: boolean;
  data: { [key: string]: number };
  mgtg: string;
}[];

export const filterDataByYearAndMgtg = (
  data: HouseholdDataType,
  yearRange: [number, number],
  planning: boolean,
): HouseholdDataType => {
  const [startYear, endYear] = yearRange;

  return data
    .filter(
      (item) => relevantMgtg.includes(item.mgtg) && item.planning === planning,
    )
    .map((item) => {
      const filteredData = Object.fromEntries(
        Object.entries(item.data).filter(([year, value]) => {
          const yearInt = parseInt(year);
          return yearInt >= startYear && yearInt <= endYear && value > 0;
        }),
      );

      return {
        ...item,
        data: filteredData,
      };
    })
    .filter((item) => Object.keys(item.data).length > 0);
};

type HouseholdDataTotalType = {
  [key: string]: number | undefined;
};

type YearRange = [number, number];

export const getHouseholdSumFast = (
  data: HouseholdDataTotalType,
  range: YearRange,
): number => {
  const [startYear, endYear] = range;
  let sum = 0;

  for (let year = startYear; year <= endYear; year++) {
    sum += data[year.toString()] || 0;
  }

  return Math.round(sum / 1000);
};

export const getHouseholdSumByYear = (
  data: HouseholdDataTotalType,
  year: number,
): number => {
  let sum = 0;

  data.forEach((i) => {
    sum += i.data[year];
  });
  for (let year = startYear; year <= endYear; year++) {
    sum += data[year.toString()] || 0;
  }

  return Math.round(sum / 1000);
};

export const getHouseholdPercentage = (
  data: HouseholdDataTotalType,
  range: YearRange,
): number => {
  const [startYear, endYear] = range;
  let startValue: number;
  if (startYear != endYear) startValue = data[startYear.toString()] || 0;
  else startValue = data[(startYear - 1).toString()] || 0;
  const endValue = data[endYear.toString()] || 0;

  if (startValue === 0 && endValue === 0) {
    return 0; // If both values are 0, the percentage change is 0
  } else if (startValue === 0) {
    return 100; // If only the start value is 0, the percentage change is 100%
  } else {
    const returnValue: number = Math.round((endValue / startValue) * 100 - 100);
    return returnValue;
  }
};

export const getHouseholdSum = (
  householdData: HouseholdDataType,
  yearRange: [number, number],
): number => {
  let sum = 0;
  const [startYear, endYear] = yearRange;

  householdData.forEach((item) => {
    for (let year = startYear; year <= endYear; year++) {
      const yearData = item.data[year.toString()];
      if (yearData !== undefined) {
        sum += yearData;
      }
    }
  });

  return Math.round(sum / 1000);
};
export const getHouseholdGroups = (
  data: HouseholdDataType,
  yearRange: [number, number],
): [number, number, number] => {
  let sum01 = 0,
    sum03 = 0,
    sum04 = 0;
  data.forEach((item) => {
    if (['01', '03', '04'].includes(item.mgtg)) {
      Object.entries(item.data).forEach(([year, value]) => {
        const yearNumber = Number(year);
        if (yearNumber >= yearRange[0] && yearNumber <= yearRange[1]) {
          if (value !== undefined) {
            if (item.mgtg === '01') sum01 += value;
            else if (item.mgtg === '03') sum03 += value;
            else if (item.mgtg === '04') sum04 += value;
          }
        }
      });
    }
  });

  return [
    Math.round(sum01 / 1000),
    Math.round(sum03 / 1000),
    Math.round(sum04 / 1000),
  ];
};
export const householdDataTotal: HouseholdDataTotalType = {
  '2014': 14996.6,
  '2015': 21723.8,
  '2016': 18021,
  '2017': 20435.6,
  '2018': 22710.1,
  '2019': 20611.2,
  '2020': 111500.8,
  '2021': 195906.4,
};

export const householdData: HouseholdDataType = [
  {
    identifier: '11101',
    purpose: 'Gebühren und tarifliche Entgelte',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 120.2,
      '2015': 128.1,
      '2016': 180,
      '2017': 180.6,
      '2018': 342.1,
      '2019': 620.3,
      '2020': 215.4,
      '2021': 255.5,
    },
    mgtg: '01',
  },
  {
    identifier: '11102',
    purpose:
      'Verwaltungsgebühren für Amtshandlungen der Landesregulierungsbehörde',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 30.5,
      '2019': -30.5,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '11103',
    purpose:
      'Verwaltungsgebühren und Auslagen für Amtshandlungen der Energieaufsichtsbehörde nach dem Energiewirtschaftsgesetz',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 0,
      '2015': 0.8,
      '2016': 3,
      '2017': 6.2,
      '2018': 0,
      '2019': 3.6,
      '2020': 3,
      '2021': 8,
    },
    mgtg: '',
  },
  {
    identifier: '11104',
    purpose:
      'Verwaltungsgebühren für Amtshandlungen auf dem Gebiet des Bergrechts',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 140,
      '2015': 72.8,
      '2016': 55.1,
      '2017': 40,
      '2018': 48.4,
      '2019': 56.8,
      '2020': 44.3,
      '2021': 58.7,
    },
    mgtg: '',
  },
  {
    identifier: '11105',
    purpose:
      'Gebühren und Auslagen im Rahmen der Planfeststellungsverfahren für Energieleitungen',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 1963.8,
      '2015': 6183.2,
      '2016': 1671.2,
      '2017': 2319.2,
      '2018': 4429.6,
      '2019': 647.7,
      '2020': 2415.7,
      '2021': 803.7,
    },
    mgtg: '',
  },
  {
    identifier: '11901',
    purpose: 'Einnahmen aus Veröffentlichungen',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 0,
      '2015': 0.3,
      '2016': 0.6,
      '2017': 1.2,
      '2018': 0.4,
      '2019': 0.2,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '01',
  },
  {
    identifier: '11902',
    purpose:
      'Einnahmen aus zurückzuzahlenden Förderungszuschüssen im Rahmen der Corona-Nothilfen',
    planning: false,
    entirePeriod: false,
    data: {
      '2020': 0,
      '2021': 646.2,
    },
    mgtg: '',
  },
  {
    identifier: '11999',
    purpose: 'Vermischte Einnahmen',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 1.3,
      '2015': 0,
      '2016': 0.1,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '01',
  },
  {
    identifier: '23101',
    purpose: 'Erstattungen des Bundes für den Bundesfreiwilligendienst',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 3,
      '2015': 3,
      '2016': 3.3,
      '2017': 2.3,
      '2018': 3.3,
      '2019': 1.8,
      '2020': 7.3,
      '2021': 3.2,
    },
    mgtg: '01',
  },
  {
    identifier: '28101',
    purpose:
      'Erstattungen "Regionale Netzstellen Nachhaltigkeitsstrategien (RENN.nord SH)"',
    planning: false,
    entirePeriod: false,
    data: {
      '2016': 0,
      '2017': 0,
      '2018': 3.9,
      '2019': 131.8,
      '2020': 7.3,
      '2021': 8.1,
    },
    mgtg: '01',
  },
  {
    identifier: '28102',
    purpose: 'Erstattung der EKSH für Personalkosten',
    planning: false,
    entirePeriod: false,
    data: {
      '2018': 0,
      '2019': 0,
      '2020': 202.7,
      '2021': 208.6,
    },
    mgtg: '',
  },
  {
    identifier: '28103',
    purpose:
      'Erstattung des BMU im Rahmen des Projekts "Betrieb des eHighways an der BAB A1 in Schleswig-Holstein - FESH II-A"',
    planning: false,
    entirePeriod: false,
    data: {
      '2019': 250,
      '2020': 405,
      '2021': 440,
    },
    mgtg: '',
  },
  {
    identifier: '28202',
    purpose:
      'Beiträge Dritter für Zwecke des Bildungszentrums für Natur, Umwelt und ländliche Räume',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 236,
      '2015': 95.2,
      '2016': 170.1,
      '2017': 125,
      '2018': 63.1,
      '2019': 49.1,
      '2020': 39,
      '2021': 40,
    },
    mgtg: '01',
  },
  {
    identifier: '34603',
    purpose: 'Zuschüsse der EU für Biomasseförderung',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '35605',
    purpose: 'Entnahme aus der Rücklage "Sabbatjahr"',
    planning: false,
    entirePeriod: false,
    data: {
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '35606',
    purpose: 'Entnahme aus der Rücklage "Sabbatjahr Tarifbeschäftigte"',
    planning: false,
    entirePeriod: false,
    data: {
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '35913',
    purpose:
      'Entnahme aus der Rücklage zur Abwicklung des Corona Notkredits für die Corona-Nothilfen in den Jahren 2021 - 2024',
    planning: false,
    entirePeriod: false,
    data: {
      '2019': 0,
      '2020': 0,
      '2021': 40743,
    },
    mgtg: '',
  },
  {
    identifier: '35923',
    purpose:
      'Entnahme aus der Rücklage zur Abwicklung des Bund-Länder-Aktionsprogramms "Aufholen nach Corona für Kinder und Jugendliche" in den Jahren 2021 und 2022',
    planning: false,
    entirePeriod: false,
    data: {
      '2020': 0,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '42201',
    purpose:
      'Bezüge und Nebenleistungen der planmäßigen Beamtinnen und Beamten (Richterinnen und Richter)',
    planning: false,
    entirePeriod: false,
    data: {
      '2019': 840.4,
      '2020': 875.9,
      '2021': 911.1,
    },
    mgtg: '',
  },
  {
    identifier: '42203',
    purpose: 'Anwärterbezüge der Beamtinnen und Beamten im Vorbereitungsdienst',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '42204',
    purpose:
      'Bezüge und Nebenleistungen der planmäßigen Beamtinnen und Beamten',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 72.2,
      '2015': 73.8,
      '2016': 75.4,
      '2017': 77.9,
      '2018': 79.7,
      '2019': 82.3,
      '2020': 83.2,
      '2021': 18.9,
    },
    mgtg: '01',
  },
  {
    identifier: '42261',
    purpose: 'Bezüge und Nebenleistungen der planmäßigen Beamtinnen und Beamte',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 225.6,
      '2015': 227.8,
      '2016': 269.6,
      '2017': 244.4,
      '2018': 201.5,
      '2019': 197.6,
      '2020': 217.5,
      '2021': 285.4,
    },
    mgtg: '61',
  },
  {
    identifier: '42701',
    purpose: 'Beschäftigungsentgelte an Vertretungs- und Aushilfskräfte',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '42702',
    purpose: 'Beschäftigungsentgelte an Vertretungs- und Aushilfskräfte',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '01',
  },
  {
    identifier: '42761',
    purpose: 'Beschäftigungsentgelte an Vertretungs- und Aushilfskräfte',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '61',
  },
  {
    identifier: '42801',
    purpose: 'Entgelte der Arbeitnehmerinnen und Arbeitnehmer',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 1103,
      '2015': 1327.2,
      '2016': 1163.9,
      '2017': 1176.2,
      '2018': 1347.4,
      '2019': 1182.4,
      '2020': 1410.4,
      '2021': 1476,
    },
    mgtg: '',
  },
  {
    identifier: '42802',
    purpose: 'Entgelte der Arbeitnehmerinnen und Arbeitnehmer',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 432.6,
      '2015': 467.9,
      '2016': 474.4,
      '2017': 497.5,
      '2018': 462.7,
      '2019': 488.3,
      '2020': 527.5,
      '2021': 468,
    },
    mgtg: '01',
  },
  {
    identifier: '42861',
    purpose: 'Entgelte der Arbeitnehmerinnen und Arbeitnehmer',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 355,
      '2015': 331.5,
      '2016': 306.9,
      '2017': 368.4,
      '2018': 174.6,
      '2019': 223.8,
      '2020': 248,
      '2021': 327.3,
    },
    mgtg: '61',
  },
  {
    identifier: '51101',
    purpose:
      'Geschäftsbedarf und Kommunikation sowie Geräte-, Ausstattungs- und Ausrüstungsgegenstände, sonstige Gebrauchsgegenstände',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 63,
      '2015': 46.9,
      '2016': 34.8,
      '2017': 35.9,
      '2018': 19.5,
      '2019': 40.5,
      '2020': 21.9,
      '2021': 14.7,
    },
    mgtg: '01',
  },
  {
    identifier: '51161',
    purpose:
      'Geschäftsbedarf und Kommunikation sowie Geräte, Ausstattungs- und Ausrüstungsgegenstände',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 1.9,
      '2015': 3,
      '2016': 2.3,
      '2017': 2.4,
      '2018': 2.6,
      '2019': 0.7,
      '2020': 2,
      '2021': 0.2,
    },
    mgtg: '61',
  },
  {
    identifier: '51401',
    purpose: 'Verbrauchsmittel, Haltung von Fahrzeugen und dgl.',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 5.1,
      '2015': 2.8,
      '2016': 2.6,
      '2017': 3.8,
      '2018': 2.6,
      '2019': 3.2,
      '2020': 2.8,
      '2021': 2.4,
    },
    mgtg: '01',
  },
  {
    identifier: '51461',
    purpose: 'Verbrauchsmittel, Haltung von Fahrzeugen',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '61',
  },
  {
    identifier: '51802',
    purpose: 'Mieten und Pachten für Maschinen, Geräte und Fahrzeuge',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '01',
  },
  {
    identifier: '52502',
    purpose:
      'Fortbildung der Mitarbeiterinnen und Mitarbeiter einschließlich Reisekosten',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 7.8,
      '2015': 4.3,
      '2016': 2,
      '2017': 4.8,
      '2018': 1.8,
      '2019': 4.4,
      '2020': 4.7,
      '2021': 5.3,
    },
    mgtg: '01',
  },
  {
    identifier: '52561',
    purpose: 'Fortbildung der Mitarbeiterinnen und Mitarbeiter',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 1.2,
      '2015': 1.9,
      '2016': 1.2,
      '2017': 0.3,
      '2018': 4,
      '2019': 1.5,
      '2020': 0.7,
      '2021': 3.6,
    },
    mgtg: '61',
  },
  {
    identifier: '52603',
    purpose: 'Fachbeiräte und ähnliche Ausschüsse',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 4.6,
      '2015': 0,
      '2016': 0.2,
      '2017': 0,
      '2018': 0,
      '2019': 4.7,
      '2020': 1.5,
      '2021': 0,
    },
    mgtg: '03',
  },
  {
    identifier: '52604',
    purpose: 'Fachbeiräte und ähnliche Ausschüsse',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 0.5,
      '2015': 2.7,
      '2016': 1.3,
      '2017': 1.6,
      '2018': 4.6,
      '2019': 2,
      '2020': 0.5,
      '2021': 0.2,
    },
    mgtg: '01',
  },
  {
    identifier: '52701',
    purpose: 'Dienstreisen',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 1.7,
      '2015': 2.4,
      '2016': 3.1,
      '2017': 3.8,
      '2018': 2.2,
      '2019': 2.7,
      '2020': 1.9,
      '2021': 0.3,
    },
    mgtg: '01',
  },
  {
    identifier: '52761',
    purpose: 'Dienstreisen',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 1.1,
      '2015': 1.6,
      '2016': 0.5,
      '2017': 1.1,
      '2018': 0.9,
      '2019': 0.9,
      '2020': 0.2,
      '2021': 0.6,
    },
    mgtg: '61',
  },
  {
    identifier: '53301',
    purpose: 'Maßnahmen zur Förderung der Nachhaltigkeit',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 73,
      '2015': 60.4,
      '2016': 70.6,
      '2017': 47.9,
      '2018': 47.8,
      '2019': 93.5,
      '2020': 98.6,
      '2021': 31.8,
    },
    mgtg: '04',
  },
  {
    identifier: '53302',
    purpose: 'Kompetenzzentrum nachhaltige Beschaffung und Vergabe',
    planning: false,
    entirePeriod: false,
    data: {
      '2019': 0,
      '2020': 60,
      '2021': 60,
    },
    mgtg: '04',
  },
  {
    identifier: '53303',
    purpose:
      'Ausgaben für Kooperationsvereinbarung zum FÖJ mit der Evangelisch-Lutherischen Kirche in Norddeutschland',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 3.6,
      '2017': 10.2,
      '2018': 10.9,
      '2019': 5.9,
      '2020': 11.1,
      '2021': 9.6,
    },
    mgtg: '01',
  },
  {
    identifier: '53304',
    purpose:
      'Untersuchungen und Informationsgrundlagen zu Energierohstoffen und Potenzialen des tiefen geologischen Untergrundes; Strukturgeologie',
    planning: false,
    entirePeriod: false,
    data: {
      '2015': 0,
      '2016': 0,
      '2017': 248.4,
      '2018': 274.4,
      '2019': 313.4,
      '2020': 354.4,
      '2021': 315.4,
    },
    mgtg: '',
  },
  {
    identifier: '53305',
    purpose: 'Wettbewerb Solarenergieausbau',
    planning: false,
    entirePeriod: false,
    data: {
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '03',
  },
  {
    identifier: '53306',
    purpose: 'Verträge mit Dritten',
    planning: false,
    entirePeriod: false,
    data: {
      '2021': 160.4,
    },
    mgtg: '',
  },
  {
    identifier: '53307',
    purpose:
      'Ausgaben im Zusammenhang mit einer schleswig-holsteinischen und norddeutschen Wasserstoffstrategie aus Mitteln des Konjunkturprogrammes',
    planning: false,
    entirePeriod: false,
    data: {
      '2021': 421.9,
    },
    mgtg: '05',
  },
  {
    identifier: '53308',
    purpose: 'BNE-Agentur im Rahmen der Landesstrategie BNE',
    planning: false,
    entirePeriod: false,
    data: {
      '2020': 0,
      '2021': 0,
    },
    mgtg: '01',
  },
  {
    identifier: '53309',
    purpose: 'Maßnahmen zur Umsetzung des Erneuerbare-Energien-Wärmegesetzes',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '03',
  },
  {
    identifier: '53310',
    purpose:
      'Maßnahmen der Energiewirtschaft, der Energiewende und des Klimaschutzes/Klimawandels',
    planning: false,
    entirePeriod: false,
    data: {
      '2019': 540.1,
      '2020': 713,
      '2021': 732,
    },
    mgtg: '03',
  },
  {
    identifier: '53311',
    purpose: 'Klimawandelanpassungsstrategie',
    planning: false,
    entirePeriod: false,
    data: {
      '2021': 0,
    },
    mgtg: '03',
  },
  {
    identifier: '53312',
    purpose: 'Ausgaben für Kommunikation und Dialog zum Netzausbau',
    planning: false,
    entirePeriod: false,
    data: {
      '2021': 24.3,
    },
    mgtg: '03',
  },
  {
    identifier: '53313',
    purpose:
      'Aufwendungen für Maßnahmen zur Optimierung der Regulierung schleswig-holsteinischer Netzbetreiber',
    planning: false,
    entirePeriod: false,
    data: {
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '03',
  },
  {
    identifier: '53315',
    purpose:
      'Ausgaben im Zusammenhang mit der Umsetzung und Fortschreibung einer Wasserstoffstrategie',
    planning: false,
    entirePeriod: false,
    data: {
      '2021': 23.5,
    },
    mgtg: '05',
  },
  {
    identifier: '53361',
    purpose:
      'Ausgaben aufgrund von Werkverträgen oder anderen Auftragsformen für Untersuchungen, Messungen und Gutachten',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 11.9,
      '2021': 0,
    },
    mgtg: '61',
  },
  {
    identifier: '53401',
    purpose: 'Ausgaben im Zusammenhang mit dem Bundesfreiwilligendienst',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 9.8,
      '2015': 9.8,
      '2016': 9.7,
      '2017': 7,
      '2018': 7.8,
      '2019': 6,
      '2020': 9.9,
      '2021': 10.4,
    },
    mgtg: '01',
  },
  {
    identifier: '53501',
    purpose:
      'Maßnahmen zur Umweltbildung / Bildung für nachhaltige Entwicklung',
    planning: false,
    entirePeriod: false,
    data: {
      '2019': 941.9,
      '2020': 475.3,
      '2021': 465.9,
    },
    mgtg: '01',
  },
  {
    identifier: '54699',
    purpose:
      'Vermischte Verwaltungsausgaben, Kassen- und Zahlstellenfehlbeträge',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 1.2,
    },
    mgtg: '01',
  },
  {
    identifier: '54761',
    purpose: 'Nicht aufteilbare sächliche Verwaltungsausgaben',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 2.1,
      '2015': 81.4,
      '2016': 1.9,
      '2017': 8.3,
      '2018': 16.8,
      '2019': 4.5,
      '2020': 2.1,
      '2021': 7,
    },
    mgtg: '61',
  },
  {
    identifier: '63201',
    purpose:
      'Beitrag zum BANU (Bundesweiter Arbeitskreis der staatlich getragenen Bildungsstätten im Natur- und Umweltschutz)',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 0,
      '2015': 0.1,
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '01',
  },
  {
    identifier: '63202',
    purpose: 'Vertragliche Entgelte an die Bundesnetzagentur',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 199.5,
      '2015': 201,
      '2016': 160.6,
      '2017': 172.6,
      '2018': 193.7,
      '2019': 181.8,
      '2020': 198.3,
      '2021': 181.6,
    },
    mgtg: '',
  },
  {
    identifier: '63301',
    purpose:
      'Zuwendungen an Gemeinden und Gemeindeverbände für Lehrgänge zur Qualifizierung von Natur- und Landschaftsführer/-innen und Geprüften Natur- und Landschaftspfleger/-innen',
    planning: false,
    entirePeriod: false,
    data: {
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '01',
  },
  {
    identifier: '63302',
    purpose: 'Koförderung im Rahmen der Kommunalrichtlinie/NKI',
    planning: false,
    entirePeriod: false,
    data: {
      '2021': 0,
    },
    mgtg: '03',
  },
  {
    identifier: '63401',
    purpose: 'Zuführung an das Sondervermögen Energie und Klimaschutz',
    planning: false,
    entirePeriod: false,
    data: {
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '67101',
    purpose:
      'Aufwendungen im Zuge "Betrieb des eHighways an der BAB A1 in Schleswig-Holstein - FESH II-A"',
    planning: false,
    entirePeriod: false,
    data: {
      '2018': 0,
      '2019': 250,
      '2020': 405,
      '2021': 440,
    },
    mgtg: '',
  },
  {
    identifier: '67102',
    purpose:
      'Erstattung von Verwaltungskosten an die Investitionsbank für Förderprogramme',
    planning: false,
    entirePeriod: false,
    data: {
      '2021': 0,
    },
    mgtg: '03',
  },
  {
    identifier: '67103',
    purpose:
      'Erstattung von Kosten an die bevollmächtigten Bezirksschornsteinfeger/-innen Schornsteinfeger für die Durchführung der Prüfung nach \r\n§ 9 EWKG',
    planning: false,
    entirePeriod: false,
    data: {
      '2020': 0,
      '2021': 0,
    },
    mgtg: '03',
  },
  {
    identifier: '67104',
    purpose:
      'Erstattung von Kosten an Gemeinden für die Aufstellung kommunaler Wärme- und Kältepläne nach § 7 EWKG',
    planning: false,
    entirePeriod: false,
    data: {
      '2020': 0,
      '2021': 0,
    },
    mgtg: '03',
  },
  {
    identifier: '67106',
    purpose: 'Erstattung von Kosten für die Verwaltung von Erbbaurechten',
    planning: false,
    entirePeriod: false,
    data: {
      '2021': 15.1,
    },
    mgtg: '06',
  },
  {
    identifier: '68101',
    purpose: 'Klimaschutz für Bürgerinnen und Bürger',
    planning: false,
    entirePeriod: false,
    data: {
      '2018': 0,
      '2019': 0,
      '2020': 2346.5,
      '2021': 2900,
    },
    mgtg: '03',
  },
  {
    identifier: '68215',
    purpose:
      'Zuschüsse für laufende Zwecke an öffentliche Unternehmen für Maßnahmen im Rahmen einer Wasserstoffstrategie',
    planning: false,
    entirePeriod: false,
    data: {
      '2020': 0,
      '2021': 0,
    },
    mgtg: '05',
  },
  {
    identifier: '68301',
    purpose:
      'Zuwendungen an Sonstige für Lehrgänge zur Qualifizierung von Natur- und Landschaftsführer/-innen und Geprüften Natur- und Landschaftspfleger/-innen',
    planning: false,
    entirePeriod: false,
    data: {
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '01',
  },
  {
    identifier: '68306',
    purpose: 'Erbbauzinsen',
    planning: false,
    entirePeriod: false,
    data: {
      '2021': 388.8,
    },
    mgtg: '06',
  },
  {
    identifier: '68315',
    purpose:
      'Zuschüsse für laufende Zwecke an private Unternehmen für Maßnahmen im Rahmen einer Wasserstoffstrategie',
    planning: false,
    entirePeriod: false,
    data: {
      '2020': 0,
      '2021': 0,
    },
    mgtg: '05',
  },
  {
    identifier: '68401',
    purpose:
      'Zuwendung an das "Bündnis Eine Welt" zur Umsetzung des Fachpromotorenprogramms',
    planning: false,
    entirePeriod: false,
    data: {
      '2016': 100,
      '2017': 100,
      '2018': 100,
      '2019': 136,
      '2020': 136,
      '2021': 136,
    },
    mgtg: '04',
  },
  {
    identifier: '68402',
    purpose: 'Freiwilliges ökologisches Jahr',
    planning: false,
    entirePeriod: false,
    data: {
      '2017': 1234.8,
      '2018': 1265.5,
      '2019': 1333.1,
      '2020': 1556.2,
      '2021': 1650.1,
    },
    mgtg: '',
  },
  {
    identifier: '68403',
    purpose: 'An den Förderverein Green Screen Festival e. V.',
    planning: false,
    entirePeriod: false,
    data: {
      '2019': 40,
      '2020': 40,
      '2021': 40,
    },
    mgtg: '04',
  },
  {
    identifier: '68404',
    purpose: 'Institutionelle Förderung des "Bündnis Eine Welt " (BEI)',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 19.6,
      '2015': 19.6,
      '2016': 40,
      '2017': 40,
      '2018': 40,
      '2019': 40,
      '2020': 40,
      '2021': 40,
    },
    mgtg: '04',
  },
  {
    identifier: '68405',
    purpose:
      'Zuschüsse zur Intensivierung der internationalen und Entwicklungs-Zusammenarbeit',
    planning: false,
    entirePeriod: false,
    data: {
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '04',
  },
  {
    identifier: '68501',
    purpose: 'Landeskoordinierungsstelle Elektromobilität',
    planning: false,
    entirePeriod: false,
    data: {
      '2021': 0,
    },
    mgtg: '03',
  },
  {
    identifier: '68515',
    purpose:
      'Zuschüsse für laufende Zwecke an öffentliche Einrichtungen für Maßnahmen im Rahmen einer Wasserstoffstrategie',
    planning: false,
    entirePeriod: false,
    data: {
      '2020': 0,
      '2021': 0,
    },
    mgtg: '05',
  },
  {
    identifier: '68601',
    purpose:
      'Institutionelle Förderung Cluster EE.SH-Netzwerkagentur Erneuerbare Energien',
    planning: false,
    entirePeriod: false,
    data: {
      '2021': 0,
    },
    mgtg: '03',
  },
  {
    identifier: '68605',
    purpose: 'Beiträge und Kostenanteile an Vereine und Gesellschaften',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 135.8,
      '2015': 4.3,
      '2016': 4.4,
      '2017': 14.7,
      '2018': 14.7,
      '2019': 14.7,
      '2020': 14.7,
      '2021': 17.4,
    },
    mgtg: '03',
  },
  {
    identifier: '68607',
    purpose: 'Förderung der Wärmewende und innovative Wärmeversorgung',
    planning: false,
    entirePeriod: false,
    data: {
      '2021': 0,
    },
    mgtg: '03',
  },
  {
    identifier: '68608',
    purpose: 'Zuwendungen und Projektförderungen',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 0,
      '2015': 284,
      '2016': 804,
      '2017': 1187.4,
      '2018': 819.5,
      '2019': 1095.8,
      '2020': 1474.4,
      '2021': 4176.3,
    },
    mgtg: '03',
  },
  {
    identifier: '68609',
    purpose: 'Energieforschung',
    planning: false,
    entirePeriod: false,
    data: {
      '2019': 0,
      '2020': 0,
      '2021': 6.9,
    },
    mgtg: '03',
  },
  {
    identifier: '68610',
    purpose: 'Kofinanzierung für EFRE-Projekte zum Klimaschutz',
    planning: false,
    entirePeriod: false,
    data: {
      '2021': 0,
    },
    mgtg: '03',
  },
  {
    identifier: '68616',
    purpose:
      'Sonstige Zuschüsse für laufende Zwecke im Inland für Maßnahmen im Rahmen der Wasserstoffstrategie',
    planning: false,
    entirePeriod: false,
    data: {
      '2020': 0,
      '2021': 0,
    },
    mgtg: '05',
  },
  {
    identifier: '68617',
    purpose:
      'Zuschüsse an Dritte für Maßnahmen im Rahmen einer schleswig-holsteinischen Wasserstoffstrategie aus Mitteln des Konjunkturprogrammes',
    planning: false,
    entirePeriod: false,
    data: {
      '2020': 0,
      '2021': 72.8,
    },
    mgtg: '05',
  },
  {
    identifier: '81201',
    purpose: 'Erwerb von Geräten und Ausrüstungsgegenständen',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '01',
  },
  {
    identifier: '82106',
    purpose: 'Grunderwerb',
    planning: false,
    entirePeriod: false,
    data: {
      '2021': 0,
    },
    mgtg: '06',
  },
  {
    identifier: '89201',
    purpose: 'Förderung von Vorhaben zur energetischen Nutzung von Biomasse',
    planning: false,
    entirePeriod: true,
    data: {
      '2014': -92.6,
      '2015': 29.9,
      '2016': -0.2,
      '2017': -50,
      '2018': 0,
      '2019': 0,
      '2020': -4.2,
      '2021': -24.4,
    },
    mgtg: '03',
  },
  {
    identifier: '89202',
    purpose: 'Förderung der Erzeugung von grünem Wasserstoff',
    planning: false,
    entirePeriod: false,
    data: {
      '2021': 0,
    },
    mgtg: '05',
  },
  {
    identifier: '89206',
    purpose: 'Zuschüsse für Investitionen im Rahmen des Projektes HySCALE 100',
    planning: false,
    entirePeriod: false,
    data: {
      '2021': 0,
    },
    mgtg: '05',
  },
  {
    identifier: '91605',
    purpose: 'Zuführung an die Rücklage "Sabbatjahr"',
    planning: false,
    entirePeriod: false,
    data: {
      '2019': 0,
      '2020': 8.9,
      '2021': 27.1,
    },
    mgtg: '',
  },
  {
    identifier: '91606',
    purpose: 'Zuführung an die Rücklage "Sabbatjahr Tarifbeschäftigte"',
    planning: false,
    entirePeriod: false,
    data: {
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '91905',
    purpose:
      'Zuführung an die Rücklage zur Abwicklung des Projektes HySCALE 100',
    planning: false,
    entirePeriod: false,
    data: {
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '91913',
    purpose:
      'Zuführung an die Rücklage zur Abwicklung des Corona Notkredits für die Corona-Nothilfen in den Jahren 2021 - 2024',
    planning: false,
    entirePeriod: false,
    data: {
      '2019': 0,
      '2020': 40743,
      '2021': 42781.5,
    },
    mgtg: '',
  },
  {
    identifier: '91923',
    purpose:
      'Zuführung an die Rücklage zur Abwicklung des Bund-Länder-Aktionsprogramms "Aufholen nach Corona für Kinder und Jugendliche" in den Jahren 2021 und 2022',
    planning: false,
    entirePeriod: false,
    data: {
      '2020': 0,
      '2021': 89,
    },
    mgtg: '',
  },
  {
    identifier: '11101',
    purpose: 'Gebühren und tarifliche Entgelte',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 100,
      '2015': 100,
      '2016': 100,
      '2017': 100,
      '2018': 103,
      '2019': 103,
      '2020': 103,
      '2021': 103,
    },
    mgtg: '01',
  },
  {
    identifier: '11102',
    purpose:
      'Verwaltungsgebühren für Amtshandlungen der Landesregulierungsbehörde',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '11103',
    purpose:
      'Verwaltungsgebühren und Auslagen für Amtshandlungen der Energieaufsichtsbehörde nach dem Energiewirtschaftsgesetz',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '11104',
    purpose:
      'Verwaltungsgebühren für Amtshandlungen auf dem Gebiet des Bergrechts',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 60,
      '2015': 60,
      '2016': 60,
      '2017': 30,
      '2018': 30,
      '2019': 30,
      '2020': 30,
      '2021': 40,
    },
    mgtg: '',
  },
  {
    identifier: '11105',
    purpose:
      'Gebühren und Auslagen im Rahmen der Planfeststellungsverfahren für Energieleitungen',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 960,
      '2015': 1080,
      '2016': 1080,
      '2017': 1970,
      '2018': 1500,
      '2019': 1500,
      '2020': 1500,
      '2021': 1650,
    },
    mgtg: '',
  },
  {
    identifier: '11901',
    purpose: 'Einnahmen aus Veröffentlichungen',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 0.5,
      '2015': 0.5,
      '2016': 0.3,
      '2017': 0.3,
      '2018': 0.3,
      '2019': 0.3,
      '2020': 0.3,
      '2021': 0.3,
    },
    mgtg: '01',
  },
  {
    identifier: '11902',
    purpose:
      'Einnahmen aus zurückzuzahlenden Förderungszuschüssen im Rahmen der Corona-Nothilfen',
    planning: true,
    entirePeriod: false,
    data: {
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '11999',
    purpose: 'Vermischte Einnahmen',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 0.1,
      '2015': 0.1,
      '2016': 0.1,
      '2017': 0.1,
      '2018': 0.1,
      '2019': 0.1,
      '2020': 0.1,
      '2021': 0.1,
    },
    mgtg: '01',
  },
  {
    identifier: '23101',
    purpose: 'Erstattungen des Bundes für den Bundesfreiwilligendienst',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 2.8,
      '2015': 2.8,
      '2016': 3,
      '2017': 3,
      '2018': 3,
      '2019': 3,
      '2020': 3,
      '2021': 3,
    },
    mgtg: '01',
  },
  {
    identifier: '27102',
    purpose:
      'Erstattungen der EU im Rahmen des Projekts "SmartReFlex - Smart and Flexible 100 % Renewable District Heating and Cooling Systems for European Cities"',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 14.8,
      '2015': 19.7,
      '2016': 0,
      '2017': 14.8,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '28101',
    purpose:
      'Erstattungen "Regionale Netzstellen Nachhaltigkeitsstrategien (RENN.nord SH)"',
    planning: true,
    entirePeriod: false,
    data: {
      '2017': 0,
      '2018': 2,
      '2019': 2,
      '2020': 5,
      '2021': 5,
    },
    mgtg: '01',
  },
  {
    identifier: '28102',
    purpose: 'Erstattung der EKSH für Personalkosten',
    planning: true,
    entirePeriod: false,
    data: {
      '2019': 0,
      '2020': 201.7,
      '2021': 214,
    },
    mgtg: '',
  },
  {
    identifier: '28103',
    purpose:
      'Erstattung des BMU im Rahmen des Projekts "Betrieb des eHighways an der BAB A1 in Schleswig-Holstein - FESH II-A"',
    planning: true,
    entirePeriod: false,
    data: {
      '2020': 1015,
      '2021': 822,
    },
    mgtg: '',
  },
  {
    identifier: '28202',
    purpose:
      'Beiträge Dritter für Zwecke des Bildungszentrums für Natur, Umwelt und ländliche Räume',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
      '2017': 40,
      '2018': 40,
      '2019': 40,
      '2020': 37,
      '2021': 37,
    },
    mgtg: '01',
  },
  {
    identifier: '34603',
    purpose: 'Zuschüsse der EU für Biomasseförderung',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 61,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '35605',
    purpose: 'Entnahme aus der Rücklage "Sabbatjahr"',
    planning: true,
    entirePeriod: false,
    data: {
      '2020': 0,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '35606',
    purpose: 'Entnahme aus der Rücklage "Sabbatjahr Tarifbeschäftigte"',
    planning: true,
    entirePeriod: false,
    data: {
      '2020': 0,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '35913',
    purpose:
      'Entnahme aus der Rücklage zur Abwicklung des Corona Notkredits für die Corona-Nothilfen in den Jahren 2021 - 2024',
    planning: true,
    entirePeriod: false,
    data: {
      '2020': 0,
      '2021': 40743.1,
    },
    mgtg: '',
  },
  {
    identifier: '35923',
    purpose:
      'Entnahme aus der Rücklage zur Abwicklung des Bund-Länder-Aktionsprogramms "Aufholen nach Corona für Kinder und Jugendliche" in den Jahren 2021 und 2022',
    planning: true,
    entirePeriod: false,
    data: {
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '42201',
    purpose:
      'Bezüge und Nebenleistungen der planmäßigen Beamtinnen und Beamten (Richterinnen und Richter)',
    planning: true,
    entirePeriod: false,
    data: {
      '2020': 955.2,
      '2021': 1405.2,
    },
    mgtg: '',
  },
  {
    identifier: '42203',
    purpose: 'Anwärterbezüge der Beamtinnen und Beamten im Vorbereitungsdienst',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '42204',
    purpose:
      'Bezüge und Nebenleistungen der planmäßigen Beamtinnen und Beamten',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 75,
      '2015': 72.2,
      '2016': 72.2,
      '2017': 72.2,
      '2018': 72.2,
      '2019': 72.2,
      '2020': 72.2,
      '2021': 97.2,
    },
    mgtg: '01',
  },
  {
    identifier: '42261',
    purpose: 'Bezüge und Nebenleistungen der planmäßigen Beamtinnen und Beamte',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 375,
      '2015': 375,
      '2016': 375,
      '2017': 375,
      '2018': 217.9,
      '2019': 217.9,
      '2020': 217.9,
      '2021': 367.9,
    },
    mgtg: '61',
  },
  {
    identifier: '42701',
    purpose: 'Beschäftigungsentgelte an Vertretungs- und Aushilfskräfte',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '42702',
    purpose: 'Beschäftigungsentgelte an Vertretungs- und Aushilfskräfte',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '01',
  },
  {
    identifier: '42761',
    purpose: 'Beschäftigungsentgelte an Vertretungs- und Aushilfskräfte',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '61',
  },
  {
    identifier: '42763',
    purpose: 'Beschäftigungsentgelte an Vertretungs- und Aushilfskräfte',
    planning: true,
    entirePeriod: false,
    data: {
      '2020': 0,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '42801',
    purpose: 'Entgelte der Arbeitnehmerinnen und Arbeitnehmer',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 621.9,
      '2015': 1201.4,
      '2016': 1201.4,
      '2017': 1201.4,
      '2018': 1369.5,
      '2019': 1369.5,
      '2020': 1571.2,
      '2021': 1583.5,
    },
    mgtg: '',
  },
  {
    identifier: '42802',
    purpose: 'Entgelte der Arbeitnehmerinnen und Arbeitnehmer',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 351.3,
      '2015': 417,
      '2016': 417,
      '2017': 417,
      '2018': 417,
      '2019': 417,
      '2020': 417,
      '2021': 417,
    },
    mgtg: '01',
  },
  {
    identifier: '42861',
    purpose: 'Entgelte der Arbeitnehmerinnen und Arbeitnehmer',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 475,
      '2015': 475,
      '2016': 475,
      '2017': 475,
      '2018': 246.1,
      '2019': 246.1,
      '2020': 246.1,
      '2021': 246.1,
    },
    mgtg: '61',
  },
  {
    identifier: '42863',
    purpose: 'Entgelte der Arbeitnehmerinnen und Arbeitnehmer',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 10.1,
      '2015': 0,
      '2016': 0,
      '2017': 10,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '51101',
    purpose:
      'Geschäftsbedarf und Kommunikation sowie Geräte-, Ausstattungs- und Ausrüstungsgegenstände, sonstige Gebrauchsgegenstände',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 31.3,
      '2015': 31.3,
      '2016': 31.3,
      '2017': 31.3,
      '2018': 33.3,
      '2019': 33.3,
      '2020': 29.8,
      '2021': 29.8,
    },
    mgtg: '01',
  },
  {
    identifier: '51161',
    purpose:
      'Geschäftsbedarf und Kommunikation sowie Geräte, Ausstattungs- und Ausrüstungsgegenstände',
    planning: true,
    entirePeriod: false,
    data: {
      '2015': 20,
      '2016': 5,
      '2017': 5,
      '2018': 5,
      '2019': 5,
      '2020': 5,
      '2021': 5,
    },
    mgtg: '61',
  },
  {
    identifier: '51401',
    purpose: 'Verbrauchsmittel, Haltung von Fahrzeugen und dgl.',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 0.4,
      '2015': 0.4,
      '2016': 3,
      '2017': 3,
      '2018': 3,
      '2019': 3,
      '2020': 3,
      '2021': 3,
    },
    mgtg: '01',
  },
  {
    identifier: '51461',
    purpose: 'Verbrauchsmittel, Haltung von Fahrzeugen',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '61',
  },
  {
    identifier: '51802',
    purpose: 'Mieten und Pachten für Maschinen, Geräte und Fahrzeuge',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '01',
  },
  {
    identifier: '52502',
    purpose:
      'Fortbildung der Mitarbeiterinnen und Mitarbeiter einschließlich Reisekosten',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 4.4,
      '2015': 5.5,
      '2016': 5.5,
      '2017': 5.5,
      '2018': 5.5,
      '2019': 5.5,
      '2020': 5.5,
      '2021': 5.5,
    },
    mgtg: '01',
  },
  {
    identifier: '52561',
    purpose: 'Fortbildung der Mitarbeiterinnen und Mitarbeiter',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 10,
      '2015': 10,
      '2016': 5,
      '2017': 5,
      '2018': 5,
      '2019': 5,
      '2020': 5,
      '2021': 5,
    },
    mgtg: '61',
  },
  {
    identifier: '52603',
    purpose: 'Fachbeiräte und ähnliche Ausschüsse',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 5,
      '2015': 0,
      '2016': 1,
      '2017': 1,
      '2018': 1,
      '2019': 5,
      '2020': 5,
      '2021': 1,
    },
    mgtg: '03',
  },
  {
    identifier: '52604',
    purpose: 'Fachbeiräte und ähnliche Ausschüsse',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 0.4,
      '2015': 0.4,
      '2016': 0.6,
      '2017': 0.6,
      '2018': 1.5,
      '2019': 1.5,
      '2020': 5,
      '2021': 5,
    },
    mgtg: '01',
  },
  {
    identifier: '52701',
    purpose: 'Dienstreisen',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 4,
      '2015': 4,
      '2016': 4,
      '2017': 4,
      '2018': 4,
      '2019': 4,
      '2020': 4,
      '2021': 4,
    },
    mgtg: '01',
  },
  {
    identifier: '52761',
    purpose: 'Dienstreisen',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 25,
      '2015': 25,
      '2016': 5,
      '2017': 5,
      '2018': 5,
      '2019': 5,
      '2020': 5,
      '2021': 5,
    },
    mgtg: '61',
  },
  {
    identifier: '52763',
    purpose: 'Dienstreisen',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 1.5,
      '2015': 2,
      '2016': 0,
      '2017': 1.6,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '53301',
    purpose: 'Maßnahmen zur Förderung der Nachhaltigkeit',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 78.4,
      '2015': 78.4,
      '2016': 78.4,
      '2017': 78.4,
      '2018': 78.4,
      '2019': 100,
      '2020': 145,
      '2021': 145,
    },
    mgtg: '04',
  },
  {
    identifier: '53302',
    purpose: 'Kompetenzzentrum nachhaltige Beschaffung und Vergabe',
    planning: true,
    entirePeriod: false,
    data: {
      '2020': 60,
      '2021': 60,
    },
    mgtg: '04',
  },
  {
    identifier: '53303',
    purpose:
      'Ausgaben für Kooperationsvereinbarung zum FÖJ mit der Evangelisch-Lutherischen Kirche in Norddeutschland',
    planning: true,
    entirePeriod: false,
    data: {
      '2015': 0,
      '2016': 4.6,
      '2017': 9.2,
      '2018': 9.2,
      '2019': 9.2,
      '2020': 9.2,
      '2021': 9.2,
    },
    mgtg: '01',
  },
  {
    identifier: '53304',
    purpose:
      'Untersuchungen und Informationsgrundlagen zu Energierohstoffen und Potenzialen des tiefen geologischen Untergrundes; Strukturgeologie',
    planning: true,
    entirePeriod: false,
    data: {
      '2016': 0,
      '2017': 355,
      '2018': 355,
      '2019': 355,
      '2020': 355,
      '2021': 355,
    },
    mgtg: '',
  },
  {
    identifier: '53305',
    purpose: 'Wettbewerb Solarenergieausbau',
    planning: true,
    entirePeriod: false,
    data: {
      '2019': 0,
      '2020': 15,
      '2021': 300,
    },
    mgtg: '03',
  },
  {
    identifier: '53306',
    purpose: 'BNE-Agentur',
    planning: true,
    entirePeriod: false,
    data: {
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '53307',
    purpose:
      'Ausgaben im Zusammenhang mit einer schleswig-holsteinischen Wasserstoffstrategie aus Mitteln des Konjunkturprogrammes',
    planning: true,
    entirePeriod: false,
    data: {
      '2021': 8843.2,
    },
    mgtg: '05',
  },
  {
    identifier: '53308',
    purpose: 'BNE-Agentur im Rahmen der Landesstrategie BNE',
    planning: true,
    entirePeriod: false,
    data: {
      '2021': 200,
    },
    mgtg: '01',
  },
  {
    identifier: '53309',
    purpose: 'Maßnahmen zur Umsetzung des Erneuerbare-Energien-Wärmegesetzes',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 20,
      '2015': 50,
      '2016': 50,
      '2017': 50,
      '2018': 50,
      '2019': 50,
      '2020': 30,
      '2021': 50,
    },
    mgtg: '03',
  },
  {
    identifier: '53310',
    purpose:
      'Maßnahmen der Energiewirtschaft, der Energiewende und des Klimaschutzes/Klimawandels',
    planning: true,
    entirePeriod: false,
    data: {
      '2020': 942.3,
      '2021': 942.3,
    },
    mgtg: '03',
  },
  {
    identifier: '53311',
    purpose:
      'Ausgaben im Zusammenhang mit einer schleswig-holsteinischen Wasserstoffstrategie aus Mitteln des Konjunkturprogrammes',
    planning: true,
    entirePeriod: false,
    data: {
      '2020': 10000,
      '2021': 0,
    },
    mgtg: '03',
  },
  {
    identifier: '53312',
    purpose:
      'Beratungs- und Moderationsleistungen für Bürgerbeteiligungen im Rahmen des Netzausbaues',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 0,
      '2015': 120,
      '2016': 80,
      '2017': 30,
      '2018': 60,
      '2019': 50,
      '2020': 30,
      '2021': 30,
    },
    mgtg: '03',
  },
  {
    identifier: '53313',
    purpose:
      'Aufwendungen für Maßnahmen zur Optimierung der Regulierung schleswig-holsteinischer Netzbetreiber',
    planning: true,
    entirePeriod: false,
    data: {
      '2020': 25,
      '2021': 25,
    },
    mgtg: '03',
  },
  {
    identifier: '53314',
    purpose:
      'Ausgaben im Zusammenhang mit der Entwicklung einer Wasserstoffstrategie',
    planning: true,
    entirePeriod: false,
    data: {
      '2019': 0,
      '2020': 100,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '53315',
    purpose:
      'Ausgaben im Zusammenhang mit der Entwicklung einer Wasserstoffstrategie',
    planning: true,
    entirePeriod: false,
    data: {
      '2021': 100,
    },
    mgtg: '05',
  },
  {
    identifier: '53361',
    purpose:
      'Ausgaben aufgrund von Werkverträgen oder anderen Auftragsformen für Untersuchungen, Messungen und Gutachten',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 10,
      '2015': 10,
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '61',
  },
  {
    identifier: '53401',
    purpose: 'Ausgaben im Zusammenhang mit dem Bundesfreiwilligendienst',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 6,
      '2015': 6.8,
      '2016': 7.7,
      '2017': 7.7,
      '2018': 7.7,
      '2019': 7.7,
      '2020': 7.7,
      '2021': 7.7,
    },
    mgtg: '01',
  },
  {
    identifier: '53501',
    purpose:
      'Maßnahmen zur Umweltbildung / Bildung für nachhaltige Entwicklung',
    planning: true,
    entirePeriod: false,
    data: {
      '2020': 333,
      '2021': 283,
    },
    mgtg: '01',
  },
  {
    identifier: '54699',
    purpose:
      'Vermischte Verwaltungsausgaben, Kassen- und Zahlstellenfehlbeträge',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 0.4,
      '2015': 0.4,
      '2016': 0.1,
      '2017': 0.1,
      '2018': 0.1,
      '2019': 0.1,
      '2020': 0.1,
      '2021': 0.1,
    },
    mgtg: '01',
  },
  {
    identifier: '54761',
    purpose: 'Nicht aufteilbare sächliche Verwaltungsausgaben',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 35,
      '2015': 35,
      '2016': 5,
      '2017': 5,
      '2018': 5,
      '2019': 5,
      '2020': 5,
      '2021': 5,
    },
    mgtg: '61',
  },
  {
    identifier: '54763',
    purpose: 'Nicht aufteilbare sächliche Verwaltungskosten',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 3.2,
      '2015': 4.4,
      '2016': 0,
      '2017': 3.2,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '63201',
    purpose:
      'Beitrag zum BANU (Bundesweiter Arbeitskreis der staatlich getragenen Bildungsstätten im Natur- und Umweltschutz)',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '01',
  },
  {
    identifier: '63202',
    purpose: 'Vertragliche Entgelte an die Bundesnetzagentur',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 216,
      '2015': 216,
      '2016': 216,
      '2017': 216,
      '2018': 216,
      '2019': 216,
      '2020': 216,
      '2021': 216,
    },
    mgtg: '',
  },
  {
    identifier: '63301',
    purpose:
      'Zuwendungen an Gemeinden und Gemeindeverbände für Lehrgänge zur Qualifizierung von Natur- und Landschaftsführer/-innen und Geprüften Natur- und Landschaftspfleger/-innen',
    planning: true,
    entirePeriod: false,
    data: {
      '2020': 1,
      '2021': 1,
    },
    mgtg: '01',
  },
  {
    identifier: '67101',
    purpose:
      'Aufwendungen im Zuge "Betrieb des eHighways an der BAB A1 in Schleswig-Holstein - FESH II-A"',
    planning: true,
    entirePeriod: false,
    data: {
      '2019': 0,
      '2020': 1015,
      '2021': 822,
    },
    mgtg: '',
  },
  {
    identifier: '67102',
    purpose:
      'Erstattung von Verwaltungskosten an die Investitionsbank und von Kosten für die Abwicklung von Förderprogrammen',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 68.6,
      '2015': 50,
      '2016': 50,
      '2017': 50,
      '2018': 400,
      '2019': 450,
      '2020': 450,
      '2021': 550,
    },
    mgtg: '03',
  },
  {
    identifier: '67103',
    purpose:
      'Erstattung von Kosten an die bevollmächtigten Bezirksschornsteinfeger/-innen Schornsteinfeger für die Durchführung der Prüfung nach \r\n§ 9 EWKG',
    planning: true,
    entirePeriod: false,
    data: {
      '2021': 0,
    },
    mgtg: '03',
  },
  {
    identifier: '67104',
    purpose:
      'Erstattung von Kosten an Gemeinden für die Aufstellung kommunaler Wärme- und Kältepläne nach § 7 EWKG',
    planning: true,
    entirePeriod: false,
    data: {
      '2021': 0,
    },
    mgtg: '03',
  },
  {
    identifier: '68101',
    purpose: 'Klimaschutz für Bürgerinnen und Bürger',
    planning: true,
    entirePeriod: false,
    data: {
      '2019': 0,
      '2020': 4635,
      '2021': 2735,
    },
    mgtg: '03',
  },
  {
    identifier: '68201',
    purpose:
      'Aufwendungen im Zuge der Prüfung zur Frage der Errichtung einer Landesregulierungsbehörde',
    planning: true,
    entirePeriod: false,
    data: {
      '2016': 25,
      '2017': 25,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '68214',
    purpose:
      'Zuschüsse für laufende Zwecke an öffentliche Unternehmen für Maßnahmen im Rahmen einer Wasserstoffstrategie',
    planning: true,
    entirePeriod: false,
    data: {
      '2020': 50,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '68215',
    purpose:
      'Zuschüsse für laufende Zwecke an öffentliche Unternehmen für Maßnahmen im Rahmen einer Wasserstoffstrategie',
    planning: true,
    entirePeriod: false,
    data: {
      '2021': 50,
    },
    mgtg: '05',
  },
  {
    identifier: '68301',
    purpose:
      'Zuwendungen an Sonstige für Lehrgänge zur Qualifizierung von Natur- und Landschaftsführer/-innen und Geprüften Natur- und Landschaftspfleger/-innen',
    planning: true,
    entirePeriod: false,
    data: {
      '2020': 0,
      '2021': 0,
    },
    mgtg: '01',
  },
  {
    identifier: '68314',
    purpose:
      'Zuschüsse für laufende Zwecke an private Unternehmen für Maßnahmen im Rahmen einer Wasserstoffstrategie',
    planning: true,
    entirePeriod: false,
    data: {
      '2020': 50,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '68315',
    purpose:
      'Zuschüsse für laufende Zwecke an private Unternehmen für Maßnahmen im Rahmen einer Wasserstoffstrategie',
    planning: true,
    entirePeriod: false,
    data: {
      '2021': 50,
    },
    mgtg: '05',
  },
  {
    identifier: '68401',
    purpose:
      'Zuwendung an das "Bündnis Eine Welt" zur Umsetzung des Fachpromotorenprogramms',
    planning: true,
    entirePeriod: false,
    data: {
      '2017': 100,
      '2018': 100,
      '2019': 136,
      '2020': 136,
      '2021': 136,
    },
    mgtg: '04',
  },
  {
    identifier: '68402',
    purpose: 'Freiwilliges ökologisches Jahr',
    planning: true,
    entirePeriod: false,
    data: {
      '2018': 1296.4,
      '2019': 1388.5,
      '2020': 1955.2,
      '2021': 1829.3,
    },
    mgtg: '',
  },
  {
    identifier: '68403',
    purpose: 'An den Förderverein Green Screen Festival e. V.',
    planning: true,
    entirePeriod: false,
    data: {
      '2020': 40,
      '2021': 40,
    },
    mgtg: '04',
  },
  {
    identifier: '68404',
    purpose: 'Institutionelle Förderung des "Bündnis Eine Welt " (BEI)',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 19.6,
      '2015': 19.6,
      '2016': 40,
      '2017': 40,
      '2018': 40,
      '2019': 40,
      '2020': 40,
      '2021': 40,
    },
    mgtg: '04',
  },
  {
    identifier: '68405',
    purpose:
      'Zuschüsse zur Intensivierung der internationalen und Entwicklungs-Zusammenarbeit',
    planning: true,
    entirePeriod: false,
    data: {
      '2017': 0,
      '2018': 6.8,
      '2019': 6.8,
      '2020': 6.8,
      '2021': 6.8,
    },
    mgtg: '04',
  },
  {
    identifier: '68514',
    purpose:
      'Zuschüsse für laufende Zwecke an öffentliche Einrichtungen für Maßnahmen im Rahmen einer Wasserstoffstrategie',
    planning: true,
    entirePeriod: false,
    data: {
      '2019': 0,
      '2020': 100,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '68515',
    purpose:
      'Zuschüsse für laufende Zwecke an öffentliche Einrichtungen für Maßnahmen im Rahmen einer Wasserstoffstrategie',
    planning: true,
    entirePeriod: false,
    data: {
      '2021': 100,
    },
    mgtg: '05',
  },
  {
    identifier: '68605',
    purpose: 'Beiträge und Kostenanteile an Vereine und Gesellschaften',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 6.4,
      '2015': 6.4,
      '2016': 6.4,
      '2017': 25,
      '2018': 17,
      '2019': 17,
      '2020': 17,
      '2021': 20.5,
    },
    mgtg: '03',
  },
  {
    identifier: '68607',
    purpose: 'Förderung der Wärmewende',
    planning: true,
    entirePeriod: false,
    data: {
      '2020': 0,
      '2021': 400,
    },
    mgtg: '03',
  },
  {
    identifier: '68608',
    purpose: 'Zuwendungen und Projektförderungen',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 0,
      '2015': 1300,
      '2016': 1300,
      '2017': 1300,
      '2018': 1550,
      '2019': 1250,
      '2020': 9890,
      '2021': 9625,
    },
    mgtg: '03',
  },
  {
    identifier: '68609',
    purpose: 'Energieforschung',
    planning: true,
    entirePeriod: false,
    data: {
      '2020': 8000,
      '2021': 8000,
    },
    mgtg: '03',
  },
  {
    identifier: '68614',
    purpose:
      'Sonstige Zuschüsse für laufende Zwecke im Inland für Maßnahmen im Rahmen der Wasserstoffstrategie',
    planning: true,
    entirePeriod: false,
    data: {
      '2019': 0,
      '2020': 200,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '68615',
    purpose:
      'Zuschüsse an Dritte für Maßnahmen im Rahmen einer schleswig-holsteinischen Wasserstoffstrategie aus Mitteln des Konjunkturprogrammes',
    planning: true,
    entirePeriod: false,
    data: {
      '2020': 10000,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '68616',
    purpose:
      'Sonstige Zuschüsse für laufende Zwecke im Inland für Maßnahmen im Rahmen der Wasserstoffstrategie',
    planning: true,
    entirePeriod: false,
    data: {
      '2021': 200,
    },
    mgtg: '05',
  },
  {
    identifier: '68617',
    purpose:
      'Zuschüsse an Dritte für Maßnahmen im Rahmen einer schleswig-holsteinischen Wasserstoffstrategie aus Mitteln des Konjunkturprogrammes',
    planning: true,
    entirePeriod: false,
    data: {
      '2021': 10000,
    },
    mgtg: '05',
  },
  {
    identifier: '81201',
    purpose: 'Erwerb von Geräten und Ausrüstungsgegenständen',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 5,
      '2015': 4.9,
      '2016': 1,
      '2017': 1,
      '2018': 1,
      '2019': 1,
      '2020': 1,
      '2021': 1,
    },
    mgtg: '01',
  },
  {
    identifier: '89201',
    purpose: 'Förderung von Vorhaben zur energetischen Nutzung von Biomasse',
    planning: true,
    entirePeriod: true,
    data: {
      '2014': 61,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
      '2021': 0,
    },
    mgtg: '03',
  },
  {
    identifier: '91605',
    purpose: 'Zuführung an die Rücklage "Sabbatjahr"',
    planning: true,
    entirePeriod: false,
    data: {
      '2020': 0,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '91606',
    purpose: 'Zuführung an die Rücklage "Sabbatjahr Tarifbeschäftigte"',
    planning: true,
    entirePeriod: false,
    data: {
      '2020': 0,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '91913',
    purpose:
      'Zuführung an die Rücklage zur Abwicklung des Corona Notkredits für die Corona-Nothilfen in den Jahren 2021 - 2024',
    planning: true,
    entirePeriod: false,
    data: {
      '2020': 0,
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '91923',
    purpose:
      'Zuführung an die Rücklage zur Abwicklung des Bund-Länder-Aktionsprogramms "Aufholen nach Corona für Kinder und Jugendliche" in den Jahren 2021 und 2022',
    planning: true,
    entirePeriod: false,
    data: {
      '2021': 0,
    },
    mgtg: '',
  },
  {
    identifier: '27102',
    purpose:
      'Erstattungen der EU im Rahmen des Projekts "SmartReFlex - Smart and Flexible 100 % Renewable District Heating and Cooling Systems for European Cities"',
    planning: false,
    entirePeriod: false,
    data: {
      '2014': 14.8,
      '2015': 0,
      '2016': 14.8,
      '2017': 1.7,
      '2018': 0,
      '2019': 0,
      '2020': 0,
    },
    mgtg: '',
  },
  {
    identifier: '42763',
    purpose: 'Beschäftigungsentgelte an Vertretungs- und Aushilfskräfte',
    planning: false,
    entirePeriod: false,
    data: {
      '2019': 0,
      '2020': 0,
    },
    mgtg: '',
  },
  {
    identifier: '42863',
    purpose: 'Entgelte der Arbeitnehmerinnen und Arbeitnehmer',
    planning: false,
    entirePeriod: false,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
    },
    mgtg: '',
  },
  {
    identifier: '52763',
    purpose: 'Dienstreisen',
    planning: false,
    entirePeriod: false,
    data: {
      '2014': 1.6,
      '2015': 0.4,
      '2016': 0.1,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
    },
    mgtg: '',
  },
  {
    identifier: '53306',
    purpose: 'BNE-Agentur',
    planning: false,
    entirePeriod: false,
    data: {
      '2020': 0,
    },
    mgtg: '',
  },
  {
    identifier: '53307',
    purpose:
      'Ausgaben im Zusammenhang mit einer schleswig-holsteinischen Wasserstoffstrategie aus Mitteln des Konjunkturprogrammes',
    planning: false,
    entirePeriod: false,
    data: {
      '2020': 60.9,
    },
    mgtg: '05',
  },
  {
    identifier: '53311',
    purpose:
      'Ausgaben im Zusammenhang mit einer schleswig-holsteinischen Wasserstoffstrategie aus Mitteln des Konjunkturprogrammes',
    planning: false,
    entirePeriod: false,
    data: {
      '2019': 0,
      '2020': 0,
    },
    mgtg: '03',
  },
  {
    identifier: '53312',
    purpose:
      'Beratungs- und Moderationsleistungen für Bürgerbeteiligungen im Rahmen des Netzausbaues',
    planning: false,
    entirePeriod: false,
    data: {
      '2014': 0,
      '2015': 49.2,
      '2016': 75.7,
      '2017': 8.5,
      '2018': 34.6,
      '2019': 1.4,
      '2020': 22.9,
    },
    mgtg: '03',
  },
  {
    identifier: '53314',
    purpose:
      'Ausgaben im Zusammenhang mit der Entwicklung einer Wasserstoffstrategie',
    planning: false,
    entirePeriod: false,
    data: {
      '2018': 0,
      '2019': 0,
      '2020': 0,
    },
    mgtg: '',
  },
  {
    identifier: '53315',
    purpose:
      'Ausgaben im Zusammenhang mit der Entwicklung einer Wasserstoffstrategie',
    planning: false,
    entirePeriod: false,
    data: {
      '2020': 356.6,
    },
    mgtg: '05',
  },
  {
    identifier: '54763',
    purpose: 'Nicht aufteilbare sächliche Verwaltungskosten',
    planning: false,
    entirePeriod: false,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 3.3,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
    },
    mgtg: '',
  },
  {
    identifier: '67102',
    purpose:
      'Erstattung von Verwaltungskosten an die Investitionsbank und von Kosten für die Abwicklung von Förderprogrammen',
    planning: false,
    entirePeriod: false,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 336.1,
      '2019': 349.7,
      '2020': 324.6,
    },
    mgtg: '03',
  },
  {
    identifier: '68201',
    purpose:
      'Aufwendungen im Zuge der Prüfung zur Frage der Errichtung einer Landesregulierungsbehörde',
    planning: false,
    entirePeriod: false,
    data: {
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
    },
    mgtg: '',
  },
  {
    identifier: '68214',
    purpose:
      'Zuschüsse für laufende Zwecke an öffentliche Unternehmen für Maßnahmen im Rahmen einer Wasserstoffstrategie',
    planning: false,
    entirePeriod: false,
    data: {
      '2019': 0,
      '2020': 0,
    },
    mgtg: '',
  },
  {
    identifier: '68314',
    purpose:
      'Zuschüsse für laufende Zwecke an private Unternehmen für Maßnahmen im Rahmen einer Wasserstoffstrategie',
    planning: false,
    entirePeriod: false,
    data: {
      '2019': 0,
      '2020': 0,
    },
    mgtg: '',
  },
  {
    identifier: '68514',
    purpose:
      'Zuschüsse für laufende Zwecke an öffentliche Einrichtungen für Maßnahmen im Rahmen einer Wasserstoffstrategie',
    planning: false,
    entirePeriod: false,
    data: {
      '2018': 0,
      '2019': 0,
      '2020': 0,
    },
    mgtg: '',
  },
  {
    identifier: '68607',
    purpose: 'Förderung der Wärmewende',
    planning: false,
    entirePeriod: false,
    data: {
      '2019': 0,
      '2020': 0,
    },
    mgtg: '03',
  },
  {
    identifier: '68614',
    purpose:
      'Sonstige Zuschüsse für laufende Zwecke im Inland für Maßnahmen im Rahmen der Wasserstoffstrategie',
    planning: false,
    entirePeriod: false,
    data: {
      '2018': 0,
      '2019': 0,
      '2020': 0,
    },
    mgtg: '',
  },
  {
    identifier: '68615',
    purpose:
      'Zuschüsse an Dritte für Maßnahmen im Rahmen einer schleswig-holsteinischen Wasserstoffstrategie aus Mitteln des Konjunkturprogrammes',
    planning: false,
    entirePeriod: false,
    data: {
      '2019': 0,
      '2020': 0,
    },
    mgtg: '',
  },
  {
    identifier: '23104',
    purpose:
      'Zuweisungen des Bundes für die Durchführung der Regionalkonferenz Klimaanpassung Küste 2014',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 15.5,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
    },
    mgtg: '',
  },
  {
    identifier: '26101',
    purpose: 'Einnahmen Sondervermögen "Bürgerenergie SH"',
    planning: true,
    entirePeriod: false,
    data: {
      '2017': 0,
      '2018': 0,
      '2019': 0,
      '2020': 0,
    },
    mgtg: '',
  },
  {
    identifier: '53306',
    purpose: 'Vernetzungsstelle BNE',
    planning: true,
    entirePeriod: false,
    data: {
      '2020': 0,
    },
    mgtg: '',
  },
  {
    identifier: '23104',
    purpose:
      'Zuweisungen des Bundes für die Durchführung der Regionalkonferenz Klimaanpassung Küste 2014',
    planning: false,
    entirePeriod: false,
    data: {
      '2014': 39.8,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
    },
    mgtg: '',
  },
  {
    identifier: '26101',
    purpose: 'Einnahmen Sondervermögen "Bürgerenergie SH"',
    planning: false,
    entirePeriod: false,
    data: {
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
    },
    mgtg: '',
  },
  {
    identifier: '53306',
    purpose: 'Vernetzungsstelle BNE',
    planning: false,
    entirePeriod: false,
    data: {
      '2019': 0,
    },
    mgtg: '',
  },
  {
    identifier: '28103',
    purpose:
      'Erstattung des BMU im Rahmen des Projektes "Betrieb des eHighways an der BAB A1 in Schleswig-Holstein - FESH II-A"',
    planning: true,
    entirePeriod: false,
    data: {
      '2019': 0,
    },
    mgtg: '',
  },
  {
    identifier: '42201',
    purpose:
      'Bezüge und Nebenleistungen der planmäßigen Beamtinnen und Beamten',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 309.3,
      '2015': 752.5,
      '2016': 798.1,
      '2017': 798.1,
      '2018': 955.2,
      '2019': 955.2,
    },
    mgtg: '',
  },
  {
    identifier: '42763',
    purpose: 'Entgelte der Arbeitnehmerinnen und Arbeitnehmer',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 0,
      '2015': 13.3,
      '2016': 0,
      '2017': 0,
      '2018': 0,
      '2019': 0,
    },
    mgtg: '',
  },
  {
    identifier: '53302',
    purpose: 'Kompetenzzentrum nachhaltige Vergabe',
    planning: true,
    entirePeriod: false,
    data: {
      '2018': 0,
      '2019': 60,
    },
    mgtg: '04',
  },
  {
    identifier: '53310',
    purpose:
      'Maßnahmen der Energiewirtschaft, der Energiewende und des Klimaschutzes/Klimawandel',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 884.3,
      '2015': 892.3,
      '2016': 892.3,
      '2017': 1142.3,
      '2018': 942.3,
      '2019': 942.3,
    },
    mgtg: '03',
  },
  {
    identifier: '53313',
    purpose:
      'Aufwendungen für die Maßnahmen zur Optimierung der Regulierung schleswig-holsteinischer Netzbetreiber',
    planning: true,
    entirePeriod: false,
    data: {
      '2019': 25,
    },
    mgtg: '03',
  },
  {
    identifier: '53501',
    purpose: 'Maßnahmen zur Umweltbildung',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 190.7,
      '2015': 206,
      '2016': 213,
      '2017': 253,
      '2018': 283,
      '2019': 283,
    },
    mgtg: '01',
  },
  {
    identifier: '63301',
    purpose:
      'Zuwendungen an Gemeinden und Gemeindeverbände für Lehrgänge zur Qualifizierung von Natur- und Landschaftsführer/innen und Geprüften Natur- und Landschaftspfleger/innen',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 6,
      '2015': 5.1,
      '2016': 1,
      '2017': 1,
      '2018': 1,
      '2019': 1,
    },
    mgtg: '01',
  },
  {
    identifier: '68214',
    purpose:
      'Zuschüsse für laufende Zwecke an öffentliche Unternehmen für Maßnahmen im Rahmen  einer Wasserstoffstrategie',
    planning: true,
    entirePeriod: false,
    data: {
      '2019': 0,
    },
    mgtg: '',
  },
  {
    identifier: '68301',
    purpose:
      'Zuwendungen an Sonstige für Lehrgänge zur Qualifizierung von Natur- und Landschaftsführer/innen und Geprüften Natur- und Landschaftspfleger/innen',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 6,
      '2015': 4.8,
      '2016': 2.4,
      '2017': 2.4,
      '2018': 0,
      '2019': 0,
    },
    mgtg: '01',
  },
  {
    identifier: '68314',
    purpose:
      'Zuschüsse für laufende Zwecke an private unternehmen für Maßnahmen im Rahmen einer Wasserstoffstrategie',
    planning: true,
    entirePeriod: false,
    data: {
      '2019': 0,
    },
    mgtg: '',
  },
  {
    identifier: '68403',
    purpose: 'An den Förderverein Green Screen Festival e.V.',
    planning: true,
    entirePeriod: false,
    data: {
      '2015': 0,
      '2016': 40,
      '2017': 40,
      '2018': 40,
      '2019': 40,
    },
    mgtg: '04',
  },
  {
    identifier: '28103',
    purpose:
      'Erstattung des BMU im Rahmen des Projektes "Betrieb des eHighways an der BAB A1 in Schleswig-Holstein - FESH II-A"',
    planning: false,
    entirePeriod: false,
    data: {
      '2018': 0,
    },
    mgtg: '',
  },
  {
    identifier: '42201',
    purpose:
      'Bezüge und Nebenleistungen der planmäßigen Beamtinnen und Beamten',
    planning: false,
    entirePeriod: false,
    data: {
      '2014': 826.4,
      '2015': 799.4,
      '2016': 821,
      '2017': 811.4,
      '2018': 824.9,
    },
    mgtg: '',
  },
  {
    identifier: '42763',
    purpose: 'Entgelte der Arbeitnehmerinnen und Arbeitnehmer',
    planning: false,
    entirePeriod: false,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
    },
    mgtg: '',
  },
  {
    identifier: '53302',
    purpose: 'Kompetenzzentrum nachhaltige Vergabe',
    planning: false,
    entirePeriod: false,
    data: {
      '2017': 0,
      '2018': 0,
    },
    mgtg: '04',
  },
  {
    identifier: '53310',
    purpose:
      'Maßnahmen der Energiewirtschaft, der Energiewende und des Klimaschutzes/Klimawandel',
    planning: false,
    entirePeriod: false,
    data: {
      '2014': 708.1,
      '2015': 573.4,
      '2016': 821.3,
      '2017': 492.9,
      '2018': 391.9,
    },
    mgtg: '03',
  },
  {
    identifier: '53313',
    purpose:
      'Aufwendungen für die Maßnahmen zur Optimierung der Regulierung schleswig-holsteinischer Netzbetreiber',
    planning: false,
    entirePeriod: false,
    data: {
      '2018': 0,
    },
    mgtg: '03',
  },
  {
    identifier: '53501',
    purpose: 'Maßnahmen zur Umweltbildung',
    planning: false,
    entirePeriod: false,
    data: {
      '2014': 425.1,
      '2015': 329.6,
      '2016': 473.2,
      '2017': 422.4,
      '2018': 562.6,
    },
    mgtg: '01',
  },
  {
    identifier: '63301',
    purpose:
      'Zuwendungen an Gemeinden und Gemeindeverbände für Lehrgänge zur Qualifizierung von Natur- und Landschaftsführer/innen und Geprüften Natur- und Landschaftspfleger/innen',
    planning: false,
    entirePeriod: false,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
    },
    mgtg: '01',
  },
  {
    identifier: '68214',
    purpose:
      'Zuschüsse für laufende Zwecke an öffentliche Unternehmen für Maßnahmen im Rahmen  einer Wasserstoffstrategie',
    planning: false,
    entirePeriod: false,
    data: {
      '2018': 0,
    },
    mgtg: '',
  },
  {
    identifier: '68301',
    purpose:
      'Zuwendungen an Sonstige für Lehrgänge zur Qualifizierung von Natur- und Landschaftsführer/innen und Geprüften Natur- und Landschaftspfleger/innen',
    planning: false,
    entirePeriod: false,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
    },
    mgtg: '01',
  },
  {
    identifier: '68314',
    purpose:
      'Zuschüsse für laufende Zwecke an private unternehmen für Maßnahmen im Rahmen einer Wasserstoffstrategie',
    planning: false,
    entirePeriod: false,
    data: {
      '2018': 0,
    },
    mgtg: '',
  },
  {
    identifier: '68403',
    purpose: 'An den Förderverein Green Screen Festival e.V.',
    planning: false,
    entirePeriod: false,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 40,
      '2017': 40,
      '2018': 40,
    },
    mgtg: '04',
  },
  {
    identifier: '11902',
    purpose:
      'Einnahmen für Untersuchungen und Prüfungen von Produkten und Geräten',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
      '2017': 0,
      '2018': 0,
    },
    mgtg: '',
  },
  {
    identifier: '53313',
    purpose:
      'Anwendungen zur Begutachtung von Fragen im Zusammenhang mit einer Landesregulierungsbehörde',
    planning: true,
    entirePeriod: false,
    data: {
      '2018': 25,
    },
    mgtg: '03',
  },
  {
    identifier: '11902',
    purpose:
      'Einnahmen für Untersuchungen und Prüfungen von Produkten und Geräten',
    planning: false,
    entirePeriod: false,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
      '2017': 0,
    },
    mgtg: '',
  },
  {
    identifier: '53313',
    purpose:
      'Anwendungen zur Begutachtung von Fragen im Zusammenhang mit einer Landesregulierungsbehörde',
    planning: false,
    entirePeriod: false,
    data: {
      '2017': 0,
    },
    mgtg: '03',
  },
  {
    identifier: '27101',
    purpose:
      'Erstattungen der EU im Rahmen des Projektes "BioBusinessInnovationNetwork (BioBusINet)"',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 2.5,
      '2015': 0,
      '2016': 0,
      '2017': 0,
    },
    mgtg: '',
  },
  {
    identifier: '53313',
    purpose:
      'Anwendungen im Zuge der Prüfung zur Frage der Errichtung einer Landesregulierungsbehörde',
    planning: true,
    entirePeriod: false,
    data: {
      '2017': 0,
    },
    mgtg: '03',
  },
  {
    identifier: '68402',
    purpose: 'Freiwilliges Ökologisches Jahr',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 1200,
      '2015': 1200,
      '2016': 1200,
      '2017': 1241.6,
    },
    mgtg: '',
  },
  {
    identifier: '27101',
    purpose:
      'Erstattungen der EU im Rahmen des Projektes "BioBusinessInnovationNetwork (BioBusINet)"',
    planning: false,
    entirePeriod: false,
    data: {
      '2014': 0,
      '2015': 6.9,
      '2016': 0,
    },
    mgtg: '',
  },
  {
    identifier: '53313',
    purpose:
      'Anwendungen im Zuge der Prüfung zur Frage der Errichtung einer Landesregulierungsbehörde',
    planning: false,
    entirePeriod: false,
    data: {
      '2016': 0,
    },
    mgtg: '03',
  },
  {
    identifier: '68402',
    purpose: 'Freiwilliges Ökologisches Jahr',
    planning: false,
    entirePeriod: false,
    data: {
      '2014': 1198.3,
      '2015': 1189,
      '2016': 1200,
    },
    mgtg: '',
  },
  {
    identifier: '12201',
    purpose: 'Feldes- und Förderabgaben für Erdöl und sonstige Bodenschätze',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 0,
      '2015': 0,
      '2016': 0,
    },
    mgtg: '',
  },
  {
    identifier: '53302',
    purpose: 'Werkverträge (Energieverbrauchsrelevante Produktegesetz, EVPG)',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 50,
      '2015': 50,
      '2016': 0,
    },
    mgtg: '04',
  },
  {
    identifier: '53307',
    purpose: 'Vollzug des Ernergieverbrauchskennzeichnungsgesetzes',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 155,
      '2015': 155,
      '2016': 0,
    },
    mgtg: '05',
  },
  {
    identifier: '68401',
    purpose:
      'Zuwendung an das Bündnis-Eine-Welt-Initiativen (BEI) zur Umsetzung des Fachpromotorenprogramms',
    planning: true,
    entirePeriod: false,
    data: {
      '2016': 100,
    },
    mgtg: '04',
  },
  {
    identifier: '12201',
    purpose: 'Feldes- und Förderabgaben für Erdöl und sonstige Bodenschätze',
    planning: false,
    entirePeriod: false,
    data: {
      '2014': 1.2,
      '2015': 0,
    },
    mgtg: '',
  },
  {
    identifier: '53302',
    purpose: 'Werkverträge (Energieverbrauchsrelevante Produktegesetz, EVPG)',
    planning: false,
    entirePeriod: false,
    data: {
      '2014': 0,
      '2015': 0,
    },
    mgtg: '04',
  },
  {
    identifier: '53307',
    purpose: 'Vollzug des Ernergieverbrauchskennzeichnungsgesetzes',
    planning: false,
    entirePeriod: false,
    data: {
      '2014': 0,
      '2015': 0,
    },
    mgtg: '05',
  },
  {
    identifier: '68401',
    purpose:
      'Zuwendung an das Bündnis-Eine-Welt-Initiativen (BEI) zur Umsetzung des Fachpromotorenprogramms',
    planning: false,
    entirePeriod: false,
    data: {
      '2015': 0,
    },
    mgtg: '04',
  },
  {
    identifier: '52762',
    purpose: 'Dienstreisen',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 1.3,
      '2015': 0,
    },
    mgtg: '',
  },
  {
    identifier: '53311',
    purpose: 'Regionalkonferenz Klimaanpassung Küste 2014',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 42,
      '2015': 0,
    },
    mgtg: '03',
  },
  {
    identifier: '53362',
    purpose: 'Ausgaben aufgrund von Werkverträgen oder anderen Auftragsformen',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 1.2,
      '2015': 0,
    },
    mgtg: '',
  },
  {
    identifier: '54762',
    purpose: 'Nicht aufteilbare sächliche Verwaltungsaufgaben',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 0,
      '2015': 0,
    },
    mgtg: '',
  },
  {
    identifier: '68201',
    purpose: 'Zuwendung an die Landesnetzagentur',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 25,
      '2015': 25,
    },
    mgtg: '',
  },
  {
    identifier: '68401',
    purpose:
      'Zuwendung an das Bundesministerium für wirtschaftliche Zusammenarbeit und Entwicklung (BMZ) für das Fachpromotorenprogramm',
    planning: true,
    entirePeriod: false,
    data: {
      '2015': 0,
    },
    mgtg: '04',
  },
  {
    identifier: '52762',
    purpose: 'Dienstreisen',
    planning: false,
    entirePeriod: false,
    data: {
      '2014': 0,
    },
    mgtg: '',
  },
  {
    identifier: '53311',
    purpose: 'Regionalkonferenz Klimaanpassung Küste 2014',
    planning: false,
    entirePeriod: false,
    data: {
      '2014': 66.3,
    },
    mgtg: '03',
  },
  {
    identifier: '53362',
    purpose: 'Ausgaben aufgrund von Werkverträgen oder anderen Auftragsformen',
    planning: false,
    entirePeriod: false,
    data: {
      '2014': 0,
    },
    mgtg: '',
  },
  {
    identifier: '54762',
    purpose: 'Nicht aufteilbare sächliche Verwaltungsaufgaben',
    planning: false,
    entirePeriod: false,
    data: {
      '2014': 0.3,
    },
    mgtg: '',
  },
  {
    identifier: '68201',
    purpose: 'Zuwendung an die Landesnetzagentur',
    planning: false,
    entirePeriod: false,
    data: {
      '2014': 0,
    },
    mgtg: '',
  },
  {
    identifier: '68401',
    purpose:
      'Zuwendung an das Bundesministerium für wirtschaftliche Zusammenarbeit und Entwicklung (BMZ) für das Fachpromotorenprogramm',
    planning: false,
    entirePeriod: false,
    data: {
      '2014': 0,
    },
    mgtg: '04',
  },
  {
    identifier: '11903',
    purpose:
      'Einnahmen für Untersuchungen und Prüfungen von Produkten und Geräten',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 0,
    },
    mgtg: '',
  },
  {
    identifier: '51161',
    purpose:
      'Geschäftsbedarf und Kommunikations sowie Geräte, Ausstattungs- und Ausrüstungsgegenstände',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 20,
    },
    mgtg: '61',
  },
  {
    identifier: '52605',
    purpose: 'Bund-Länder-Ausschuss Bodenforschung',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 0,
    },
    mgtg: '',
  },
  {
    identifier: '53303',
    purpose: 'Vollzug des Energieverbrauchskennzeichnungsgesetzes',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 0,
    },
    mgtg: '01',
  },
  {
    identifier: '53304',
    purpose: 'Leistungen Dritter im Rahmen von Landesinitiativen',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 0,
    },
    mgtg: '',
  },
  {
    identifier: '53305',
    purpose: 'Monitoring und Umsetzung des Erneuerbare-Energien-Wärmegesetzes',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 0,
    },
    mgtg: '03',
  },
  {
    identifier: '53306',
    purpose: 'Maßnahmen zum Klimaschutz/Klimawandel',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 0,
    },
    mgtg: '',
  },
  {
    identifier: '63204',
    purpose: 'Vertragliche Entgelte an die Bundenetzagentur',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 0,
    },
    mgtg: '',
  },
  {
    identifier: '67105',
    purpose: 'Verwaltungskostenerstattung an die Investitionsbank',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 0,
    },
    mgtg: '',
  },
  {
    identifier: '68401',
    purpose: 'Beiträge an Vereine und Gesellschaften',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 0,
    },
    mgtg: '04',
  },
  {
    identifier: '68607',
    purpose: 'Projektförderung an Sonstige',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 0,
    },
    mgtg: '03',
  },
  {
    identifier: '89207',
    purpose: 'Förderung von Vorhaben zur energetischen Nutzung von Biomasse',
    planning: true,
    entirePeriod: false,
    data: {
      '2014': 0,
    },
    mgtg: '',
  },
];
