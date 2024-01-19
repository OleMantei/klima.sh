import { Progress } from '@nextui-org/react';
import { TextComponent } from '../TextComponent';

type SectorSplitType = {
  sectors: [string, number][];
  total: number;
};

export const SectorSplit = ({ sectors, total }: SectorSplitType) => {
  return (
    <div className="flex flex-col justify-between pr-4 h-full">
      <div className="pb-1 ">
        <TextComponent fWeight="font-medium" style="">
          {sectors[0][0]}
        </TextComponent>
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
        />{' '}
        <TextComponent style="">
          {((sectors[0][1] / total) * 100).toFixed(2)}%
        </TextComponent>
      </div>
      <div className="pb-1">
        <TextComponent fWeight="font-medium" style="leading-3 pb-0.5">
          {sectors[1][0]}
        </TextComponent>
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
        <TextComponent style="">
          {((sectors[1][1] / total) * 100).toFixed(2)}%
        </TextComponent>
      </div>
      <div className="pb-1">
        <TextComponent fWeight="font-medium" style="">
          {sectors[2][0]}
        </TextComponent>
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
        <TextComponent style="">
          {((sectors[2][1] / total) * 100).toFixed(2)}%
        </TextComponent>
      </div>
    </div>
  );
};
