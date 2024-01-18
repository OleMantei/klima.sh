import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const ChartSlider = ({ children }: Props) => {
  return (
    <div className="flex flex-nowrap overflow-x-auto pl-4 pr-2 hide-scrollbar">
      {children}
    </div>
  );
};
