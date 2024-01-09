import { useNavigate, useLocation } from 'react-router';
import { WidgetTotalEmissionsBySector } from '../components/Dashboard/WidgetTotalEmissionsBySector';
import { BsQuestionLg } from 'react-icons/bs';
import { YearRangeSelector } from '../components/YearRangeSelector';
import { Button } from '@nextui-org/react';
import { useEffect } from 'react';

export const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (pathname === '/') {
      // reroute incorrect path -> see App.tsx
      navigate('/dashboard');
    }
  }, [navigate, pathname]);

  return (
    <>
      <div className="p-4">
        <div className="text-right">
          <Button
            size="sm"
            radius="full"
            variant="faded"
            isIconOnly
            aria-label="Hilfe"
            className="ml-auto"
            onPress={() => navigate('/help')}
          >
            <BsQuestionLg />
          </Button>
        </div>
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
    </>
  );
};
