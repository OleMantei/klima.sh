import { colorSwitcherHeader } from '../../design/designHelperFunctions';
import { TextComponent } from '../TextComponent';

type HeaderDashboardType = {
  delta: number;
  total: number;
  subTextDelta: string;
  subTextTotal: string;
};

export const HeaderDashboard = ({
  delta,
  total,
  subTextDelta,
  subTextTotal,
}: HeaderDashboardType) => {
  return (
    <div className="text-center mb-8">
      <TextComponent fSize="text-3xl" fWeight="font-bold">
        SH Klimaziel
      </TextComponent>
      <div className="flex mt-2 justify-center items-center ">
        <div className="text-end flex-1">
          <TextComponent
            fWeight="font-bold"
            fSize="text-base"
            fFamily="font-secondary"
            style={`text-${colorSwitcherHeader(delta)} -mb-1`}
          >
            {delta <= 0 ? delta : `+${delta}`}%
          </TextComponent>
          <TextComponent
            fWeight="font-medium"
            style={`text-${delta <= 0 ? 'danger' : 'success'}`}
          >
            {subTextDelta}
          </TextComponent>
        </div>
        <div className="px-3 border-1 h-3/4 border-default-300 border-solid rotate-90"></div>
        <div className="text-start flex-1">
          <TextComponent
            fWeight="font-bold"
            fSize="text-base"
            fFamily="font-secondary"
            style="-mb-1"
          >
            {total}%
          </TextComponent>
          <TextComponent fWeight="font-medium">{subTextTotal}</TextComponent>
        </div>
      </div>
    </div>
  );
};
