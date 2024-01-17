type HouseholdDataType = {
  Year: number;
  SumValue: number;
  SumTargetValue: number;
  data: {
    Nr: number;
    Desc: string;
    Value: number;
    TargetValue: number;
  }[];
}[];

export const householdData: HouseholdDataType = [
  {
    Year: 2015,
    SumValue: 1020.8,
    SumTargetValue: 2541.7,
    data: [
      {
        Nr: 53310,
        Desc: 'Maßnahmen der Energiewirtschaft, der Energiewende und des Klimaschutzes/Klimawandel',
        Value: 573.4,
        TargetValue: 892.3,
      },
      {
        Nr: 68608,
        Desc: 'Zuwendungen und Projektförderungen',
        Value: 284,
        TargetValue: 0,
      },
      {
        Nr: 53301,
        Desc: 'Maßnahmen zur Förderung der Nachhaltigkeit',
        Value: 60.4,
        TargetValue: 78.4,
      },
      {
        Nr: 89201,
        Desc: 'Förderung von Vorhaben zur energetischen Nutzung von Biomasse',
        Value: 29.9,
        TargetValue: 0,
      },
      {
        Nr: 68404,
        Desc: 'Institutionelle Förderung des “Bündnis Eine Welt “ (BEI)',
        Value: 19.6,
        TargetValue: 19.6,
      },
    ],
  },
  {
    Year: 2016,
    SumValue: 1956,
    SumTargetValue: 2663.1,
    data: [
      {
        Nr: 53310,
        Desc: 'Maßnahmen der Energiewirtschaft, der Energiewende und des Klimaschutzes/Klimawandel',
        Value: 821.3,
        TargetValue: 892.3,
      },
      {
        Nr: 68608,
        Desc: 'Zuwendungen und Projektförderungen',
        Value: 804,
        TargetValue: 1300,
      },
      {
        Nr: 53301,
        Desc: 'Maßnahmen zur Förderung der Nachhaltigkeit',
        Value: 70.6,
        TargetValue: 78.4,
      },
      {
        Nr: 53312,
        Desc: 'Beratungs- und Moderationsleistungen für Bürgerbeteiligungen im Rahmen des Netzausbaues',
        Value: 75.7,
        TargetValue: 80,
      },
      {
        Nr: 68401,
        Desc: 'Zuwendung an das “Bündnis Eine Welt“ zur Umsetzung des Fachpromotorenprogramms',
        Value: 100,
        TargetValue: 100,
      },
    ],
  },
  {
    Year: 2017,
    SumValue: 1881.4,
    SumTargetValue: 2881.7,
    data: [
      {
        Nr: 53310,
        Desc: 'Maßnahmen der Energiewirtschaft, der Energiewende und des Klimaschutzes/Klimawandel',
        Value: 492.9,
        TargetValue: 1142.3,
      },
      {
        Nr: 68608,
        Desc: 'Zuwendungen und Projektförderungen',
        Value: 1550,
        TargetValue: 1300,
      },
      {
        Nr: 53301,
        Desc: 'Maßnahmen zur Förderung der Nachhaltigkeit',
        Value: 47.9,
        TargetValue: 78.4,
      },
      {
        Nr: 68403,
        Desc: 'An den Förderverein Green Screen Festival e.V. ',
        Value: 40,
        TargetValue: 40,
      },
      {
        Nr: 68401,
        Desc: 'Zuwendung an das “Bündnis Eine Welt“ zur Umsetzung des Fachpromotorenprogramms',
        Value: 100,
        TargetValue: 100,
      },
    ],
  },
  {
    Year: 2018,
    SumValue: 1824.6,
    SumTargetValue: 3310.5,
    data: [
      {
        Nr: 53310,
        Desc: 'Maßnahmen der Energiewirtschaft, der Energiewende und des Klimaschutzes/Klimawandel',
        Value: 391.9,
        TargetValue: 942.3,
      },
      {
        Nr: 68608,
        Desc: 'Zuwendungen und Projektförderungen',
        Value: 819.5,
        TargetValue: 1550,
      },
      {
        Nr: 67102,
        Desc: 'Erstattung von Verwaltungskosten an die Investitionsbank und von Kosten für die Abwicklung von Förderprogrammen',
        Value: 336.1,
        TargetValue: 400,
      },
      {
        Nr: 53301,
        Desc: 'Maßnahmen zur Förderung der Nachhaltigkeit',
        Value: 47.8,
        TargetValue: 78.4,
      },
      {
        Nr: 68401,
        Desc: 'Zuwendung an das “Bündnis Eine Welt“ zur Umsetzung des Fachpromotorenprogramms',
        Value: 100,
        TargetValue: 100,
      },
    ],
  },
  {
    Year: 2019,
    SumValue: 2315.9,
    SumTargetValue: 3172.1,
    data: [
      {
        Nr: 68608,
        Desc: 'Zuwendungen und Projektförderungen',
        Value: 1095.8,
        TargetValue: 1250,
      },
      {
        Nr: 53310,
        Desc: 'hmen der Energiewirtschaft, der Energiewende und des Klimaschutzes/Klimawandels',
        Value: 540.1,
        TargetValue: 942.3,
      },
      {
        Nr: 67102,
        Desc: 'Erstattung von Verwaltungskosten an die Investitionsbank und von Kosten für die Abwicklung von Förderprogrammen',
        Value: 349.7,
        TargetValue: 450,
      },
      {
        Nr: 68401,
        Desc: 'uwendung an das “Bündnis Eine Welt“ zur Umsetzung des Fachpromotorenprogramms',
        Value: 136,
        TargetValue: 136,
      },
      {
        Nr: 53301,
        Desc: 'Maßnahmen zur Förderung der Nachhaltigkeit',
        Value: 93.5,
        TargetValue: 100,
      },
    ],
  },
  {
    Year: 2020,
    SumValue: 5268,
    SumTargetValue: 4327.1,
    data: [
      {
        Nr: 68101,
        Desc: 'Klimaschutz für Bürgerinnen und Bürger',
        Value: 2346.5,
        TargetValue: 635,
      },
      {
        Nr: 68608,
        Desc: 'Zuwendungen und Projektförderungen',
        Value: 1474.4,
        TargetValue: 1250,
      },
      {
        Nr: 53310,
        Desc: 'Maßnahmen der Energiewirtschaft, der Energiewende und des Klimaschutzes/Klimawandels',
        Value: 713,
        TargetValue: 942.3,
      },
      {
        Nr: 67102,
        Desc: 'Erstattung von Verwaltungskosten an die Investitionsbank und von Kosten für die Abwicklung von Förderprogrammen',
        Value: 324.6,
        TargetValue: 450,
      },
      {
        Nr: 68401,
        Desc: 'Zuwendung an das “Bündnis Eine Welt“ zur Umsetzung des Fachpromotorenprogramms',
        Value: 136,
        TargetValue: 136,
      },
    ],
  },
  {
    Year: 2021,
    SumValue: 8260.3,
    SumTargetValue: 43745.8,
    data: [
      {
        Nr: 68608,
        Desc: 'Zuwendungen und Projektförderungen',
        Value: 4176.3,
        TargetValue: 9625,
      },
      {
        Nr: 68101,
        Desc: 'Klimaschutz für Bürgerinnen und Bürge',
        Value: 2900,
        TargetValue: 2735,
      },
      {
        Nr: 53310,
        Desc: 'Maßnahmen der Energiewirtschaft, der Energiewende und des Klimaschutzes/Klimawandels',
        Value: 732,
        TargetValue: 942.3,
      },
      {
        Nr: 68401,
        Desc: 'uwendung an das “Bündnis Eine Welt“ zur Umsetzung des Fachpromotorenprogramms',
        Value: 136,
        TargetValue: 136,
      },
      {
        Nr: 53302,
        Desc: 'Kompetenzzentrum nachhaltige Beschaffung und Vergabe',
        Value: 60,
        TargetValue: 60,
      },
    ],
  },
];
