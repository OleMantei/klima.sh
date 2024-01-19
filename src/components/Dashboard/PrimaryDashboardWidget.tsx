import { Card, CardBody } from '@nextui-org/card';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import {
  ImArrowUpRight2,
  ImArrowDownRight2,
  ImArrowRight2,
} from 'react-icons/im';
import { TextComponent } from '../TextComponent';
import { Divider } from '@nextui-org/react';
import { colorSwitcherPrimary } from '../../design/designHelperFunctions';
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
      className="bg-gradient-to-tr from-primary-300 to-purple-200 dark:bg-gradient-to-tr dark:from-primary-400 dark:to-purple-600"
    >
      <CardBody>
        <div className="flex items-center gap-2 pb-2">
          <Icon size={20} className="fill-default-500" />
          <TextComponent style="font-semibold text-default-600 dark:text-default-500">
            {title}
          </TextComponent>
        </div>
        <div className="flex items-center justify-center pb-2">
          <TextComponent
            style="text-center my-1 text-default-800 dark:text-default-600 pr-3"
            fSize="text-3xl"
            fFamily="font-secondary"
            fWeight="font-bold"
          >
            {mainValue} {unitOfMainValue}
          </TextComponent>
          <div>
            {mainValueDelta > 0 && (
              <ImArrowUpRight2
                className="fill-success"
                size={12}
              ></ImArrowUpRight2>
            )}
            {mainValueDelta == 0 && (
              <ImArrowRight2 className="fill-default" size={12}></ImArrowRight2>
            )}

            {mainValueDelta < 0 && (
              <ImArrowDownRight2
                className="fill-danger"
                size={12}
              ></ImArrowDownRight2>
            )}
          </div>
          <TextComponent
            fFamily="font-secondary"
            fWeight="font-medium"
            style={`text-${colorSwitcherPrimary(mainValueDelta)} pl-1`}
          >
            {Math.abs(mainValueDelta)}%
          </TextComponent>
        </div>
        <Divider className="my-3 w-9/12 self-center bg-default-400 dark:bg-default-500"></Divider>
        <div className="text-center">{children}</div>
      </CardBody>
    </Card>
  );
};
