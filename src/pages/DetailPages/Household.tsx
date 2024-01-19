import { Button, ButtonGroup } from '@nextui-org/react';
import { ChartCard } from '../../components/DetailPages/ChartCard';
import { ChartSlider } from '../../components/DetailPages/ChartSlider';
import { NavBar } from '../../components/NavBar';
import { TextComponent } from '../../components/TextComponent';
import { YearRangeSelector } from '../../components/YearRangeSelector';
import { BarChart } from '../../components/DetailPages/BarChart';
import { useState } from 'react';
import { DataList } from '../../components/DetailPages/DataList';
import {
  filterDataByYearAndMgtg,
  householdData,
  householdDataTotal,
} from '../../data/householdData';
import { useRecoilValue } from 'recoil';
import { userState } from '../../store';

export const Household = () => {
  const user = useRecoilValue(userState);
  const [isDataTotal, setIsDataTotal] = useState(true);
  const [isDataHiddenItemKeys, setIsDataHiddenItemKeys] = useState<number[]>(
    [],
  );
  const data = filterDataByYearAndMgtg(
    householdData,
    user.yearRangeSelection,
    false,
  );
  const dataPlanning = filterDataByYearAndMgtg(
    householdData,
    user.yearRangeSelection,
    true,
  );

  const getXdata = () => {
    const res: number[] = [];
    for (
      let year = user.yearRangeSelection[0];
      year <= user.yearRangeSelection[1];
      year++
    ) {
      res.push(year);
    }
    return res;
  };
  const getYdata = (): number[] => {
    const res: number[] = [];
    for (
      let year = user.yearRangeSelection[0];
      year <= user.yearRangeSelection[1];
      year++
    ) {
      if (householdDataTotal[year]) {
        res.push((householdDataTotal[year] as number) * 1000);
      }
    }
    return res;
  };

  return (
    <>
      <NavBar
        navigateBackPath="/dashboard"
        navigateBackTitle="Startseite"
        pageTitle="Haushaltsdaten"
      />
      <div className="p-4">
        <TextComponent fSize="text-3xl">2€</TextComponent>
        <TextComponent fSize="text-base" style="text-success-600">
          Moin
        </TextComponent>
      </div>
      <ChartSlider>
        <ChartCard>
          <BarChart
            title="Gesamt"
            xData={getXdata()}
            yData={getYdata()}
            scale={1000000}
            unit="Mio €"
            usage="Ausgaben"
          />
        </ChartCard>
        <ChartCard>
          <BarChart
            title="Gruppe 01"
            xData={getXdata()}
            yData={getYdata()}
            scale={1000000}
            unit="Mio €"
            usage="Ausgaben"
          />
        </ChartCard>
        <ChartCard>
          <BarChart
            title="Gruppe 03"
            xData={getXdata()}
            yData={getYdata()}
            scale={1000000}
            unit="Mio €"
            usage="Ausgaben"
          />
        </ChartCard>
        <ChartCard>
          <BarChart
            title="Gruppe 04"
            xData={getXdata()}
            yData={getYdata()}
            scale={1000000}
            unit="Mio €"
            usage="Ausgaben"
          />
        </ChartCard>
      </ChartSlider>
      <div className="p-4">
        <div className="text-center pb-8">
          <ButtonGroup size="sm">
            <Button
              color={isDataTotal ? 'primary' : 'default'}
              onPress={() => setIsDataTotal(true)}
            >
              Gesamt
            </Button>
            <Button
              color={!isDataTotal ? 'primary' : 'default'}
              onPress={() => setIsDataTotal(false)}
            >
              Verlauf
            </Button>
          </ButtonGroup>
        </div>
        <DataList
          title="Haushaltsposten"
          isDataHiddenItemKeys={isDataHiddenItemKeys}
          setIsDataHiddenItemKeys={setIsDataHiddenItemKeys}
          data={data}
          dataPlanning={dataPlanning}
        />
      </div>
      <YearRangeSelector />
    </>
  );
};
