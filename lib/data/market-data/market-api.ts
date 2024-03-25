import { TableAsset } from '@/components/dashboard/trendingTable/columns';
import {
  checkBuggedPrice,
  formatDailyChange,
} from '@/lib/data/market-data/formatters';
import { CoinGeckoClient } from 'coingecko-api-v3';

const marketDataClient = new CoinGeckoClient({
  autoRetry: true,
});

export async function getTrending(): Promise<TableAsset[] | undefined> {
  const { coins } = await marketDataClient.trending();

  const formatted = coins?.map(({ item }) => {
    const formattedPrice = checkBuggedPrice(item?.data?.price);

    const formattedChange = formatDailyChange(
      item?.data?.price_change_percentage_24h?.usd,
    );

    return {
      id: item?.id,
      name: item?.name,
      price: formattedPrice,
      icon: item?.thumb,
      cap: item?.data?.market_cap,
      change: formattedChange,
    };
  });

  return formatted;
}

export async function getCoinById(id: string) {
  const { market_data, name, image, symbol, description } =
    await marketDataClient.coinId({ id });

  const formattedChange = formatDailyChange(
    market_data?.price_change_percentage_24h,
  );
  return {
    name: name,
    image: image,
    symbol: symbol,
    price: market_data?.current_price?.usd + '$',
    description: description?.en,
    change: formattedChange,
  };
}
