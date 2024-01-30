import { useTheme } from 'next-themes';
import Chart from 'react-apexcharts';
import { TextComponent } from '../TextComponent';

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
      colors: mode === 'light' ? ['#009bb3'] : ['#0c6c85'],
      type: 'gradient',
      gradient: {
        type: 'vertical',
        gradientToColors: mode === 'light' ? ['#d8b4fe'] : ['#c084fc'],
        opacityFrom: 1,
        opacityTo: mode === 'light' ? 0.7 : 0.9,
        stops: [0, 90, 100],
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

  return (
    <div>
      <Chart options={options} type="bar" series={series} />
      <TextComponent style="text-center px-5 mb-5 h-10" fSize="text-1xl">
        {title}
      </TextComponent>
    </div>
  );
};
