import { Card, CardBody } from '@nextui-org/card';
import {
  getSumInsgesamt,
  totalEmissionsBySectorData,
} from '../../../data/totalEmissionsBySector';
import { userState } from '../../../store';
import { useRecoilValue } from 'recoil';

// on of many widgets to be implemented
export const WidgetTotalEmissionsBySector = () => {
  const user = useRecoilValue(userState);

  return (
    <Card>
      <CardBody>
        <p>Sample Widget</p>
        <p>Total Emissions:</p>
        <p>
          {getSumInsgesamt(totalEmissionsBySectorData, user.yearRangeSelection)}
        </p>
      </CardBody>
    </Card>
  );
};
