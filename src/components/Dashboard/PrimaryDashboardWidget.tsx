import { Card, CardBody } from '@nextui-org/card';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { TextComponent } from '../TextComponent';
import { Divider } from '@nextui-org/react';

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
    <Card
      style={{ borderRadius: 10 }}
      className=" bg-gradient-to-br from-primary-100 to-success-50"
    >
      <CardBody>
        <div className="flex items-center gap-2 pb-2">
          <Icon size={20} className="fill-default-500" />
          <TextComponent style="font-semibold text-default-600">
            {title}
          </TextComponent>
        </div>
        <TextComponent
          style="text-center text-default-800"
          fSize="text-3xl"
          fWeight="font-bold"
        >
          {mainValue} {unitOfMainValue}
        </TextComponent>
        <Divider className="my-3 w-9/12 self-center bg-default-500"></Divider>
        <div className="text-center">
          {children}
          <TextComponent
            title
            style={`text-${mainValueDelta <= 0 ? 'danger' : 'success'}-600`}
          >
            {mainValueDelta}%
          </TextComponent>
        </div>
      </CardBody>
    </Card>
  );
};
