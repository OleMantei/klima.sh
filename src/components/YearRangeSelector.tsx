import { Card, CardBody } from '@nextui-org/card';
import { Slider } from '@nextui-org/slider';
import { useRecoilState } from 'recoil';
import { userState } from '../store';
import { BsCalendar3 } from 'react-icons/bs';
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { TextComponent } from './TextComponent';

export const YearRangeSelector = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const yearRangeSelection = user.yearRangeSelection;
  const yearRangeData = user.yearRangeData;

  const handleChange = (years: number | number[]) => {
    if (Array.isArray(years)) {
      setUser({ ...user, yearRangeSelection: [years[0], years[1]] });
    } else {
      setUser({ ...user, yearRangeSelection: [years, years] });
    }
  };

  return (
    <div className={`absolute bottom-0 mb-4 px-4 w-full`}>
      <OutsideClickHandler
        onOutsideClick={() => {
          setOpen(false);
        }}
      >
        <Card
          fullWidth={open}
          isPressable
          onPress={() => setOpen(true)}
          style={{ left: '50%', transform: 'translate(-50%)' }}
          className=" drop-shadow-lg shadow-sm border-0 bg-gradient-to-r from-primary-100 to-success-50"
        >
          <CardBody>
            <div className="text-center">
              <BsCalendar3 className="inline mr-2 mb-1" />
              <TextComponent
                title
                style="text-center inline"
              >{`${yearRangeSelection[0]} - ${yearRangeSelection[1]}`}</TextComponent>
            </div>
            {open && (
              <Slider
                classNames={{
                  filler: 'bg-gradient-to-r from-primary-300 to-success-500',
                }}
                step={1}
                minValue={yearRangeData[0]}
                maxValue={yearRangeData[1]}
                defaultValue={yearRangeSelection}
                hideValue={true}
                value={yearRangeSelection}
                onChange={handleChange}
                renderThumb={(props) => (
                  <div
                    {...props}
                    className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                  >
                    <span className="transition-transform bg-gradient-to-br shadow-small from-primary-300 to-primary-700 rounded-full w-3 h-3 block group-data-[dragging=true]:scale-80" />
                  </div>
                )}
              />
            )}
          </CardBody>
        </Card>
      </OutsideClickHandler>
    </div>
  );
};
