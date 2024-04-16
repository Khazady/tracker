import { Badge } from '@/components/ui/badge';
import type { AssetType } from '@/lib/schemes/asset.scheme';
import { Position } from '@prisma/client';
import Link from 'next/link';

type PropsType = {
  id: AssetType['id'];
  name: AssetType['name'];
  symbol: AssetType['symbol'];
  units?: Position['units'];
};

export const AssetNameCell = (props: PropsType) => {
  const { id, name, symbol } = props;

  if (!symbol) {
    return <p className=" font-semibold">{name}</p>;
  }

  return (
    <Link
      href={`/assets/${id}`}
      className="flex cursor-pointer flex-col hover:underline"
    >
      <span className="font-semibold text-primary">{name}</span>
      <div>
        <span className="uppercase text-muted-foreground">{symbol}</span>
        {props.units && <Badge variant="secondary">{props.units}</Badge>}
      </div>
    </Link>
  );
};
