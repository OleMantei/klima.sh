import { useTheme } from 'next-themes';
import Chart from 'react-apexcharts';

type Props = {
  yData: number[];
  xData: number[];
  scale: number;
  unit: string;
  usage: string;
  title: string;
  maxScale: number;
};

export const BarChart = ({
  title,
  yData,
  xData,
  scale,
  unit,
  usage,
  maxScale,
}: Props) => {
  const { theme } = useTheme();
  const mode: 'light' | 'dark' = theme === 'dark' ? 'dark' : 'light';
  const series = [
    {
      name: usage,
      data: yData,
    },
  ];

  const options = {
    fill: {
      type: 'gradient',
      gradient: {
        type: 'vertical',
        shadeIntensity: 1,
        gradientFromColors: ['#1A1A1A'],
        gradientToColors: ['#B6B6B6'],
      },
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: '10px',
        fontFamily: 'Nunito Sans, sans-serif',
      },
      y: {
        // @ts-expect-error type is any
        formatter: (val) => {
          return Math.floor(val / scale) + ' ' + unit;
        },
      },
    },
    chart: {
      toolbar: {
        show: false,
      },
      background: 'none',
    },
    theme: {
      mode: mode,
    },
    plotOptions: {
      bar: {
        tooltip: false,
        borderRadius: 6,
      },
    },
    dataLabels: {
      enabled: false,
      offsetY: 60,
      style: {
        fontSize: '10px',
        fontFamily: 'Nunito Sans, sans-serif',
      },
    },
    xaxis: {
      categories: xData,
      position: 'bottom',
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        offsetY: -4,
        style: {
          fontSize: '10px',
          fontFamily: 'Nunito Sans, sans-serif',
        },
      },
      title: {
        text: title,
        floating: true,
        offsetY: 0,
        align: 'center',
        style: {
          fontSize: '16px',
          fontFamily: 'Nunito Sans, sans-serif',
        },
      },
    },
    yaxis: {
      min: 0,
      max: maxScale,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        style: {
          fontSize: '10px',
          fontFamily: 'Nunito Sans, sans-serif',
        },
        // @ts-expect-error type is any
        formatter: (val) => {
          return val / scale + unit;
        },
      },
    },
    grid: {
      borderColor: 'grey',
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  };

  return <Chart options={options} type="bar" series={series} />;
};
