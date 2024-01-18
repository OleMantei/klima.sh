import { useNavigate, useLocation } from 'react-router';
import {
  Bs1CircleFill,
  Bs2CircleFill,
  Bs3CircleFill,
  Bs4CircleFill,
  BsQuestionLg,
} from 'react-icons/bs';
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
            <SecondaryDashboardWidget
              title="Widget 1"
              Icon={Bs1CircleFill}
              mainValue={grossEnergy}
              unitOfMainValue={' GWh'}
              mainValueDelta={-1.4}
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
              title="Widget 3"
              Icon={Bs3CircleFill}
              mainValue={0}
              unitOfMainValue={'TWh'}
              mainValueDelta={-1.4}
            >
              <TextComponent>Place detail content here</TextComponent>
            </SecondaryDashboardWidget>
            <SecondaryDashboardWidget
              title="Widget 4"
              Icon={Bs4CircleFill}
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
