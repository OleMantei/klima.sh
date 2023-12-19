import { atom } from 'recoil';

export type ColorSchemes = 'dark' | 'light';
export const colorSchemeDetails: { value: ColorSchemes; label: string }[] = [
  { value: 'dark', label: 'Dunkel' },
  { value: 'light', label: 'Hell' },
];

interface userState {
  prefersColorScheme: ColorSchemes;
}

const defaultUserState = {
  prefersColorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light',
};

export const userState = atom({
  key: 'userState',
  default: defaultUserState as userState,
});
