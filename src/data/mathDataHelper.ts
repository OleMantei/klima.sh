import {
  getPrimaryEnergySum,
  getPrimaryEnergyPercentage,
  primaryEnergyData,
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

  return {
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
