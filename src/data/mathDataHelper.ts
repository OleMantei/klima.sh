import {
  getHouseholdSum,
  getHouseholdPercentage,
  householdDataTotal,
} from '../data/householdData';

import {
  getPrimaryEnergySum,
  getPrimaryEnergyPercentage,
  primaryEnergyData,
  getPrimaryEnergyRenewables,
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
