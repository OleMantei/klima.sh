// implementation just for showcase purposes... needs work
import { useState } from 'react';
import Chart from 'react-apexcharts';
import {
  getInsgeamtByYear,
  totalEmissionsBySectorData,
} from '../../data/totalEmissionsBySector';
import { useRecoilValue } from 'recoil';
import { userState } from '../../store';
import { useTheme } from 'next-themes';

export const BarSample = () => {
  const [orientation] = useState(false);
  const user = useRecoilValue(userState);
  const { theme } = useTheme();
  const mode: 'light' | 'dark' = theme === 'dark' ? 'dark' : 'light';

  const data = getInsgeamtByYear(
    totalEmissionsBySectorData,
    user.yearRangeSelection,
  );

  const series = [
    {
      name: 'Emissionen',
      data: data[0],
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    theme: {
      mode: mode,
    },
    plotOptions: {
      bar: {
        horizontal: orientation,
      },
    },
    xaxis: {
      categories: data[1],
    },
  };

  return <Chart options={options} type="bar" series={series} />;
};
