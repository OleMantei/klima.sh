import { Card, CardBody } from '@nextui-org/card';
import { Slider } from '@nextui-org/slider';
import { useRecoilState } from 'recoil';
import { userState } from '../store';
import { BsCalendar3 } from 'react-icons/bs';
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

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
        >
          <CardBody>
            <div className="text-center">
              <BsCalendar3 className="inline mr-2 mb-1" />
              <div className="text-center text-lg inline">{`${yearRangeSelection[0]} - ${yearRangeSelection[1]}`}</div>
            </div>
            {open && (
              <Slider
                step={1}
                minValue={yearRangeData[0]}
                maxValue={yearRangeData[1]}
                defaultValue={yearRangeSelection}
                hideValue={true}
                value={yearRangeSelection}
                onChange={handleChange}
              />
            )}
          </CardBody>
        </Card>
      </OutsideClickHandler>
    </div>
  );
};
