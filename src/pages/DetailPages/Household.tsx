import { Button, ButtonGroup } from '@nextui-org/react';
import { ChartCard } from '../../components/DetailPages/ChartCard';
import { ChartSlider } from '../../components/DetailPages/ChartSlider';
import { NavBar } from '../../components/NavBar';
import { TextComponent } from '../../components/TextComponent';
import { YearRangeSelector } from '../../components/YearRangeSelector';
import { BarSample } from '../../components/DetailPages/BarSample';
import { useState } from 'react';
import { DataList } from '../../components/DetailPages/DataList';

export const Household = () => {
  const [isDataTotal, setIsDataTotal] = useState(true);

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
          <BarSample />
        </ChartCard>
        <ChartCard>
          <BarSample />
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
        <DataList title="Haushaltsposten" />
      </div>
      <YearRangeSelector />
    </>
  );
};
