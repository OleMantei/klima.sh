import {
  //   Button,
  Card,
  Listbox,
  ListboxItem,
  //   Popover,
  //   PopoverContent,
  //   PopoverTrigger,
} from '@nextui-org/react';
import { TextComponent } from '../TextComponent';
import { BsEye, BsChevronRight, BsEyeSlash } from 'react-icons/bs';
import { ReactElement, useState } from 'react';
import { HouseholdDataType } from '../../data/householdData';

type Props = {
  title: string;
  hiddenItemsUuids: string[];
  setHiddenItemsUuids: React.Dispatch<React.SetStateAction<string[]>>;
  data: HouseholdDataType;
  dataPlanning: HouseholdDataType;
};

export const DataList = ({
  title,
  hiddenItemsUuids,
  setHiddenItemsUuids,
  data,
  dataPlanning,
}: Props) => {
  const [isDetailsOpenItemKeys, setIsDetailsOpenItemKeys] = useState<string[]>(
    [],
  );

  const handleToggleDataHiddenState = (itemKey: string) => {
    if (hiddenItemsUuids.includes(itemKey)) {
      setHiddenItemsUuids(hiddenItemsUuids.filter((i) => i !== itemKey));
    } else {
      setHiddenItemsUuids([...hiddenItemsUuids, itemKey]);
    }
  };

  const handleToggleDetailsOpenState = (itemKey: string) => {
    if (isDetailsOpenItemKeys.includes(itemKey)) {
      setIsDetailsOpenItemKeys(
        isDetailsOpenItemKeys.filter((i) => i !== itemKey),
      );
    } else {
      setIsDetailsOpenItemKeys([...isDetailsOpenItemKeys, itemKey]);
    }
  };

  //   const content = (
  //     <PopoverContent className="w-[240px]">
  //       <div className="px-1 py-2 w-full">
  //         <p className="text-small font-bold text-foreground">Dimensions</p>
  //         <div className="mt-2 flex flex-col gap-2 w-full">Moin</div>
  //       </div>
  //     </PopoverContent>
  //   );

  //   console.log(data);

  const yearSum = (data: { [key: string]: number }) => {
    return Math.floor(
      Object.values(data).reduce((acc, currentValue) => acc + currentValue, 0) *
        1000,
    );
  };

  const getListBoxItem = (): ReactElement[] => {
    const items: ReactElement[] = [];
    data.map((item) => {
      const planningItem = dataPlanning.filter(
        (entry) =>
          entry.identifier === item.identifier &&
          entry.purpose === item.purpose &&
          entry.planning === true,
      );
      items.push(
        <ListboxItem
          // className="bg-primary-50"
          showDivider={
            !isDetailsOpenItemKeys.includes(
              `${item.identifier}-${item.purpose}-${
                item.planning ? 'planning' : 'notPlanning'
              }`,
            )
          }
          isReadOnly
          key={`${item.identifier}-${item.purpose}-${
            item.planning ? 'planning' : 'notPlanning'
          }`}
          startContent={
            <div className="bg-primary/10 flex items-center rounded-small justify-center w-7 h-7">
              {hiddenItemsUuids.includes(item.uuid) ? (
                <BsEyeSlash
                  className="text-lg text-default"
                  onClick={() => handleToggleDataHiddenState(item.uuid)}
                />
              ) : (
                <BsEye
                  className="text-lg text-primary"
                  onClick={() => {
                    if (
                      !hiddenItemsUuids.includes(item.uuid) &&
                      isDetailsOpenItemKeys.includes(
                        `${item.identifier}-${item.purpose}-${
                          item.planning ? 'planning' : 'notPlanning'
                        }`,
                      )
                    ) {
                      console.log(item.uuid);
                      handleToggleDataHiddenState(item.uuid);
                      handleToggleDetailsOpenState(
                        `${item.identifier}-${item.purpose}-${
                          item.planning ? 'planning' : 'notPlanning'
                        }`,
                      );
                    } else {
                      handleToggleDataHiddenState(item.uuid);
                    }
                  }}
                />
              )}
            </div>
          }
          endContent={
            <div
              className={`flex items-center gap-1 pl-2 ${
                hiddenItemsUuids.includes(item.uuid)
                  ? `text-default-400 font-light`
                  : `text-default-500 font-bold`
              }`}
              onClick={() =>
                hiddenItemsUuids.includes(item.uuid)
                  ? null
                  : handleToggleDetailsOpenState(
                      `${item.identifier}-${item.purpose}-${
                        item.planning ? 'planning' : 'notPlanning'
                      }`,
                    )
              }
            >
              <span className="text-small">
                {yearSum(item.data).toLocaleString('de-DE')} €
              </span>
              <BsChevronRight
                className={`"text-xl ${
                  isDetailsOpenItemKeys.includes(
                    `${item.identifier}-${item.purpose}-${
                      item.planning ? 'planning' : 'notPlanning'
                    }`,
                  ) && 'rotate-90'
                }`}
              />
            </div>
          }
        >
          <div
            className={`
              ${
                hiddenItemsUuids.includes(item.uuid)
                  ? 'text-default-400 font-light'
                  : 'text-default-600 font-semibold'
              }
            `}
          >
            {item.purpose}
          </div>
        </ListboxItem>,
        <ListboxItem
          style={{
            display: isDetailsOpenItemKeys.includes(
              `${item.identifier}-${item.purpose}-${
                item.planning ? 'planning' : 'notPlanning'
              }`,
            )
              ? ''
              : 'none',
          }}
          key={`${item.identifier}-${item.purpose}-${
            item.planning ? 'planning' : 'notPlanning'
          }-details`}
          isReadOnly
          showDivider
        >
          <div className="pl-9 pb-3 whitespace-break-spaces">
            <p className="mb-1 text-sm font-normal">{item.purpose}</p>
            {planningItem.length > 0 && (
              <p>
                <span className="text-sm font-thin">
                  Ursprünglich geplant: {yearSum(planningItem[0].data)} €<br />
                  Abweichung:{' '}
                  {(
                    Math.round(
                      (100 -
                        (yearSum(item.data) / yearSum(planningItem[0].data)) *
                          100) *
                        100,
                    ) / 100
                  ).toLocaleString('de-DE')}{' '}
                  %
                </span>
              </p>
            )}
          </div>
        </ListboxItem>,
      );
    });
    return items;
  };

  return (
    <div>
      <div className="flex justify-between mb-2">
        <TextComponent style="uppercase">{title}</TextComponent>
        {/* <Popover key="popover" offset={10} placement="bottom" backdrop="blur">
          <PopoverTrigger>
            <Button
              size="sm"
              color="primary"
              variant="flat"
              className="capitalize"
            >
              Sortierung
            </Button>
          </PopoverTrigger>
          {content}
        </Popover> */}
      </div>
      <Card shadow="none">
        <Listbox
          variant="light"
          hideEmptyContent
          className="bg-gradient-to-tr from-primary-100 to-purple-50 shadow-none dark:border-default-200 dark:bg-gradient-to-tr dark:from-primary-50 dark:to-primary-200 "
        >
          {getListBoxItem()}
        </Listbox>
      </Card>
    </div>
  );
};
