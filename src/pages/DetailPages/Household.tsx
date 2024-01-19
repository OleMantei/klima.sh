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
  HouseholdDataType,
  filterDataByYearAndMgtg,
  householdData,
  householdDataTotal,
} from '../../data/householdData';
import { useRecoilValue } from 'recoil';
import { userState } from '../../store';

export const Household = () => {
  const user = useRecoilValue(userState);
  const [isDataTotal, setIsDataTotal] = useState(true);
  const data = filterDataByYearAndMgtg(
    householdData,
    user.yearRangeSelection,
    false,
  );
  const [hiddenItemsUuids, setHiddenItemsUuids] = useState<string[]>([]);
  const dataPlanning = filterDataByYearAndMgtg(
    householdData,
    user.yearRangeSelection,
    true,
  );

  const filteredHiddenItems = (
    data: HouseholdDataType,
    hiddenItemsUuids: string[],
  ) => {
    return data.filter((item) => !hiddenItemsUuids.includes(item.uuid));
  };

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
  const getYdata = (group?: string): number[] => {
    const dataFiltered = filteredHiddenItems(data, hiddenItemsUuids);
    let dataFilteredGroup;
    if (group) {
      dataFilteredGroup = dataFiltered.filter((item) => item.mgtg === group);
    } else {
      dataFilteredGroup = dataFiltered;
    }

    const res: { [key: string]: number } = {};

    dataFilteredGroup.forEach((item) => {
      Object.keys(item.data).forEach((key) => {
        if (res[key]) {
          res[key] += item.data[key];
        } else {
          res[key] = item.data[key];
        }
      });
    });
    return Object.values(res);
  };
  const getMaxChartScaling = () => {
    const max = Math.max(...getYdata());
    if (max <= 1) return 1;

    const power = Math.ceil(Math.log10(max));
    return Math.pow(10, power);
  };
  const maxChartScaling = getMaxChartScaling();

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
            scale={1000}
            unit="Mio €"
            usage="Ausgaben"
            maxScale={maxChartScaling}
          />
        </ChartCard>
        <ChartCard>
          <BarChart
            title="Gruppe 01"
            xData={getXdata()}
            yData={getYdata('01')}
            scale={1000}
            unit="Mio €"
            usage="Ausgaben"
            maxScale={maxChartScaling}
          />
        </ChartCard>
        <ChartCard>
          <BarChart
            title="Gruppe 03"
            xData={getXdata()}
            yData={getYdata('03')}
            scale={1000}
            unit="Mio €"
            usage="Ausgaben"
            maxScale={maxChartScaling}
          />
        </ChartCard>
        <ChartCard>
          <BarChart
            title="Gruppe 04"
            xData={getXdata()}
            yData={getYdata('04')}
            scale={1000}
            unit="Mio €"
            usage="Ausgaben"
            maxScale={maxChartScaling}
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
          hiddenItemsUuids={hiddenItemsUuids}
          setHiddenItemsUuids={setHiddenItemsUuids}
          data={data}
          dataPlanning={dataPlanning}
        />
      </div>
      <YearRangeSelector />
    </>
  );
};
