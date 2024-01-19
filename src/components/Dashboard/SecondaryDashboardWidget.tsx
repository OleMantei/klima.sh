import { Card, CardBody } from '@nextui-org/card';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { TextComponent } from '../TextComponent';
import { colorSwitcherSecondary } from '../../design/designHelperFunctions';
import { useTheme } from 'next-themes';

type StaticData = {
  Icon: IconType;
  title: string;
  mainValue: number;
  unitOfMainValue: string;
  children?: ReactNode;
  mainValueDelta: number;
};

export const SecondaryDashboardWidget = ({
  title,
  Icon,
  mainValue,
  unitOfMainValue,
  children,
  mainValueDelta,
}: StaticData) => {
  const { theme } = useTheme();
  return (
    <Card
      className="bg-primary-50 shadow-none border-1 border-default-300 dark:border-default-200 dark:bg-gradient-to-tr dark:from-primary-50 dark:to-primary-200"
      style={{ flex: 1, borderRadius: 10 }}
    >
      <CardBody>
        <div className="flex items-center gap-2 pb-2">
          <Icon size={18} className="fill-default-500" />
          <TextComponent style="font-semibold text-default-500">
            {title}
          </TextComponent>
        </div>
        <TextComponent
          style="text-default-800 py-1 dark:text-default-600"
          fSize="text-1xl"
          fWeight="font-bold"
          fFamily="font-secondary"
        >
          {mainValue} {unitOfMainValue}
        </TextComponent>
        {children}
        <TextComponent
          fWeight="font-bold"
          style={`text-${colorSwitcherSecondary(mainValueDelta, theme)}`}
        >
          {mainValueDelta < 0
            ? `${mainValueDelta * -1}% gesunken`
            : `${mainValueDelta}% gestiegen`}
        </TextComponent>
      </CardBody>
    </Card>
  );
};
