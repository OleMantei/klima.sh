import { useNavigate, useLocation } from 'react-router';
import { BsQuestionLg } from 'react-icons/bs';
import { BiLeaf } from 'react-icons/bi';
import {
  AiOutlineEuroCircle,
  AiOutlineThunderbolt,
  AiOutlineCloud,
  AiOutlineCluster,
  AiOutlineFire,
} from 'react-icons/ai';
import { YearRangeSelector } from '../components/YearRangeSelector';
import { Button, CircularProgress } from '@nextui-org/react';
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
import { useTheme } from 'next-themes';
import { DetailsElementHouseholdGroup } from '../components/Dashboard/DetailsElementHouseholdGroup';
import { SectorSplit } from '../components/Dashboard/SectorSplit';
import {
  getGreenHouseGasSum,
  getHighestTHGSectors,
  greenHouseGasBySectorData,
} from '../data/greenHouseGasBySector';
import {
  getHighestEnergySectors,
  getSum,
  grossEnergyConsumptionData,
} from '../data/grossEnergyConsumptionBySector';

export const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const user = useRecoilValue(userState);

  const {
    household,
    householdDelta,
    householdGroups,
    grossEnergy,
    grossEnergyDelta,
    primaryEnergy,
    primaryEnergyDelta,
    greenHouseGas,
    greenHouseGasDelta,
    heating,
    heatingDelta,
    heatingRenewables,
    primaryEnergyRenewables,
  } = getGlobalSumValues(user);

  useEffect(() => {
    if (pathname === '/') {
      // reroute incorrect path -> see App.tsx
      navigate('/dashboard');
    }
  }, [navigate, pathname]);

  const { theme } = useTheme();
  return (
    <>
      <div className="p-4">
        <div className="text-right">
          <Button
            color={theme === 'dark' ? 'default' : 'primary'}
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
          <div onClick={() => navigate('/dashboard/household')}>
            <PrimaryDashboardWidget
              title="Öffentliche Mittel Klimaschutz"
              Icon={AiOutlineEuroCircle}
              mainValue={household}
              unitOfMainValue={'Mio. €'}
              mainValueDelta={householdDelta}
            >
              <div className="flex my-1 gap-2 justify-evenly ml-2">
                <DetailsElementHouseholdGroup
                  title="Bildung"
                  mainValue={householdGroups[0]}
                  unitOfMainValue="Mio. €"
                  progress={(householdGroups[0] / household) * 100}
                ></DetailsElementHouseholdGroup>
                <DetailsElementHouseholdGroup
                  title="Maßnahmen"
                  mainValue={householdGroups[1]}
                  unitOfMainValue="Mio. €"
                  progress={(householdGroups[1] / household) * 100}
                ></DetailsElementHouseholdGroup>
                <DetailsElementHouseholdGroup
                  title="Entwicklungen"
                  mainValue={householdGroups[2]}
                  unitOfMainValue="Mio. €"
                  progress={(householdGroups[2] / household) * 100}
                ></DetailsElementHouseholdGroup>
              </div>
            </PrimaryDashboardWidget>
          </div>
          <div className="flex gap-2">
            <SecondaryDashboardWidget
              title="Primärenergie"
              mainValue={primaryEnergy}
              unitOfMainValue={' TWh'}
              Icon={AiOutlineThunderbolt}
              mainValueDelta={primaryEnergyDelta}
            >
              <div className="flex flex-row items-end">
                <div className="relative">
                  <CircularProgress
                    classNames={{
                      svg: 'w-16 h-16 drop-shadow-md',
                      indicator:
                        'bg-gradient-to-r from-primary-500 to-success-600',
                      track: 'bg-slate-400 bg-opacity-40',
                      value: 'text-md font-semibold text-white',
                    }}
                    strokeWidth={2}
                    size="md"
                    value={primaryEnergyRenewables}
                    showValueLabel={false}
                  ></CircularProgress>
                  <BiLeaf
                    size={24}
                    className="fill-default-500 absolute top-0 left-0 right-0 bottom-0 m-auto"
                  />
                </div>
                <TextComponent fWeight="font-light" style="pl-2">
                  {primaryEnergyRenewables}% erneuerbar
                </TextComponent>
              </div>
            </SecondaryDashboardWidget>
            <SecondaryDashboardWidget
              title="Wärmeversorgung"
              Icon={AiOutlineFire}
              mainValue={heating}
              unitOfMainValue={' TWh'}
              mainValueDelta={heatingDelta}
            >
              <div className="flex flex-row items-end">
                <div className="relative">
                  <CircularProgress
                    classNames={{
                      svg: 'w-16 h-16 drop-shadow-md',
                      indicator:
                        'bg-gradient-to-r from-primary-500 to-success-600',
                      track: 'bg-slate-400 bg-opacity-40',
                      value: 'text-md font-semibold text-white',
                    }}
                    strokeWidth={2}
                    size="md"
                    value={heatingRenewables}
                    showValueLabel={false}
                  ></CircularProgress>
                  <BiLeaf
                    size={24}
                    className="fill-default-500 absolute top-0 left-0 right-0 bottom-0 m-auto"
                  />
                </div>
                <TextComponent fWeight="font-light" style="pl-2">
                  {heatingRenewables}% erneuerbar
                </TextComponent>
              </div>
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
              <SectorSplit
                sectors={getHighestEnergySectors(
                  grossEnergyConsumptionData,
                  user.yearRangeSelection,
                )}
                total={
                  getSum(grossEnergyConsumptionData, user.yearRangeSelection) *
                  1000
                }
              />
            </SecondaryDashboardWidget>
            <SecondaryDashboardWidget
              title="Treibhausgase"
              Icon={AiOutlineCloud}
              mainValue={greenHouseGas}
              unitOfMainValue={' Gt'}
              mainValueDelta={greenHouseGasDelta}
            >
              <SectorSplit
                sectors={getHighestTHGSectors(
                  greenHouseGasBySectorData,
                  user.yearRangeSelection,
                )}
                total={
                  getGreenHouseGasSum(
                    greenHouseGasBySectorData,
                    user.yearRangeSelection,
                  ) * 1000
                }
              />
            </SecondaryDashboardWidget>
          </div>
        </div>

        <div className="flex flex-row gap-2  h-32"></div>
      </div>
      <YearRangeSelector />
    </>
  );
};
