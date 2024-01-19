import {
  getHouseholdSum,
  getHouseholdPercentage,
  getHouseholdGroups,
  householdDataTotal,
  householdData,
} from '../data/householdData';

import {
  getPrimaryEnergySum,
  getPrimaryEnergyPercentage,
  primaryEnergyData,
  getPrimaryEnergyRenewables,
  primaryEnergyByEnergySourceType,
} from '../data/primaryEnergyConsumptionByEnergySource';

import {
  getGreenHouseGasSum,
  getGreenHouseGasPercentage,
  greenHouseGasBySectorData,
} from '../data/greenHouseGasBySector';

import {
  getHeatingSum,
  getHeatingPercentage,
  heatingByEnergySourceData,
} from '../data/heatingByEnergySource';
import {
  getPercentage,
  getSum,
  grossEnergyConsumptionData,
} from './grossEnergyConsumptionBySector';
import { userState } from '../store';

export const getGlobalSumValues = (user: userState) => {
  const household = getHouseholdSum(
    householdDataTotal,
    user.yearRangeSelection,
  );
  const householdDelta = getHouseholdPercentage(
    householdDataTotal,
    user.yearRangeSelection,
  );
  const householdGroups = getHouseholdGroups(
    householdData,
    user.yearRangeSelection,
  );

  const grossEnergy = getSum(
    grossEnergyConsumptionData,
    user.yearRangeSelection,
  );
  const grossEnergyDelta = getPercentage(
    grossEnergyConsumptionData,
    user.yearRangeSelection,
  );

  const primaryEnergy = getPrimaryEnergySum(
    primaryEnergyData,
    user.yearRangeSelection,
  );

  const primaryEnergyDelta = getPrimaryEnergyPercentage(
    primaryEnergyData,
    user.yearRangeSelection,
  );

  const greenHouseGas = getGreenHouseGasSum(
    greenHouseGasBySectorData,
    user.yearRangeSelection,
  );

  const greenHouseGasDelta = getGreenHouseGasPercentage(
    greenHouseGasBySectorData,
    user.yearRangeSelection,
  );

  const heating = getHeatingSum(
    heatingByEnergySourceData,
    user.yearRangeSelection,
  );

  const heatingDelta = getHeatingPercentage(
    heatingByEnergySourceData,
    user.yearRangeSelection,
  );

  const primaryEnergyRenewables = getPrimaryEnergyRenewables(
    primaryEnergyData,
    user.yearRangeSelection,
  );

  return {
    primaryEnergyRenewables,
    household,
    householdDelta,
    householdGroups,
    grossEnergy,
    grossEnergyDelta,
    primaryEnergy,
    primaryEnergyDelta,
    greenHouseGas,
    greenHouseGasDelta,
    heating,
    heatingDelta,
  };
};

export const createDeltaArray = (
  counter: number,
  data: primaryEnergyByEnergySourceType,
  yearRange: [number, number],
) => {
  const counterArray: number[] = [];
  const deltaArray: primaryEnergyByEnergySourceType = [];
  for (let i = 0; i <= counter; i++) {
    counterArray.push(yearRange[0] + i);
  }

  for (let i = 0; i <= counterArray.length - 1; i++) {
    const value = data.find((e) => e.year == counterArray[i]);
    deltaArray.push(value!);
  }

  return deltaArray;
};
