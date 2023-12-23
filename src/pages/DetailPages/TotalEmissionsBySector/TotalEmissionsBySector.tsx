import { DesktopAppContainer } from '../../../components/DesktopAppContainer';
import { YearRangeSelector } from '../../../components/YearRangeSelector';
import ChartXY from './CartXY';

export const TotalEmissionsBySector = () => {
  return (
    <DesktopAppContainer>
      <div className="p-4">
        <p className="text-center my-10">
          Total emissions by sector details coming soon
        </p>
        <ChartXY />
      </div>
      <YearRangeSelector />
    </DesktopAppContainer>
  );
};
