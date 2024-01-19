import { Progress } from '@nextui-org/react';
import { TextComponent } from '../TextComponent';

type SectorSplitType = {
  sectors: [string, number][];
  total: number;
};

export const SectorSplit = ({ sectors, total }: SectorSplitType) => {
  return (
    <div>
      <div className="flex-row">
        <TextComponent style="">
          {((sectors[0][1] / total) * 100).toFixed(2)}%
        </TextComponent>
        <TextComponent style="">{sectors[0][0]}</TextComponent>
        <Progress
          classNames={{
            base: 'w-5/6',
            indicator: 'bg-gradient-to-r from-primary-500 to-success-600',
            track: 'bg-slate-400 bg-opacity-40',
          }}
          size="sm"
          aria-label=""
          value={(sectors[0][1] / total) * 100}
          className="fill-black"
        />
      </div>
      <div className="flex-row">
        <TextComponent style="">
          {((sectors[1][1] / total) * 100).toFixed(2)}%
        </TextComponent>
        <TextComponent style="">{sectors[1][0]}</TextComponent>
        <Progress
          classNames={{
            base: 'w-5/6',
            indicator: 'bg-gradient-to-r from-primary-500 to-success-600',
            track: 'bg-slate-400 bg-opacity-40',
          }}
          size="sm"
          aria-label=""
          value={(sectors[1][1] / total) * 100}
          className="fill-black"
        />
      </div>
      <div className="flex-row">
        <TextComponent style="">
          {((sectors[2][1] / total) * 100).toFixed(2)}%
        </TextComponent>
        <TextComponent style="">{sectors[2][0]}</TextComponent>
        <Progress
          classNames={{
            base: 'w-5/6',
            indicator: 'bg-gradient-to-r from-primary-500 to-success-600',
            track: 'bg-slate-400 bg-opacity-40',
          }}
          size="sm"
          aria-label=""
          value={(sectors[2][1] / total) * 100}
          className="fill-black"
        />
      </div>
    </div>
  );
};
