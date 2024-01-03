import { useNavigate } from 'react-router';
import { WidgetTotalEmissionsBySector } from '../components/Dashboard/WidgetTotalEmissionsBySector';
import { DesktopAppContainer } from '../components/DesktopAppContainer';

import { YearRangeSelector } from '../components/YearRangeSelector';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <DesktopAppContainer>
      <div className="p-4">
        <p className="text-center my-10">Dashboard coming soon</p>
        <div className="flex flex-row gap-2">
          <div
            className="w-1/2"
            onClick={() => navigate('/dashboard/totalEmissionsBySector')}
          >
            <WidgetTotalEmissionsBySector />
          </div>
          <div
            className="w-1/2"
            onClick={() => navigate('/dashboard/totalEmissionsBySector')}
          >
            <WidgetTotalEmissionsBySector />
          </div>
        </div>
      </div>
      <YearRangeSelector />
    </DesktopAppContainer>
  );
}
