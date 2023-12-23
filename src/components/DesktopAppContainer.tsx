import { isMobile } from 'react-device-detect';

type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const DesktopAppContainer = ({ children }: Props) => {
  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <div
        className="h-full w-full relative border-solid border-1 rounded-lg"
        style={{ width: '25rem', height: '50rem' }}
      >
        {children}
      </div>
      <p className="pt-1">Nicht für Desktopgeräte optimiert.</p>
    </div>
  );
};
