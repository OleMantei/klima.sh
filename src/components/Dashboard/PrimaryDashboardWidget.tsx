import { Card, CardBody } from '@nextui-org/card';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { TextComponent } from '../TextComponent';

// import { userState } from '../../store';
// import { useRecoilValue } from 'recoil';

type StaticData = {
  Icon: IconType;
  title: string;
  mainValue: number;
  unitOfMainValue: string;
  children?: ReactNode;
  mainValueDelta: number;
};

export const PrimaryDashboardWidget = ({
  title,
  Icon,
  mainValue,
  unitOfMainValue,
  children,
  mainValueDelta,
}: StaticData) => {
  // const user = useRecoilValue(userState);
  return (
    <Card>
      <CardBody>
        <Icon />
        <TextComponent title>{title}</TextComponent>
        <TextComponent>
          {mainValue}
          {unitOfMainValue}
        </TextComponent>
        {children}
        <TextComponent>{mainValueDelta}%</TextComponent>
      </CardBody>
    </Card>
  );
};
