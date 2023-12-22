import { useTheme } from 'next-themes';
import { useEffect } from 'react';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const ColorSchemeProvider = ({ children }: Props) => {
  const { setTheme } = useTheme();

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

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', () => {});
    };
  }, [setTheme]);

  return <>{children}</>;
};
