import { useNavigate, useLocation } from 'react-router';
import { BsQuestionLg } from 'react-icons/bs';

import {
  AiOutlineEuroCircle,
  AiOutlineThunderbolt,
  AiOutlineCloud,
  AiOutlineCluster,
  AiOutlineFire,
} from 'react-icons/ai';
import { YearRangeSelector } from '../components/YearRangeSelector';
import { Button } from '@nextui-org/react';
import { useEffect } from 'react';
import { SecondaryDashboardWidget } from '../components/Dashboard/SecondaryDashboardWidget';
import { TextComponent } from '../components/TextComponent';
import { useRecoilValue } from 'recoil';
import { userState } from '../store';

import { PrimaryDashboardWidget } from '../components/Dashboard/PrimaryDashboardWidget';

import { HeaderDashboard } from '../components/Dashboard/HeaderDashboard';
import {
  co2Emissions,
  getDeltaAsPercentage,
  getLatestYearDelta,
} from '../data/co2Emissions';
import { getGlobalSumValues } from '../data/mathDataHelper';

export const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const user = useRecoilValue(userState);

  const {
    household,
    householdDelta,
    grossEnergy,
    grossEnergyDelta,
    primaryEnergy,
    primaryEnergyDelta,
    greenHouseGas,
    greenHouseGasDelta,
    heating,
    heatingDelta,
  } = getGlobalSumValues(user);

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
            color="default"
            size="sm"
            radius="md"
            variant="flat"
            isIconOnly
            aria-label="Hilfe"
            className="ml-auto"
            onPress={() => navigate('/help')}
          >
            <BsQuestionLg />
          </Button>
        </div>
        <HeaderDashboard
          delta={getDeltaAsPercentage(co2Emissions, user.yearRangeSelection)}
          total={getLatestYearDelta(co2Emissions, user.yearRangeSelection)}
          subTextDelta={
            user.yearRangeSelection[0] != user.yearRangeSelection[1]
              ? 'Unterschied zu ' + user.yearRangeSelection[0].toString()
              : 'Unterschied zu ' + (user.yearRangeSelection[0] - 1).toString()
          }
          subTextTotal={'Stand ' + user.yearRangeSelection[1].toString()}
        />
        <div className="flex flex-col gap-2">
          <PrimaryDashboardWidget
            title="Öffentliche Mittel Klimaschutz"
            Icon={AiOutlineEuroCircle}
            mainValue={household}
            unitOfMainValue={'Mio. €'}
            mainValueDelta={householdDelta}
          >
            <TextComponent>Place detail content here</TextComponent>
          </PrimaryDashboardWidget>
          <div className="flex gap-2">
            <SecondaryDashboardWidget
              title="Primärenergie"
              mainValue={primaryEnergy}
              unitOfMainValue={' TWh'}
              Icon={AiOutlineThunderbolt}
              mainValueDelta={primaryEnergyDelta}
            >
              <TextComponent>Place detail content here</TextComponent>
            </SecondaryDashboardWidget>
            <SecondaryDashboardWidget
              title="Wärmeversorgung"
              Icon={AiOutlineFire}
              mainValue={heating}
              unitOfMainValue={' TWh'}
              mainValueDelta={heatingDelta}
            >
              <TextComponent>Place detail content here</TextComponent>
            </SecondaryDashboardWidget>
          </div>
          <div className="flex flex-row  gap-2">
            <SecondaryDashboardWidget
              title="Energieverbrauch"
              mainValue={grossEnergy}
              unitOfMainValue={' TWh'}
              mainValueDelta={grossEnergyDelta}
              Icon={AiOutlineCluster}
            >
              <TextComponent>Place detail content here</TextComponent>
            </SecondaryDashboardWidget>
            <SecondaryDashboardWidget
              title="Treibhausgase"
              Icon={AiOutlineCloud}
              mainValue={greenHouseGas}
              unitOfMainValue={' Gt'}
              mainValueDelta={greenHouseGasDelta}
            >
              <TextComponent>Place detail content here</TextComponent>
            </SecondaryDashboardWidget>
          </div>
        </div>
      </div>
      <YearRangeSelector />
    </>
  );
};
