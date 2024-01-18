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
    <div className={`absolute bottom-0 mb-8 px-4 w-full`}>
      <OutsideClickHandler
        onOutsideClick={() => {
          setOpen(false);
        }}
      >
        <Card
          fullWidth={open}
          isPressable
          onPress={() => setOpen(!open)}
          style={{
            left: '50%',
            transform: 'translate(-50%)',
            borderRadius: 10,
          }}
          className=" drop-shadow-lg shadow-sm border-0 bg-content1 text-primary-800"
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
                    className="group top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                  >
                    <span className="transition-transform shadow-small bg-primary-700 bg-opacity-50 rounded-full w-4 h-4 block group-data-[dragging=true]:scale-80" />
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
