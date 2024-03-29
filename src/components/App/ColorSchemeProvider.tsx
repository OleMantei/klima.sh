import { useTheme } from 'next-themes';
import { useEffect } from 'react';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const ColorSchemeProvider = ({ children }: Props) => {
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) =>
        setTheme(e.matches ? 'dark' : 'light'),
      );

    setTheme(
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light',
    );

    if (theme === 'light') {
      document
        ?.querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', 'black-translucent');
      document
        ?.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')
        ?.setAttribute('content', 'black-translucent');
    } else {
      document
        ?.querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', '#131826');
      document
        ?.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')
        ?.setAttribute('content', '#131826');
    }
    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTheme]);

  return <>{children}</>;
};
