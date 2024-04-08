import { TransactionForm } from '@/components/assets/transaction-form';
import DailyChangeCell from '@/components/dashboard/daily-change-cell';
import Avatar from '@/components/ui/avatar/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getCoinById } from '@/lib/data/market-data/coins-api';
import { formatDailyChange } from '@/lib/data/market-data/formatters';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  const coin = await getCoinById(id);

  if (!coin) {
    notFound();
  }

  const { name, description } = coin;

  return {
    title: name,
    description,
  };
}

export default async function Page({ params }: Props) {
  const id = params.id;
  const coin = await getCoinById(id);

  if (!coin) {
    notFound();
  }

  const { icon: image, name, description, price, symbol, change } = coin;
  const formattedChange = formatDailyChange(change);

  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-8 space-y-0 pb-2">
          <Avatar
            className="h-10 w-10 border-l-gray-400"
            url={image}
            name={name}
          />
          <div>
            <CardTitle className="text-sm font-medium">{name}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {symbol}
            </CardDescription>
          </div>
          <TransactionForm asset={coin} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{price + '$'}</div>
          <DailyChangeCell change={formattedChange} />
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardFooter>
      </Card>
    </main>
  );
}
