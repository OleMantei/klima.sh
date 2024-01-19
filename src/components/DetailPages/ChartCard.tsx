import { Card, CardBody } from '@nextui-org/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const ChartCard = ({ children }: Props) => {
  return (
    <div className="mr-4">
      <div className="w-96">
        <Card
          style={{ borderRadius: 10 }}
          className="bg-gradient-to-tl from-primary-100 to-purple-100 shadow-none dark:border-default-200 dark:bg-gradient-to-tr dark:from-primary-50 dark:to-primary-200"
        >
          <CardBody className="p-0 pr-2">{children}</CardBody>
        </Card>
      </div>
    </div>
  );
};
