// implementation just for showcase purposes... needs work
import { useState } from 'react';
import Chart from 'react-apexcharts';
import {
  getInsgeamtByYear,
  totalEmissionsBySectorData,
} from '../../../data/totalEmissionsBySector';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../store';
import { useTheme } from 'next-themes';

export default function BarSample() {
  const [orientation] = useState(false);
  const user = useRecoilValue(userState);
  const { theme } = useTheme();

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
      id: 'simple-bar',
      animations: {
        speed: 1800,
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    theme: {
      mode: theme,
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
}
