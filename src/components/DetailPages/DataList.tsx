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
  isDataHiddenItemKeys: number[];
  setIsDataHiddenItemKeys: React.Dispatch<React.SetStateAction<number[]>>;
  data: HouseholdDataType;
  dataPlanning: HouseholdDataType;
};

export const DataList = ({
  title,
  isDataHiddenItemKeys,
  setIsDataHiddenItemKeys,
  data,
  dataPlanning,
}: Props) => {
  const [isDetailsOpenItemKeys, setIsDetailsOpenItemKeys] = useState<number[]>(
    [],
  );

  const handleToggleDataHiddenState = (itemKey: number) => {
    if (isDataHiddenItemKeys.includes(itemKey)) {
      setIsDataHiddenItemKeys(
        isDataHiddenItemKeys.filter((i) => i !== itemKey),
      );
    } else {
      setIsDataHiddenItemKeys([...isDataHiddenItemKeys, itemKey]);
    }
  };

  const handleToggleDetailsOpenState = (itemKey: number) => {
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
          isReadOnly
          key={`${item.identifier}-${item.purpose}-${
            item.planning ? 'planning' : 'notPlanning'
          }`}
          startContent={
            <div
              className="bg-primary/10 flex items-center rounded-small justify-center w-7 h-7"
              onClick={() => handleToggleDataHiddenState(1)}
            >
              {isDataHiddenItemKeys.includes(1) ? (
                <BsEyeSlash className="text-lg text-default" />
              ) : (
                <BsEye className="text-lg text-primary" />
              )}
            </div>
          }
          endContent={
            <div
              className="flex items-center gap-1 text-default-400"
              onClick={() => handleToggleDetailsOpenState(1)}
            >
              <span className="text-small">{yearSum(item.data)} €</span>
              <BsChevronRight
                className={`"text-xl ${
                  isDetailsOpenItemKeys.includes(1) && 'rotate-90'
                }`}
              />
            </div>
          }
        >
          {item.purpose}
        </ListboxItem>,
        <ListboxItem
          style={{
            display: isDetailsOpenItemKeys.includes(1) ? '' : 'none',
          }}
          key={`${item.identifier}-${item.purpose}-${
            item.planning ? 'planning' : 'notPlanning'
          }-details`}
          isReadOnly
          showDivider
        >
          <div className="pl-9 pb-3 whitespace-break-spaces">
            <p className="mb-1">{item.purpose}</p>
            {planningItem.length > 0 && (
              <p>
                <span>
                  Ursprünglich geplant: {yearSum(planningItem[0].data)} €
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
        <Listbox>{getListBoxItem()}</Listbox>
      </Card>
    </div>
  );
};
