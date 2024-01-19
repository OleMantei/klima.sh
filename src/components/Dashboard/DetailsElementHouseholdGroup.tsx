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
    <div className="w-1/3">
      <TextComponent
        style="text-left text-default-800"
        fSize="text-1xl"
        fWeight="font-bold"
      >
        {mainValue} {unitOfMainValue}
      </TextComponent>
      <Progress
        classNames={{
          base: 'max-w-md',
          indicator: 'bg-gradient-to-r from-primary-500 to-success-600',
        }}
        size="sm"
        aria-label=""
        value={progress}
        className="max-w-md"
      />{' '}
      <TextComponent style="text-left text-default-800">
        {' '}
        {title}{' '}
      </TextComponent>
    </div>
  );
};
