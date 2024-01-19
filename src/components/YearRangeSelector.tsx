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
    <div className={`fixed bottom-0 mb-8 px-4 w-full`}>
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
            paddingLeft:
              yearRangeSelection[0] === yearRangeSelection[1] && open === false
                ? 20
                : 0,
            paddingRight:
              yearRangeSelection[0] === yearRangeSelection[1] && open === false
                ? 20
                : 0,
          }}
          className=" drop-shadow-lg shadow-sm border-0 bg-content1 text-primary-800 dark:text-primary-600 dark:bg-primary-100 dark:bg-opacity-80"
        >
          <CardBody>
            <div className="text-center">
              <BsCalendar3 className="inline mr-2 mb-1 dark:text-default-600" />
              <TextComponent
                title
                style="text-center inline dark:text-default-600"
              >
                {yearRangeSelection[0] === yearRangeSelection[1]
                  ? yearRangeSelection[0]
                  : `${yearRangeSelection[0]} - ${yearRangeSelection[1]}`}
              </TextComponent>
            </div>
            {open && (
              <Slider
                className="dark:text-default-600"
                classNames={{
                  filler:
                    'bg-gradient-to-r from-primary-500 to-success-600 dark:bg-gradient-to-r dark:from-primary-300 dark:to-success-400',
                }}
                color="success"
                marks={[
                  {
                    value: 2015,
                    label: '2015',
                  },

                  {
                    value: 2016,
                    label: '2016',
                  },
                  {
                    value: 2017,
                    label: '2017',
                  },
                  {
                    value: 2018,
                    label: '2018',
                  },
                  {
                    value: 2019,
                    label: '2019',
                  },
                  {
                    value: 2020,
                    label: '2020',
                  },
                  {
                    value: 2021,
                    label: '2021',
                  },
                ]}
                step={1}
                minValue={yearRangeData[0]}
                maxValue={yearRangeData[1]}
                defaultValue={yearRangeSelection}
                aria-label="Jahr"
                value={yearRangeSelection}
                onChange={handleChange}
                renderThumb={(props) => (
                  <div
                    {...props}
                    className="group top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                  >
                    <span className="transition-transform shadow-small bg-primary-700 dark:bg-primary-800  rounded-full w-4 h-4 block group-data-[dragging=true]:scale-80" />
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
