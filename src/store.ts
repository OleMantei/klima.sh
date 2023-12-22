import { atom } from 'recoil';

export type YearRange = [number, number];

interface userState {
  yearRangeSelection: YearRange;
  yearRangeData: YearRange;
}

const defaultUserState = {
  yearRangeSelection: [2023, 2023],
  yearRangeData: [2000, 2023],
};

export const userState = atom({
  key: 'userState',
  default: defaultUserState as userState,
});
