import { ReactNode } from 'react';

type TextComponentType = {
  fSize?:
    | 'text-xs'
    | 'text-sm'
    | 'text-base'
    | 'text-1xl'
    | 'text-2xl'
    | 'text-3xl';
  fFamily?: 'font-sans' | 'font-secondary';
  fWeight?:
    | 'font-light'
    | 'font-normal'
    | 'font-medium'
    | 'font-semibold'
    | 'font-bold';
  style?: string;
  title?: boolean;
  children: ReactNode;
};

export const TextComponent = ({
  fSize = 'text-sm',
  fFamily = 'font-sans',
  fWeight = 'font-light',
  style = undefined,
  title,
  children,
}: TextComponentType) => {
  const styleElement = title
    ? `${style} font-bold text-1xl`
    : `${style} ${fSize} ${fFamily} ${fWeight}`;

  return <p className={styleElement}>{children}</p>;
};
