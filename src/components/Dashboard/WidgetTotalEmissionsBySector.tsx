import { Card, CardBody } from '@nextui-org/card';
import {
  getSumInsgesamt,
  totalEmissionsBySectorData,
} from '../../data/totalEmissionsBySector';
import { userState } from '../../store';
import { useRecoilValue } from 'recoil';
import { TextComponent } from '../TextComponent';

// on of many widgets to be implemented
export const WidgetTotalEmissionsBySector = () => {
  const user = useRecoilValue(userState);

  return (
    <Card>
      <CardBody>
        <TextComponent title>Sample Widget</TextComponent>
        <TextComponent>Total Emissions:</TextComponent>
        <TextComponent>
          {getSumInsgesamt(totalEmissionsBySectorData, user.yearRangeSelection)}
        </TextComponent>
      </CardBody>
    </Card>
  );
};
