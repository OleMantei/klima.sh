import { TextComponent } from '../TextComponent';
import { Progress } from '@nextui-org/react';
// import { userState } from '../../store';
// import { useRecoilValue } from 'recoil';

type StaticDataType = {
  title: string;
  unitOfMainValue: string;
  mainValue: number;
  progress: number;
};

export const DetailsElementHouseholdGroup = ({
  title,
  unitOfMainValue,
  mainValue,
  progress,
}: StaticDataType) => {
  // const user = useRecoilValue(userState);
  return (
    <div className="flex-1">
      <TextComponent
        style="text-left text-default-800 dark:text-default-600"
        fSize="text-sm"
        fFamily="font-secondary"
        fWeight="font-semibold"
      >
        {mainValue} {unitOfMainValue}
      </TextComponent>
      <Progress
        classNames={{
          base: 'w-5/6',
          indicator: 'bg-gradient-to-r from-primary-500 to-success-600',
          track: 'bg-slate-400 bg-opacity-40',
        }}
        size="sm"
        aria-label=""
        value={progress}
        className="fill-black"
      />
      <TextComponent
        fWeight="font-light"
        style="text-left text-default-800 dark:text-default-600"
      >
        {title}
      </TextComponent>
    </div>
  );
};
