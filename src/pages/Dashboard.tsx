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
import {
  getSum,
  grossEnergyConsumptionData,
} from '../data/grossEnergyConsumptionBySector';
import { PrimaryDashboardWidget } from '../components/Dashboard/PrimaryDashboardWidget';
import { HeaderDashboard } from '../components/Dashboard/HeaderDashboard';

export const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const user = useRecoilValue(userState);
  const grossEnergy = getSum(
    grossEnergyConsumptionData,
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
            color="primary"
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
          delta={3}
          total={33}
          subTextDelta="Verbesserung"
          subTextTotal="Stand"
        />
        <div className="flex flex-col gap-2">
          <PrimaryDashboardWidget
            title="Main Widgets "
            Icon={AiOutlineEuroCircle}
            mainValue={0}
            unitOfMainValue={'€'}
            mainValueDelta={1.4}
          >
            <TextComponent>Place detail content here</TextComponent>
          </PrimaryDashboardWidget>
          <div className="flex gap-2">
            <SecondaryDashboardWidget
              title="Widget 1"
              mainValue={grossEnergy}
              unitOfMainValue={' GWh'}
              Icon={AiOutlineThunderbolt}
              mainValueDelta={-1.4}
            >
              <TextComponent>Place detail content here</TextComponent>
            </SecondaryDashboardWidget>
            <SecondaryDashboardWidget
              title="Widget 2"
              Icon={AiOutlineCloud}
              mainValue={0}
              unitOfMainValue={'TWh'}
              mainValueDelta={1.4}
            >
              <TextComponent>Place detail content here</TextComponent>
            </SecondaryDashboardWidget>
          </div>
          <div className="flex flex-row  gap-2">
            <SecondaryDashboardWidget
              title="Widget 3"
              Icon={AiOutlineCluster}
              mainValue={0}
              unitOfMainValue={'TWh'}
              mainValueDelta={-1.4}
            >
              <TextComponent>Place detail content here</TextComponent>
            </SecondaryDashboardWidget>
            <SecondaryDashboardWidget
              title="Widget 4"
              Icon={AiOutlineFire}
              mainValue={0}
              unitOfMainValue={'%'}
              mainValueDelta={-1.4}
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
