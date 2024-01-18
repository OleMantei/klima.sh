import { useNavigate, useLocation } from 'react-router';
import {
  Bs1CircleFill,
  Bs2CircleFill,
  Bs3CircleFill,
  Bs4CircleFill,
  BsCheckCircleFill,
  BsQuestionLg,
} from 'react-icons/bs';
import { YearRangeSelector } from '../components/YearRangeSelector';
import { Button } from '@nextui-org/react';
import { useEffect } from 'react';
import { SecondaryDashboardWidget } from '../components/Dashboard/SecondaryDashboardWidget';
import { TextComponent } from '../components/TextComponent';
import { useRecoilValue } from 'recoil';
import { userState } from '../store';
import { PrimaryDashboardWidget } from '../components/Dashboard/PrimaryDashboardWidget';
import {
  getSum,
  getPercentage,
  grossEnergyConsumptionData,
} from '../data/grossEnergyConsumptionBySector';
import {
  getPrimaryEnergySum,
  getPrimaryEnergyPercentage,
  primaryEnergyData,
} from '../data/primaryEnergyConsumptionByEnergySource';

import {
  getGreenHouseGasSum,
  getGreenHouseGasPercentage,
  greenHouseGasBySectorData,
} from '../data/greenHouseGasBySector';

export const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const user = useRecoilValue(userState);
  const grossEnergy = getSum(
    grossEnergyConsumptionData,
    user.yearRangeSelection,
  );

  const grossEnergyDelta = getPercentage(
    grossEnergyConsumptionData,
    user.yearRangeSelection,
  );

  const primaryEnergy = getPrimaryEnergySum(
    primaryEnergyData,
    user.yearRangeSelection,
  );

  const primaryEnergyDelta = getPrimaryEnergyPercentage(
    primaryEnergyData,
    user.yearRangeSelection,
  );

  const greenHouseGas = getGreenHouseGasSum(
    greenHouseGasBySectorData,
    user.yearRangeSelection,
  );

  const greenHouseGasDelta = getGreenHouseGasPercentage(
    greenHouseGasBySectorData,
    user.yearRangeSelection,
  );

  useEffect(() => {
    if (pathname === '/') {
      // reroute incorrect path -> see App.tsx
      navigate('/dashboard');
    }
  }, [navigate, pathname]);

  return (
    <>
      <div className="p-4">
        <div className="text-right">
          <Button
            size="sm"
            radius="full"
            variant="faded"
            isIconOnly
            aria-label="Hilfe"
            className="ml-auto"
            onPress={() => navigate('/help')}
          >
            <BsQuestionLg />
          </Button>
        </div>
        <TextComponent style="text-center my-10">
          Dashboard coming soon
        </TextComponent>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 ">
            <PrimaryDashboardWidget
              title="Main Widgets "
              Icon={BsCheckCircleFill}
              mainValue={0}
              unitOfMainValue={'€'}
              mainValueDelta={-1.4}
            >
              <TextComponent>Place detail content here</TextComponent>
            </PrimaryDashboardWidget>
          </div>
          <div className="flex flex-row gap-2 ">
            <SecondaryDashboardWidget
              title="Primärenergieverbrauch"
              Icon={Bs1CircleFill}
              mainValue={primaryEnergy}
              unitOfMainValue={' GWh'}
              mainValueDelta={primaryEnergyDelta}
            >
              <TextComponent>Place detail content here</TextComponent>
            </SecondaryDashboardWidget>
            <SecondaryDashboardWidget
              title="Widget 2"
              Icon={Bs2CircleFill}
              mainValue={0}
              unitOfMainValue={'TWh'}
              mainValueDelta={-1.4}
            >
              <TextComponent>Place detail content here</TextComponent>
            </SecondaryDashboardWidget>
          </div>
          <div className="flex flex-row  gap-2">
            <SecondaryDashboardWidget
              title="Bruttoenergieverbrauch"
              Icon={Bs3CircleFill}
              mainValue={grossEnergy}
              unitOfMainValue={' GWh'}
              mainValueDelta={grossEnergyDelta}
            >
              <TextComponent>Place detail content here</TextComponent>
            </SecondaryDashboardWidget>
            <SecondaryDashboardWidget
              title="Treibhausgasemissionen"
              Icon={Bs4CircleFill}
              mainValue={greenHouseGas}
              unitOfMainValue={' Tonnen'}
              mainValueDelta={greenHouseGasDelta}
            >
              <TextComponent>Place detail content here</TextComponent>
            </SecondaryDashboardWidget>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div
            className="w-1/2"
            onClick={() => navigate('/dashboard/totalEmissionsBySector')}
          ></div>
        </div>
      </div>
      <YearRangeSelector />
    </>
  );
};
