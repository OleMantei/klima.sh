import { Card, CardBody } from '@nextui-org/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const ChartCard = ({ children }: Props) => {
  return (
    <div className="mr-2">
      <div className="w-80">
        <Card>
          <CardBody>
            <div>{children}</div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
