import { isMobile } from 'react-device-detect';
import { useLocation } from 'react-router-dom';
import { TextComponent } from './TextComponent';

type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const DesktopAppContainer = ({ children }: Props) => {
  const location = useLocation();
  const { pathname } = location;

  if (isMobile || pathname === '/') {
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
      <TextComponent style="pt-1">
        Nicht für Desktopgeräte optimiert.
      </TextComponent>
    </div>
  );
};
