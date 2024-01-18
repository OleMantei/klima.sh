import { atom } from 'recoil';

export type YearRange = [number, number];

export interface userState {
  yearRangeSelection: YearRange;
  yearRangeData: YearRange;
}

const defaultUserState = {
  yearRangeSelection: [2021, 2021],
  yearRangeData: [2015, 2021],
};

export const userState = atom({
  key: 'userState',
  default: defaultUserState as userState,
});
